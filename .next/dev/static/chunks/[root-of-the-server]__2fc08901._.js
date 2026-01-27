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
"[project]/components/blog/Add-blog-form.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/react/dist/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/starter-kit/dist/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function AddBlogForm() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(171);
    if ($[0] !== "0e64cea4f23544a1f6be3594206b1b34d0da54673e6b4b4bec9dcde3da863a0a") {
        for(let $i = 0; $i < 171; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e64cea4f23544a1f6be3594206b1b34d0da54673e6b4b4bec9dcde3da863a0a";
    }
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [, setCoverImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [coverImagePreview, setCoverImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const [tagInput, setTagInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [author, setAuthor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("Ahmed Hassan (Admin)");
    const [showAuthorBio, setShowAuthorBio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [metaTitle, setMetaTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [metaDescription, setMetaDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [visibility] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("Public");
    const [publishStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("Immediately");
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
        ];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            extensions: t1,
            content: "<p>Start writing your Egypt guide...</p>",
            editorProps: {
                attributes: {
                    class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] p-4"
                }
            }
        };
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])(t2);
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "AddBlogForm[handleCoverImageChange]": (e)=>{
                const file = e.target.files[0];
                if (file) {
                    setCoverImage(file);
                    const reader = new FileReader();
                    reader.onloadend = ()=>{
                        setCoverImagePreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                }
            }
        })["AddBlogForm[handleCoverImageChange]"];
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    const handleCoverImageChange = t3;
    let t4;
    if ($[5] !== tagInput || $[6] !== tags) {
        t4 = ({
            "AddBlogForm[handleAddTag]": (e_0)=>{
                if (e_0.key === "Enter" && tagInput.trim()) {
                    e_0.preventDefault();
                    if (!tags.includes(tagInput.trim())) {
                        setTags([
                            ...tags,
                            tagInput.trim()
                        ]);
                    }
                    setTagInput("");
                }
            }
        })["AddBlogForm[handleAddTag]"];
        $[5] = tagInput;
        $[6] = tags;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    const handleAddTag = t4;
    let t5;
    if ($[8] !== tags) {
        t5 = ({
            "AddBlogForm[handleRemoveTag]": (tagToRemove)=>{
                setTags(tags.filter({
                    "AddBlogForm[handleRemoveTag > tags.filter()]": (tag)=>tag !== tagToRemove
                }["AddBlogForm[handleRemoveTag > tags.filter()]"]));
            }
        })["AddBlogForm[handleRemoveTag]"];
        $[8] = tags;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    const handleRemoveTag = t5;
    let t6;
    if ($[10] !== editor) {
        t6 = ({
            "AddBlogForm[handleSubmit]": (e_1)=>{
                e_1.preventDefault();
                editor?.getHTML();
            }
        })["AddBlogForm[handleSubmit]"];
        $[10] = editor;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    const handleSubmit = t6;
    let t7;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-500",
                    children: "Draft Mode"
                }, void 0, false, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 128,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-400",
                    children: "Auto-saved at 2:45 PM"
                }, void 0, false, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 128,
                    columnNumber: 66
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 128,
            columnNumber: 10
        }, this);
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    let t9;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition",
            children: "Save Draft"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 136,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition",
            children: "Preview"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 137,
            columnNumber: 10
        }, this);
        $[13] = t8;
        $[14] = t9;
    } else {
        t8 = $[13];
        t9 = $[14];
    }
    let t10;
    if ($[15] !== handleSubmit) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-sm p-6 mb-4 flex justify-between items-center",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        t8,
                        t9,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            onClick: handleSubmit,
                            className: "px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition",
                            children: "Publish"
                        }, void 0, false, {
                            fileName: "[project]/components/blog/Add-blog-form.jsx",
                            lineNumber: 146,
                            columnNumber: 141
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 146,
                    columnNumber: 105
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 146,
            columnNumber: 11
        }, this);
        $[15] = handleSubmit;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    let t11;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "AddBlogForm[<input>.onChange]": (e_2)=>setTitle(e_2.target.value)
        })["AddBlogForm[<input>.onChange]"];
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== title) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: title,
            onChange: t11,
            placeholder: "Enter your story title...",
            className: "w-full text-4xl font-serif border-none focus:outline-none mb-4"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 163,
            columnNumber: 11
        }, this);
        $[18] = title;
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] !== editor) {
        t13 = ({
            "AddBlogForm[<button>.onClick]": ()=>editor?.chain().focus().toggleBold().run()
        })["AddBlogForm[<button>.onClick]"];
        $[20] = editor;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    const t14 = `p-2 rounded hover:bg-gray-100 ${editor?.isActive("bold") ? "bg-gray-200" : ""}`;
    let t15;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            children: "B"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 182,
            columnNumber: 11
        }, this);
        $[22] = t15;
    } else {
        t15 = $[22];
    }
    let t16;
    if ($[23] !== t13 || $[24] !== t14) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t13,
            className: t14,
            title: "Bold",
            children: t15
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 189,
            columnNumber: 11
        }, this);
        $[23] = t13;
        $[24] = t14;
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    if ($[26] !== editor) {
        t17 = ({
            "AddBlogForm[<button>.onClick]": ()=>editor?.chain().focus().toggleItalic().run()
        })["AddBlogForm[<button>.onClick]"];
        $[26] = editor;
        $[27] = t17;
    } else {
        t17 = $[27];
    }
    const t18 = `p-2 rounded hover:bg-gray-100 ${editor?.isActive("italic") ? "bg-gray-200" : ""}`;
    let t19;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
            children: "I"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        $[28] = t19;
    } else {
        t19 = $[28];
    }
    let t20;
    if ($[29] !== t17 || $[30] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t17,
            className: t18,
            title: "Italic",
            children: t19
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 216,
            columnNumber: 11
        }, this);
        $[29] = t17;
        $[30] = t18;
        $[31] = t20;
    } else {
        t20 = $[31];
    }
    let t21;
    if ($[32] !== editor) {
        t21 = ({
            "AddBlogForm[<button>.onClick]": ()=>editor?.chain().focus().toggleBulletList().run()
        })["AddBlogForm[<button>.onClick]"];
        $[32] = editor;
        $[33] = t21;
    } else {
        t21 = $[33];
    }
    const t22 = `p-2 rounded hover:bg-gray-100 ${editor?.isActive("bulletList") ? "bg-gray-200" : ""}`;
    let t23;
    if ($[34] !== t21 || $[35] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t21,
            className: t22,
            title: "Bullet List",
            children: "☰"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 236,
            columnNumber: 11
        }, this);
        $[34] = t21;
        $[35] = t22;
        $[36] = t23;
    } else {
        t23 = $[36];
    }
    let t24;
    if ($[37] !== editor) {
        t24 = ({
            "AddBlogForm[<button>.onClick]": ()=>editor?.chain().focus().toggleOrderedList().run()
        })["AddBlogForm[<button>.onClick]"];
        $[37] = editor;
        $[38] = t24;
    } else {
        t24 = $[38];
    }
    const t25 = `p-2 rounded hover:bg-gray-100 ${editor?.isActive("orderedList") ? "bg-gray-200" : ""}`;
    let t26;
    if ($[39] !== t24 || $[40] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t24,
            className: t25,
            title: "Numbered List",
            children: "≡"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[39] = t24;
        $[40] = t25;
        $[41] = t26;
    } else {
        t26 = $[41];
    }
    let t27;
    if ($[42] !== editor) {
        t27 = ({
            "AddBlogForm[<button>.onClick]": ()=>editor?.chain().focus().toggleBlockquote().run()
        })["AddBlogForm[<button>.onClick]"];
        $[42] = editor;
        $[43] = t27;
    } else {
        t27 = $[43];
    }
    const t28 = `p-2 rounded hover:bg-gray-100 ${editor?.isActive("blockquote") ? "bg-gray-200" : ""}`;
    let t29;
    if ($[44] !== t27 || $[45] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t27,
            className: t28,
            title: "Quote",
            children: "❝"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 276,
            columnNumber: 11
        }, this);
        $[44] = t27;
        $[45] = t28;
        $[46] = t29;
    } else {
        t29 = $[46];
    }
    let t30;
    if ($[47] !== editor) {
        t30 = ({
            "AddBlogForm[<button>.onClick]": ()=>editor?.chain().focus().toggleCodeBlock().run()
        })["AddBlogForm[<button>.onClick]"];
        $[47] = editor;
        $[48] = t30;
    } else {
        t30 = $[48];
    }
    const t31 = `p-2 rounded hover:bg-gray-100 ${editor?.isActive("codeBlock") ? "bg-gray-200" : ""}`;
    let t32;
    if ($[49] !== t30 || $[50] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t30,
            className: t31,
            title: "Code Block",
            children: "</>"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 296,
            columnNumber: 11
        }, this);
        $[49] = t30;
        $[50] = t31;
        $[51] = t32;
    } else {
        t32 = $[51];
    }
    let t33;
    if ($[52] !== editor) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "AddBlogForm[<button>.onClick]": ()=>editor?.chain().focus().undo().run()
            }["AddBlogForm[<button>.onClick]"],
            className: "p-2 rounded hover:bg-gray-100",
            title: "Undo",
            children: "↶"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 305,
            columnNumber: 11
        }, this);
        $[52] = editor;
        $[53] = t33;
    } else {
        t33 = $[53];
    }
    let t34;
    if ($[54] !== editor) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "AddBlogForm[<button>.onClick]": ()=>editor?.chain().focus().redo().run()
            }["AddBlogForm[<button>.onClick]"],
            className: "p-2 rounded hover:bg-gray-100",
            title: "Redo",
            children: "↷"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 315,
            columnNumber: 11
        }, this);
        $[54] = editor;
        $[55] = t34;
    } else {
        t34 = $[55];
    }
    let t35;
    if ($[56] !== t16 || $[57] !== t20 || $[58] !== t23 || $[59] !== t26 || $[60] !== t29 || $[61] !== t32 || $[62] !== t33 || $[63] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-t border-b border-gray-200 py-3 mb-4 flex items-center gap-2 flex-wrap",
            children: [
                t16,
                t20,
                t23,
                t26,
                t29,
                t32,
                t33,
                t34
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 325,
            columnNumber: 11
        }, this);
        $[56] = t16;
        $[57] = t20;
        $[58] = t23;
        $[59] = t26;
        $[60] = t29;
        $[61] = t32;
        $[62] = t33;
        $[63] = t34;
        $[64] = t35;
    } else {
        t35 = $[64];
    }
    let t36;
    if ($[65] !== editor) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
            editor: editor
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 340,
            columnNumber: 11
        }, this);
        $[65] = editor;
        $[66] = t36;
    } else {
        t36 = $[66];
    }
    let t37;
    if ($[67] !== editor?.storage.characterCount) {
        t37 = editor?.storage.characterCount?.words() || 0;
        $[67] = editor?.storage.characterCount;
        $[68] = t37;
    } else {
        t37 = $[68];
    }
    let t38;
    if ($[69] !== editor) {
        t38 = editor?.getText().length || 0;
        $[69] = editor;
        $[70] = t38;
    } else {
        t38 = $[70];
    }
    let t39;
    if ($[71] !== t37 || $[72] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4 text-sm text-gray-500",
            children: [
                "Words: ",
                t37,
                " · Characters: ",
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 364,
            columnNumber: 11
        }, this);
        $[71] = t37;
        $[72] = t38;
        $[73] = t39;
    } else {
        t39 = $[73];
    }
    let t40;
    if ($[74] !== t12 || $[75] !== t35 || $[76] !== t36 || $[77] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow-sm p-6 mb-6",
                children: [
                    t12,
                    t35,
                    t36,
                    t39
                ]
            }, void 0, true, {
                fileName: "[project]/components/blog/Add-blog-form.jsx",
                lineNumber: 373,
                columnNumber: 35
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 373,
            columnNumber: 11
        }, this);
        $[74] = t12;
        $[75] = t35;
        $[76] = t36;
        $[77] = t39;
        $[78] = t40;
    } else {
        t40 = $[78];
    }
    let t41;
    if ($[79] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-lg font-semibold mb-4",
            children: "FEATURED MEDIA"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 384,
            columnNumber: 11
        }, this);
        $[79] = t41;
    } else {
        t41 = $[79];
    }
    let t42;
    if ($[80] !== coverImagePreview) {
        t42 = coverImagePreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            src: coverImagePreview,
            alt: "Cover",
            fill: true,
            className: "object-cover"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 391,
            columnNumber: 31
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-4xl mb-2",
                        children: "🏜️"
                    }, void 0, false, {
                        fileName: "[project]/components/blog/Add-blog-form.jsx",
                        lineNumber: 391,
                        columnNumber: 212
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400",
                        children: "No image selected"
                    }, void 0, false, {
                        fileName: "[project]/components/blog/Add-blog-form.jsx",
                        lineNumber: 391,
                        columnNumber: 252
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/blog/Add-blog-form.jsx",
                lineNumber: 391,
                columnNumber: 183
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 391,
            columnNumber: 116
        }, this);
        $[80] = coverImagePreview;
        $[81] = t42;
    } else {
        t42 = $[81];
    }
    let t43;
    let t44;
    if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "AddBlogForm[<button>.onClick]": ()=>fileInputRef.current?.click()
            }["AddBlogForm[<button>.onClick]"],
            className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-900/80 rounded-lg hover:bg-gray-900 transition",
            children: "Set Cover Image"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 400,
            columnNumber: 11
        }, this);
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            onChange: handleCoverImageChange,
            className: "hidden"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 403,
            columnNumber: 11
        }, this);
        $[82] = t43;
        $[83] = t44;
    } else {
        t43 = $[82];
        t44 = $[83];
    }
    let t45;
    if ($[84] !== t42) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800 rounded-lg p-6 text-white",
            children: [
                t41,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-video bg-gray-700 rounded-lg overflow-hidden",
                    children: [
                        t42,
                        t43,
                        t44
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 412,
                    columnNumber: 71
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 412,
            columnNumber: 11
        }, this);
        $[84] = t42;
        $[85] = t45;
    } else {
        t45 = $[85];
    }
    let t46;
    if ($[86] === Symbol.for("react.memo_cache_sentinel")) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-lg font-semibold mb-4",
            children: "TAXONOMY"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 420,
            columnNumber: 11
        }, this);
        $[86] = t46;
    } else {
        t46 = $[86];
    }
    let t47;
    if ($[87] === Symbol.for("react.memo_cache_sentinel")) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-sm mb-2",
            children: "Categories"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 427,
            columnNumber: 11
        }, this);
        $[87] = t47;
    } else {
        t47 = $[87];
    }
    let t48;
    if ($[88] === Symbol.for("react.memo_cache_sentinel")) {
        t48 = ({
            "AddBlogForm[<select>.onChange]": (e_3)=>setCategory(e_3.target.value)
        })["AddBlogForm[<select>.onChange]"];
        $[88] = t48;
    } else {
        t48 = $[88];
    }
    let t49;
    let t50;
    let t51;
    let t52;
    let t53;
    let t54;
    if ($[89] === Symbol.for("react.memo_cache_sentinel")) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "",
            children: "Select Category"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 448,
            columnNumber: 11
        }, this);
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "Travel",
            children: "Travel"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 449,
            columnNumber: 11
        }, this);
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "Giza",
            children: "Giza"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 450,
            columnNumber: 11
        }, this);
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "History",
            children: "History"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 451,
            columnNumber: 11
        }, this);
        t53 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "Culture",
            children: "Culture"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 452,
            columnNumber: 11
        }, this);
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "Food",
            children: "Food"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 453,
            columnNumber: 11
        }, this);
        $[89] = t49;
        $[90] = t50;
        $[91] = t51;
        $[92] = t52;
        $[93] = t53;
        $[94] = t54;
    } else {
        t49 = $[89];
        t50 = $[90];
        t51 = $[91];
        t52 = $[92];
        t53 = $[93];
        t54 = $[94];
    }
    let t55;
    if ($[95] !== category) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4",
            children: [
                t47,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: category,
                    onChange: t48,
                    className: "w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500",
                    children: [
                        t49,
                        t50,
                        t51,
                        t52,
                        t53,
                        t54
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 470,
                    columnNumber: 38
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 470,
            columnNumber: 11
        }, this);
        $[95] = category;
        $[96] = t55;
    } else {
        t55 = $[96];
    }
    let t56;
    if ($[97] === Symbol.for("react.memo_cache_sentinel")) {
        t56 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-sm mb-2",
            children: "Tags"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 478,
            columnNumber: 11
        }, this);
        $[97] = t56;
    } else {
        t56 = $[97];
    }
    let t57;
    if ($[98] !== handleRemoveTag || $[99] !== tags) {
        let t58;
        if ($[101] !== handleRemoveTag) {
            t58 = ({
                "AddBlogForm[tags.map()]": (tag_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-3 py-1 bg-amber-500 rounded-full text-sm flex items-center gap-2",
                        children: [
                            tag_0,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: {
                                    "AddBlogForm[tags.map() > <button>.onClick]": ()=>handleRemoveTag(tag_0)
                                }["AddBlogForm[tags.map() > <button>.onClick]"],
                                className: "hover:text-gray-200",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/components/blog/Add-blog-form.jsx",
                                lineNumber: 488,
                                columnNumber: 150
                            }, this)
                        ]
                    }, tag_0, true, {
                        fileName: "[project]/components/blog/Add-blog-form.jsx",
                        lineNumber: 488,
                        columnNumber: 45
                    }, this)
            })["AddBlogForm[tags.map()]"];
            $[101] = handleRemoveTag;
            $[102] = t58;
        } else {
            t58 = $[102];
        }
        t57 = tags.map(t58);
        $[98] = handleRemoveTag;
        $[99] = tags;
        $[100] = t57;
    } else {
        t57 = $[100];
    }
    let t58;
    if ($[103] !== t57) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2 mb-2",
            children: t57
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 506,
            columnNumber: 11
        }, this);
        $[103] = t57;
        $[104] = t58;
    } else {
        t58 = $[104];
    }
    let t59;
    if ($[105] === Symbol.for("react.memo_cache_sentinel")) {
        t59 = ({
            "AddBlogForm[<input>.onChange]": (e_4)=>setTagInput(e_4.target.value)
        })["AddBlogForm[<input>.onChange]"];
        $[105] = t59;
    } else {
        t59 = $[105];
    }
    let t60;
    if ($[106] !== handleAddTag || $[107] !== tagInput) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            value: tagInput,
            onChange: t59,
            onKeyDown: handleAddTag,
            placeholder: "Add tag...",
            className: "w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 523,
            columnNumber: 11
        }, this);
        $[106] = handleAddTag;
        $[107] = tagInput;
        $[108] = t60;
    } else {
        t60 = $[108];
    }
    let t61;
    if ($[109] !== t58 || $[110] !== t60) {
        t61 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t56,
                t58,
                t60
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 532,
            columnNumber: 11
        }, this);
        $[109] = t58;
        $[110] = t60;
        $[111] = t61;
    } else {
        t61 = $[111];
    }
    let t62;
    if ($[112] !== t55 || $[113] !== t61) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800 rounded-lg p-6 text-white",
            children: [
                t46,
                t55,
                t61
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 541,
            columnNumber: 11
        }, this);
        $[112] = t55;
        $[113] = t61;
        $[114] = t62;
    } else {
        t62 = $[114];
    }
    let t63;
    if ($[115] === Symbol.for("react.memo_cache_sentinel")) {
        t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-lg font-semibold mb-4",
            children: "PUBLISHING INFO"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 550,
            columnNumber: 11
        }, this);
        $[115] = t63;
    } else {
        t63 = $[115];
    }
    let t64;
    if ($[116] === Symbol.for("react.memo_cache_sentinel")) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-sm mb-2",
            children: "Post Author"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 557,
            columnNumber: 11
        }, this);
        $[116] = t64;
    } else {
        t64 = $[116];
    }
    let t65;
    if ($[117] === Symbol.for("react.memo_cache_sentinel")) {
        t65 = ({
            "AddBlogForm[<select>.onChange]": (e_5)=>setAuthor(e_5.target.value)
        })["AddBlogForm[<select>.onChange]"];
        $[117] = t65;
    } else {
        t65 = $[117];
    }
    let t66;
    if ($[118] === Symbol.for("react.memo_cache_sentinel")) {
        t66 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "Ahmed Hassan (Admin)",
            children: "Ahmed Hassan (Admin)"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 573,
            columnNumber: 11
        }, this);
        $[118] = t66;
    } else {
        t66 = $[118];
    }
    let t67;
    if ($[119] !== author) {
        t67 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4",
            children: [
                t64,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: author,
                    onChange: t65,
                    className: "w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500",
                    children: t66
                }, void 0, false, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 580,
                    columnNumber: 38
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 580,
            columnNumber: 11
        }, this);
        $[119] = author;
        $[120] = t67;
    } else {
        t67 = $[120];
    }
    let t68;
    if ($[121] === Symbol.for("react.memo_cache_sentinel")) {
        t68 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-sm",
            children: "Show Author Bio"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 588,
            columnNumber: 11
        }, this);
        $[121] = t68;
    } else {
        t68 = $[121];
    }
    let t69;
    if ($[122] !== showAuthorBio) {
        t69 = ({
            "AddBlogForm[<button>.onClick]": ()=>setShowAuthorBio(!showAuthorBio)
        })["AddBlogForm[<button>.onClick]"];
        $[122] = showAuthorBio;
        $[123] = t69;
    } else {
        t69 = $[123];
    }
    const t70 = `relative w-12 h-6 rounded-full transition ${showAuthorBio ? "bg-amber-500" : "bg-gray-600"}`;
    const t71 = `absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showAuthorBio ? "translate-x-6" : ""}`;
    let t72;
    if ($[124] !== t71) {
        t72 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t71
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 607,
            columnNumber: 11
        }, this);
        $[124] = t71;
        $[125] = t72;
    } else {
        t72 = $[125];
    }
    let t73;
    if ($[126] !== t69 || $[127] !== t70 || $[128] !== t72) {
        t73 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                t68,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: t69,
                    className: t70,
                    children: t72
                }, void 0, false, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 615,
                    columnNumber: 67
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 615,
            columnNumber: 11
        }, this);
        $[126] = t69;
        $[127] = t70;
        $[128] = t72;
        $[129] = t73;
    } else {
        t73 = $[129];
    }
    let t74;
    if ($[130] !== t67 || $[131] !== t73) {
        t74 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800 rounded-lg p-6 text-white",
            children: [
                t63,
                t67,
                t73
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 625,
            columnNumber: 11
        }, this);
        $[130] = t67;
        $[131] = t73;
        $[132] = t74;
    } else {
        t74 = $[132];
    }
    let t75;
    if ($[133] === Symbol.for("react.memo_cache_sentinel")) {
        t75 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-lg font-semibold mb-4",
            children: "SEO SETTINGS"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 634,
            columnNumber: 11
        }, this);
        $[133] = t75;
    } else {
        t75 = $[133];
    }
    let t76;
    if ($[134] === Symbol.for("react.memo_cache_sentinel")) {
        t76 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-sm mb-2",
            children: [
                "Meta Title",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-400 float-right",
                    children: "0 / 60"
                }, void 0, false, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 641,
                    columnNumber: 64
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 641,
            columnNumber: 11
        }, this);
        $[134] = t76;
    } else {
        t76 = $[134];
    }
    let t77;
    if ($[135] === Symbol.for("react.memo_cache_sentinel")) {
        t77 = ({
            "AddBlogForm[<input>.onChange]": (e_6)=>setMetaTitle(e_6.target.value)
        })["AddBlogForm[<input>.onChange]"];
        $[135] = t77;
    } else {
        t77 = $[135];
    }
    let t78;
    if ($[136] !== metaTitle) {
        t78 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4",
            children: [
                t76,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    value: metaTitle,
                    onChange: t77,
                    placeholder: "Search engine title",
                    maxLength: 60,
                    className: "w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                }, void 0, false, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 657,
                    columnNumber: 38
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 657,
            columnNumber: 11
        }, this);
        $[136] = metaTitle;
        $[137] = t78;
    } else {
        t78 = $[137];
    }
    let t79;
    if ($[138] === Symbol.for("react.memo_cache_sentinel")) {
        t79 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block text-sm mb-2",
            children: [
                "Meta Description",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-400 float-right",
                    children: "0 / 160"
                }, void 0, false, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 665,
                    columnNumber: 70
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 665,
            columnNumber: 11
        }, this);
        $[138] = t79;
    } else {
        t79 = $[138];
    }
    let t80;
    if ($[139] === Symbol.for("react.memo_cache_sentinel")) {
        t80 = ({
            "AddBlogForm[<textarea>.onChange]": (e_7)=>setMetaDescription(e_7.target.value)
        })["AddBlogForm[<textarea>.onChange]"];
        $[139] = t80;
    } else {
        t80 = $[139];
    }
    let t81;
    if ($[140] !== metaDescription) {
        t81 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t79,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    value: metaDescription,
                    onChange: t80,
                    placeholder: "Brief summary for search results...",
                    maxLength: 160,
                    rows: 3,
                    className: "w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                }, void 0, false, {
                    fileName: "[project]/components/blog/Add-blog-form.jsx",
                    lineNumber: 681,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 681,
            columnNumber: 11
        }, this);
        $[140] = metaDescription;
        $[141] = t81;
    } else {
        t81 = $[141];
    }
    let t82;
    if ($[142] !== t78 || $[143] !== t81) {
        t82 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800 rounded-lg p-6 text-white",
            children: [
                t75,
                t78,
                t81
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 689,
            columnNumber: 11
        }, this);
        $[142] = t78;
        $[143] = t81;
        $[144] = t82;
    } else {
        t82 = $[144];
    }
    let t83;
    if ($[145] !== visibility) {
        t83 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm",
            children: [
                "👁️ Visibility: ",
                visibility
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 698,
            columnNumber: 11
        }, this);
        $[145] = visibility;
        $[146] = t83;
    } else {
        t83 = $[146];
    }
    let t84;
    if ($[147] === Symbol.for("react.memo_cache_sentinel")) {
        t84 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "text-amber-500 text-sm hover:underline",
            children: "Edit"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 706,
            columnNumber: 11
        }, this);
        $[147] = t84;
    } else {
        t84 = $[147];
    }
    let t85;
    if ($[148] !== t83) {
        t85 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                t83,
                t84
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 713,
            columnNumber: 11
        }, this);
        $[148] = t83;
        $[149] = t85;
    } else {
        t85 = $[149];
    }
    let t86;
    if ($[150] !== publishStatus) {
        t86 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm",
            children: [
                "📅 Publish: ",
                publishStatus
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 721,
            columnNumber: 11
        }, this);
        $[150] = publishStatus;
        $[151] = t86;
    } else {
        t86 = $[151];
    }
    let t87;
    if ($[152] === Symbol.for("react.memo_cache_sentinel")) {
        t87 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "text-amber-500 text-sm hover:underline",
            children: "Edit"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 729,
            columnNumber: 11
        }, this);
        $[152] = t87;
    } else {
        t87 = $[152];
    }
    let t88;
    if ($[153] !== t86) {
        t88 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                t86,
                t87
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 736,
            columnNumber: 11
        }, this);
        $[153] = t86;
        $[154] = t88;
    } else {
        t88 = $[154];
    }
    let t89;
    if ($[155] === Symbol.for("react.memo_cache_sentinel")) {
        t89 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition",
            children: "🗑️ Move to Trash"
        }, void 0, false, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 744,
            columnNumber: 11
        }, this);
        $[155] = t89;
    } else {
        t89 = $[155];
    }
    let t90;
    if ($[156] !== t85 || $[157] !== t88) {
        t90 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800 rounded-lg p-6 text-white space-y-4",
            children: [
                t85,
                t88,
                t89
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 751,
            columnNumber: 11
        }, this);
        $[156] = t85;
        $[157] = t88;
        $[158] = t90;
    } else {
        t90 = $[158];
    }
    let t91;
    if ($[159] !== t45 || $[160] !== t62 || $[161] !== t74 || $[162] !== t82 || $[163] !== t90) {
        t91 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "lg:w-96 space-y-6",
            children: [
                t45,
                t62,
                t74,
                t82,
                t90
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 760,
            columnNumber: 11
        }, this);
        $[159] = t45;
        $[160] = t62;
        $[161] = t74;
        $[162] = t82;
        $[163] = t90;
        $[164] = t91;
    } else {
        t91 = $[164];
    }
    let t92;
    if ($[165] !== t40 || $[166] !== t91) {
        t92 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col lg:flex-row gap-6",
            children: [
                t40,
                t91
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 772,
            columnNumber: 11
        }, this);
        $[165] = t40;
        $[166] = t91;
        $[167] = t92;
    } else {
        t92 = $[167];
    }
    let t93;
    if ($[168] !== t10 || $[169] !== t92) {
        t93 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "max-w-7xl mx-auto py-8 px-4",
            children: [
                t10,
                t92
            ]
        }, void 0, true, {
            fileName: "[project]/components/blog/Add-blog-form.jsx",
            lineNumber: 781,
            columnNumber: 11
        }, this);
        $[168] = t10;
        $[169] = t92;
        $[170] = t93;
    } else {
        t93 = $[170];
    }
    return t93;
}
_s(AddBlogForm, "XgCB+g+UNM06k5MWNJBZmBGqLIY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"]
    ];
});
_c = AddBlogForm;
const __TURBOPACK__default__export__ = AddBlogForm;
var _c;
__turbopack_context__.k.register(_c, "AddBlogForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/Blog/AddBlog.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$blog$2f$Add$2d$blog$2d$form$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/blog/Add-blog-form.jsx [client] (ecmascript)");
;
;
;
;
;
function AddBlog() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "97f69c5e99398c68e5a1710c3d305bbf1835acd162c0809dfac43d3de893bee3") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "97f69c5e99398c68e5a1710c3d305bbf1835acd162c0809dfac43d3de893bee3";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "AtlasEgypt - Add Blog"
                }, void 0, false, {
                    fileName: "[project]/pages/Blog/AddBlog.js",
                    lineNumber: 15,
                    columnNumber: 16
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "description",
                    content: "Add a new blog post to share your insights and updates with the AtlasEgypt community."
                }, void 0, false, {
                    fileName: "[project]/pages/Blog/AddBlog.js",
                    lineNumber: 15,
                    columnNumber: 52
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "robots",
                    content: "noindex, nofollow"
                }, void 0, false, {
                    fileName: "[project]/pages/Blog/AddBlog.js",
                    lineNumber: 15,
                    columnNumber: 175
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/Blog/AddBlog.js",
            lineNumber: 15,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/BlogPageBanner.jpg",
            alt: "Blog Page Banner",
            fill: true,
            className: "object-cover object-center z-0",
            priority: true
        }, void 0, false, {
            fileName: "[project]/pages/Blog/AddBlog.js",
            lineNumber: 23,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-black/40"
        }, void 0, false, {
            fileName: "[project]/pages/Blog/AddBlog.js",
            lineNumber: 24,
            columnNumber: 10
        }, this);
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "mt-20 md:mt-24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "relative w-full h-[40vh] md:h-[60vh]",
                        children: [
                            t1,
                            t2,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center ",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl md:text-6xl font-bold mb-6",
                                        children: "Welcome to Our Blog"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/Blog/AddBlog.js",
                                        lineNumber: 33,
                                        columnNumber: 224
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg md:text-xl max-w-4xl mb-5",
                                        children: "Discover the latest news, tips, and insights about our services and the travel industry. Stay updated with our expert articles and guides to make the most of your travel experiences."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/Blog/AddBlog.js",
                                        lineNumber: 33,
                                        columnNumber: 300
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/Blog/AddBlog.js",
                                lineNumber: 33,
                                columnNumber: 115
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$blog$2f$Add$2d$blog$2d$form$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/pages/Blog/AddBlog.js",
                                lineNumber: 33,
                                columnNumber: 541
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/Blog/AddBlog.js",
                        lineNumber: 33,
                        columnNumber: 49
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/Blog/AddBlog.js",
                    lineNumber: 33,
                    columnNumber: 16
                }, this)
            ]
        }, void 0, true);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return t3;
}
_c = AddBlog;
const __TURBOPACK__default__export__ = AddBlog;
var _c;
__turbopack_context__.k.register(_c, "AddBlog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/Blog/AddBlog.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/Blog/AddBlog";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/Blog/AddBlog.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/Blog/AddBlog.js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/Blog/AddBlog.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__2fc08901._.js.map