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
"[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react-toastify/dist/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function RegisterForm() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "412dbd63e451fb28060d8dc99e7cafa19174a9f729acfc30db5f75c7d51b9386") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "412dbd63e451fb28060d8dc99e7cafa19174a9f729acfc30db5f75c7d51b9386";
    }
    const nameInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])();
    const emailInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])();
    const passwordInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])();
    const confirmPasswordInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])();
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = async function handleSubmit(event) {
            event.preventDefault();
            const enteredName = nameInputRef.current.value;
            const enteredEmail = emailInputRef.current.value;
            const enteredPassword = passwordInputRef.current.value;
            const enteredConfirmPassword = confirmPasswordInputRef.current.value;
            if (!enteredName || !enteredEmail || !enteredEmail.includes("@") || !enteredPassword || enteredPassword.trim().length < 7 || enteredPassword !== enteredConfirmPassword) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error("Please enter valid data");
                return;
            }
            const data = {
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword
            };
            fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(_RegisterFormHandleSubmitAnonymous);
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const handleSubmit = t0;
    let t1;
    let t2;
    let t3;
    let t4;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: "FullName",
                    className: "block text-sm font-medium text-gray-700 mb-2",
                    children: "Full Name"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 52,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    name: "FullName",
                    placeholder: "Enter your Name here",
                    required: true,
                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                    ref: nameInputRef
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 52,
                    columnNumber: 115
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
            lineNumber: 52,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: "email address",
                    className: "block text-sm font-medium text-gray-700 mb-2",
                    children: "Email address"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 53,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "email",
                    name: "email",
                    placeholder: "Enter your email address",
                    required: true,
                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                    ref: emailInputRef
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 53,
                    columnNumber: 124
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: "password",
                    className: "block text-sm font-medium text-gray-700 mb-2",
                    children: "Password"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 54,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    name: "password",
                    placeholder: "Enter your password",
                    required: true,
                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                    ref: passwordInputRef
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 54,
                    columnNumber: 114
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
            lineNumber: 54,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: "confirm password",
                    className: "block text-sm font-medium text-gray-700 mb-2",
                    children: "Confirm Password"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 55,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "password",
                    name: "confirm password",
                    placeholder: "Re-enter your password",
                    required: true,
                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                    ref: confirmPasswordInputRef
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 55,
                    columnNumber: 130
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        $[2] = t1;
        $[3] = t2;
        $[4] = t3;
        $[5] = t4;
    } else {
        t1 = $[2];
        t2 = $[3];
        t3 = $[4];
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: [
                "Already have an account?",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/login",
                    className: "underline hover:text-amber-500",
                    children: "Back to login page"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 68,
                    columnNumber: 42
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            className: "space-y-6",
            onSubmit: handleSubmit,
            children: [
                t1,
                t2,
                t3,
                t4,
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-right",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800 cursor-pointer",
                        children: "Register"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 75,
                        columnNumber: 110
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 75,
                    columnNumber: 82
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
            lineNumber: 75,
            columnNumber: 10
        }, this);
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    return t6;
}
_s(RegisterForm, "JMz2O5B2neF0AyRA1OMmvVo5CEQ=");
_c = RegisterForm;
function _RegisterFormHandleSubmitAnonymous(res) {
    if (res.ok) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success("User registered successfully");
    } else {
        return res.json().then(_RegisterFormHandleSubmitAnonymousAnonymous);
    }
}
function _RegisterFormHandleSubmitAnonymousAnonymous(data_0) {
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error(data_0.message || "Something went wrong!");
}
const __TURBOPACK__default__export__ = RegisterForm;
var _c;
__turbopack_context__.k.register(_c, "RegisterForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$Register$2d$form$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/image.js [client] (ecmascript)");
;
;
;
;
;
function RegisterPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "38b1c85dbff6800e4ae21ccf3a4c1cb14a5cb782b7e4338b060d1c2ed281a3f1") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "38b1c85dbff6800e4ae21ccf3a4c1cb14a5cb782b7e4338b060d1c2ed281a3f1";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "AtlasEgypt - Register"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                    lineNumber: 15,
                    columnNumber: 16
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "description",
                    content: "Create your AtlasEgypt account to start planning your dream trips, manage bookings, and access exclusive travel deals."
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                    lineNumber: 15,
                    columnNumber: 52
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "robots",
                    content: "noindex, nofollow"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                    lineNumber: 15,
                    columnNumber: 208
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
            lineNumber: 15,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative h-64 md:h-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                src: "/BlogPageBanner.jpg",
                alt: "Register Banner",
                fill: true,
                className: "object-cover"
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                lineNumber: 22,
                columnNumber: 51
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
            lineNumber: 22,
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
                    className: "min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl w-full bg-white rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2",
                        children: [
                            t1,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 md:p-12 flex flex-col justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold text-center mb-2",
                                        children: "Create Your Account"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                                        lineNumber: 29,
                                        columnNumber: 276
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-1 bg-amber-500 mx-auto mb-8"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                                        lineNumber: 29,
                                        columnNumber: 352
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$Register$2d$form$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                                        lineNumber: 29,
                                        columnNumber: 406
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                                lineNumber: 29,
                                columnNumber: 218
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                        lineNumber: 29,
                        columnNumber: 101
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                    lineNumber: 29,
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
_c = RegisterPage;
var _c;
__turbopack_context__.k.register(_c, "RegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/Register";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Documents/Git-Projects/AtlasEgypt/pages/Register\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__d886dd4f._.js.map