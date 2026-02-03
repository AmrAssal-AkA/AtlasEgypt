(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react-toastify/dist/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function ContactForm() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "25acd8be52cbf852b50f18783c0fc250f9ca2897391d75dbb97386ffdb0b51bd") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "25acd8be52cbf852b50f18783c0fc250f9ca2897391d75dbb97386ffdb0b51bd";
    }
    const [enteredEmail, setEnteredEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [enteredName, setEnteredName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [enteredMessage, setEnteredMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t0;
    if ($[1] !== enteredEmail || $[2] !== enteredMessage || $[3] !== enteredName) {
        t0 = function handleSubmit(e) {
            e.preventDefault();
            if (!enteredName || enteredName.trim() == "" || !enteredEmail || enteredEmail.trim() == "" || !enteredMessage || enteredMessage.trim() == "") {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error("Please fill in all fields before submitting the form, in the full format.");
            }
            fetch("api/contactus", {
                method: "POST",
                body: JSON.stringify({
                    name: enteredName,
                    email: enteredEmail,
                    message: enteredMessage
                }),
                headers: {
                    "content-type": "application/json"
                }
            }).then(_ContactFormHandleSubmitAnonymous).then({
                "ContactForm[handleSubmit > (anonymous)()]": (data)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success("message sent successfully!");
                    setEnteredEmail("");
                    setEnteredName("");
                    setEnteredMessage("");
                }
            }["ContactForm[handleSubmit > (anonymous)()]"]);
        };
        $[1] = enteredEmail;
        $[2] = enteredMessage;
        $[3] = enteredName;
        $[4] = t0;
    } else {
        t0 = $[4];
    }
    const handleSubmit = t0;
    let t1;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-sm font-medium text-gray-700 mb-2",
            htmlFor: "name",
            children: "Name"
        }, void 0, false, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
            lineNumber: 51,
            columnNumber: 10
        }, this);
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all",
                    type: "text",
                    id: "name",
                    name: "name",
                    placeholder: "Your Name",
                    onChange: {
                        "ContactForm[<input>.onChange]": (e_0)=>setEnteredName(e_0.target.value)
                    }["ContactForm[<input>.onChange]"]
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
                    lineNumber: 59,
                    columnNumber: 19
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
            lineNumber: 59,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-sm font-medium text-gray-700 mb-2",
            htmlFor: "email",
            children: "Email"
        }, void 0, false, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[6] = t2;
        $[7] = t3;
    } else {
        t2 = $[6];
        t3 = $[7];
    }
    let t4;
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all",
                    type: "email",
                    id: "email",
                    name: "email",
                    placeholder: "Your Email",
                    onChange: {
                        "ContactForm[<input>.onChange]": (e_1)=>setEnteredEmail(e_1.target.value)
                    }["ContactForm[<input>.onChange]"]
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
                    lineNumber: 72,
                    columnNumber: 19
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-sm font-medium text-gray-700 mb-2",
            htmlFor: "message",
            children: "Message"
        }, void 0, false, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
            lineNumber: 75,
            columnNumber: 10
        }, this);
        $[8] = t4;
        $[9] = t5;
    } else {
        t4 = $[8];
        t5 = $[9];
    }
    let t6;
    let t7;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none",
                    id: "message",
                    name: "message",
                    rows: "5",
                    placeholder: "Your Message",
                    onChange: {
                        "ContactForm[<textarea>.onChange]": (e_2)=>setEnteredMessage(e_2.target.value)
                    }["ContactForm[<textarea>.onChange]"]
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
                    lineNumber: 85,
                    columnNumber: 19
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
            lineNumber: 85,
            columnNumber: 10
        }, this);
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "w-full bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300",
            type: "submit",
            children: "Send Message"
        }, void 0, false, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        $[10] = t6;
        $[11] = t7;
    } else {
        t6 = $[10];
        t7 = $[11];
    }
    let t8;
    if ($[12] !== handleSubmit) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            className: "w-full space-y-5",
            onSubmit: handleSubmit,
            children: [
                t2,
                t4,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[12] = handleSubmit;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    return t8;
}
_s(ContactForm, "I/RFpHCWGGqA2WJO9ZwldI3QTmk=");
_c = ContactForm;
function _ContactFormHandleSubmitAnonymous(res) {
    return res.json();
}
const __TURBOPACK__default__export__ = ContactForm;
var _c;
__turbopack_context__.k.register(_c, "ContactForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContactUsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$contact$2f$contact$2d$form$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/components/contact/contact-form.jsx [client] (ecmascript)");
;
;
;
;
;
;
function ContactUsPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "88011002a405e71770c67cee1ff318c556c2887408a4d08b26d25d769ee087fd") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "88011002a405e71770c67cee1ff318c556c2887408a4d08b26d25d769ee087fd";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "AtlasEgypt - Contact Us"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                    lineNumber: 16,
                    columnNumber: 16
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "description",
                    content: "Get in touch with AtlasEgypt for any inquiries or support. We're here to help you with your travel needs."
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                    lineNumber: 16,
                    columnNumber: 54
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "robots",
                    content: "index, follow"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                    lineNumber: 16,
                    columnNumber: 197
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
            lineNumber: 16,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative h-50 md:h-full md:min-h-[600px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/AtlasEgypt.jpg",
                alt: "Contact Us",
                fill: true,
                className: "object-cover"
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                lineNumber: 23,
                columnNumber: 68
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
            lineNumber: 23,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 mt-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-8xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2",
                        children: [
                            t1,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 md:p-12 flex flex-col justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-4xl font-bold mb-6 text-gray-800",
                                        children: "Contact Us"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                                        lineNumber: 30,
                                        columnNumber: 284
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 leading-relaxed mb-8",
                                        children: "We're here to help! Reach out to us with any questions or inquiries you may have. Our team is dedicated to providing you with the best possible assistance and ensuring your experience with AtlasEgypt is seamless and enjoyable."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                                        lineNumber: 30,
                                        columnNumber: 353
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$contact$2f$contact$2d$form$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                                        lineNumber: 30,
                                        columnNumber: 633
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                                lineNumber: 30,
                                columnNumber: 226
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                        lineNumber: 30,
                        columnNumber: 108
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js",
                    lineNumber: 30,
                    columnNumber: 16
                }, this)
            ]
        }, void 0, true);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
}
_c = ContactUsPage;
var _c;
__turbopack_context__.k.register(_c, "ContactUsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/contactus";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Documents/Git-Projects/AtlasEgypt/pages/contactus.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__a3948389._.js.map