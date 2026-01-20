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
"[project]/components/ui/Button.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
;
;
function Button(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "9711ff576cde3ce90b5fdfd85c9ef72eaeefaba677c197862ddb2b915712c29c") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9711ff576cde3ce90b5fdfd85c9ef72eaeefaba677c197862ddb2b915712c29c";
    }
    let children;
    let props;
    if ($[1] !== t0) {
        ({ children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = props;
    } else {
        children = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== children || $[5] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            ...props,
            className: "bg-amber-500 text-black rounded-3xl p-2.5 font-semibold text-lg hover:bg-transparent hover:border-orange-500 hover:border-2 cursor-pointer",
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/Button.jsx",
            lineNumber: 27,
            columnNumber: 10
        }, this);
        $[4] = children;
        $[5] = props;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    return t1;
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/data.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlogs",
    ()=>getBlogs,
    "getDestinationById",
    ()=>getDestinationById,
    "getDestinations",
    ()=>getDestinations,
    "getTours",
    ()=>getTours,
    "getToursById",
    ()=>getToursById
]);
const Destinations = [
    {
        "id": 1,
        "name": "Giza Pyramids",
        "city": "Giza",
        "description": "One of the Seven Wonders of the Ancient World and a world-famous archaeological site.",
        "image": "/trips/giza-pyramids.jpeg",
        "category": "Historical",
        "rating": 4.9
    },
    {
        "id": 2,
        "name": "Karnak Temple",
        "city": "Luxor",
        "description": "The largest religious complex in ancient Egypt with massive columns and statues.",
        "image": "/trips/karnak-temple.jpeg",
        "category": "Historical",
        "rating": 4.8
    },
    {
        "id": 3,
        "name": "Sharm El Sheikh",
        "city": "South Sinai",
        "description": "A famous tourist city known for resorts, beaches, and diving spots.",
        "image": "/trips/sharm-el-sheikh.jpeg",
        "category": "Beaches",
        "rating": 4.7
    },
    {
        "id": 4,
        "name": "Nile River Cruise",
        "city": "Cairo to Aswan",
        "description": "Experience the beauty of Egypt while cruising along the Nile River.",
        "image": "/trips/nile-cruise.jpeg",
        "category": "Cruises",
        "rating": 4.9
    },
    {
        "id": 5,
        "name": "Abu Simbel Temples",
        "city": "Aswan",
        "description": "Famous rock temples built by Ramses II, relocated to avoid flooding from the Aswan High Dam.",
        "image": "/trips/Abu-Simbel.jpg",
        "category": "Historical",
        "rating": 4.8
    },
    {
        "id": 6,
        "name": "Siwa Oasis",
        "city": "Western Desert",
        "description": "A remote oasis known for its unique culture, natural springs, and ancient ruins.",
        "image": "/trips/siwa-oasis.jpeg",
        "category": "Nature",
        "rating": 4.6
    },
    {
        "id": 7,
        "name": "Alexandria city",
        "city": "Alexandria",
        "description": "Home to the historic Library of Alexandria and beautiful Mediterranean beaches.",
        "image": "/trips/Alexandria-city.jpeg",
        "category": "City Trips",
        "rating": 4.5
    },
    {
        "id": 9,
        "name": "Dahab",
        "city": "Sinai Peninsula",
        "description": "A laid-back beach town known for its diving spots and relaxed atmosphere.",
        "image": "/trips/Dahab-city-trip.jpg",
        "category": "Beaches",
        "rating": 4.6
    },
    {
        "id": 10,
        "name": "Luxor Temple",
        "city": "Luxor",
        "description": "An ancient temple complex located on the east bank of the Nile River.",
        "image": "/trips/Luxor-temple.jpg",
        "category": "Historical",
        "rating": 4.8
    }
];
const tours = [
    {
        "tourId": 101,
        "title": "Full-Day Tour to the Pyramids and Sphinx",
        "price": 850,
        "currency": "EGP",
        "duration": "8 hours",
        "includes": [
            "Tour guide",
            "Air-conditioned vehicle",
            "Entry tickets"
        ],
        "image": "/trips/giza-pyramids.jpeg"
    },
    {
        "tourId": 102,
        "title": "Nile Dinner Cruise",
        "price": 600,
        "currency": "EGP",
        "duration": "2 hours",
        "includes": [
            "Dinner",
            "Oriental music",
            "Tanoura show"
        ],
        "image": "/trips/nile-cruise.jpeg"
    },
    {
        "tourId": 103,
        "title": "Sharm El Sheikh trip and Diving Experience",
        "price": 5000,
        "currency": "EGP",
        "duration": "7 Days",
        "includes": [
            "breakfast",
            "Dinner",
            "Oriental music",
            "Tanoura show",
            "Diving sessions",
            "Hotel accommodation",
            "Airport transfers"
        ],
        "image": "/trips/sharm-el-sheikh.jpeg"
    },
    {
        "tourId": 104,
        "title": "Luxor and Karnak Temples Tour",
        "price": 4200,
        "currency": "EGP",
        "duration": "10 hours",
        "includes": [
            "Tour guide",
            "Air-conditioned vehicle",
            "Entry tickets",
            "Lunch"
        ],
        "image": "/trips/karnak-temple.jpeg"
    },
    {
        "tourId": 105,
        "title": "Abu Simbel Day Trip from Aswan",
        "price": 3000,
        "currency": "EGP",
        "duration": "12 hours",
        "includes": [
            "Tour guide",
            "Air-conditioned vehicle",
            "Entry tickets",
            "Lunch"
        ],
        "image": "/trips/Abu-Simbel.jpg"
    },
    {
        "tourId": 106,
        "title": "Siwa Oasis Adventure Tour",
        "price": 7500,
        "currency": "EGP",
        "duration": "3 Days",
        "includes": [
            "Accommodation",
            "Meals",
            "Guided tours",
            "Transportation"
        ],
        "image": "/trips/siwa-oasis.jpeg"
    }
];
const blogs = [
    {
        "postId": 301,
        "title": "Best Time to Visit Egypt",
        "content": "The best time to visit is from October to April when the weather is mild and pleasant.",
        "image": "/blogs/best-time.jpeg",
        "publishedAt": "2023-11-15",
        "author": "Ramy Ahmed"
    },
    {
        "postId": 302,
        "title": "10 Travel Tips for Visiting Egypt",
        "content": "Visit historical sites, book tours with trusted companies, and plan ahead for peak season.",
        "image": "/blogs/tips.jpeg",
        "publishedAt": "2023-12-01",
        "author": "Sara El-Masry"
    },
    {
        "postId": 303,
        "title": "Exploring the Egyptian Cuisine",
        "content": "Try traditional dishes like koshari, ful medames, and molokhia for an authentic taste of Egypt.",
        "image": "/blogs/cuisine.jpeg",
        "publishedAt": "2024-01-10",
        "author": "Omar Hassan"
    },
    {
        "postId": 304,
        "title": "Top 5 Beaches in Egypt",
        "content": "Discover the best beaches in Sharm El Sheikh, Dahab, and Marsa Matruh for sun and sea lovers.",
        "image": "/blogs/beaches.jpeg",
        "publishedAt": "2024-02-20",
        "author": "Laila Nasser"
    },
    {
        "postId": 305,
        "title": "Cultural Etiquette in Egypt",
        "content": "Respect local customs, dress modestly, and always ask permission before taking photos of people.",
        "image": "/blogs/etiquette.jpeg",
        "publishedAt": "2024-03-15",
        "author": "Youssef Karim"
    },
    {
        "postId": 306,
        "title": "Must-See Historical Sites in Egypt",
        "content": "From the Pyramids of Giza to the temples of Luxor, explore Egypt's rich history and heritage.",
        "image": "/blogs/historical-sites.jpeg",
        "publishedAt": "2024-04-05",
        "author": "Nadia Fathy"
    }
];
function getDestinations() {
    return Destinations;
}
function getTours() {
    return tours;
}
function getBlogs() {
    return blogs;
}
function getDestinationById(id) {
    return Destinations.find((destination)=>destination.id === id);
}
function getToursById(tourId) {
    return tours.find((tour)=>tour.tourId === tourId);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/Blog/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/compiler-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/data.js [client] (ecmascript)");
;
;
;
;
;
;
function BlogPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$compiler$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "68d3ef9703ced112e434b7a06cb578b9f33b49101e33f91091332500815c3393") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "68d3ef9703ced112e434b7a06cb578b9f33b49101e33f91091332500815c3393";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        const blogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getBlogs"])();
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                            children: "AtlasEgypt - Blog"
                        }, void 0, false, {
                            fileName: "[project]/pages/Blog/index.js",
                            lineNumber: 17,
                            columnNumber: 18
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                            name: "description",
                            content: "Stay updated with the latest news, tips, and insights from AtlasEgypt. Explore our blog for expert articles and travel guides."
                        }, void 0, false, {
                            fileName: "[project]/pages/Blog/index.js",
                            lineNumber: 17,
                            columnNumber: 50
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/Blog/index.js",
                    lineNumber: 17,
                    columnNumber: 12
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "mt-20 md:mt-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "relative w-full h-[40vh] md:h-[60vh]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/BlogPageBanner.jpg",
                                    alt: "Blog Page Banner",
                                    fill: true,
                                    className: "object-cover object-center z-0",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/pages/Blog/index.js",
                                    lineNumber: 17,
                                    columnNumber: 312
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black/40"
                                }, void 0, false, {
                                    fileName: "[project]/pages/Blog/index.js",
                                    lineNumber: 17,
                                    columnNumber: 441
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center ",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-4xl md:text-6xl font-bold mb-6",
                                            children: "Welcome to Our Blog"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/Blog/index.js",
                                            lineNumber: 17,
                                            columnNumber: 598
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg md:text-xl max-w-4xl mb-5",
                                            children: "Discover the latest news, tips, and insights about our services and the travel industry. Stay updated with our expert articles and guides to make the most of your travel experiences."
                                        }, void 0, false, {
                                            fileName: "[project]/pages/Blog/index.js",
                                            lineNumber: 17,
                                            columnNumber: 674
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            className: "hover:text-white",
                                            children: "Add Post"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/Blog/index.js",
                                            lineNumber: 17,
                                            columnNumber: 909
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/Blog/index.js",
                                    lineNumber: 17,
                                    columnNumber: 489
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/Blog/index.js",
                            lineNumber: 17,
                            columnNumber: 254
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "max-w-7xl mx-auto px-4 py-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl text-center",
                                    children: "Latest Blog Posts"
                                }, void 0, false, {
                                    fileName: "[project]/pages/Blog/index.js",
                                    lineNumber: 17,
                                    columnNumber: 1029
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8",
                                    children: blogs.map(_BlogPageBlogsMap)
                                }, void 0, false, {
                                    fileName: "[project]/pages/Blog/index.js",
                                    lineNumber: 17,
                                    columnNumber: 1088
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/Blog/index.js",
                            lineNumber: 17,
                            columnNumber: 979
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/Blog/index.js",
                    lineNumber: 17,
                    columnNumber: 221
                }, this)
            ]
        }, void 0, true);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c = BlogPage;
function _BlogPageBlogsMap(blog) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg overflow-hidden shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-48 w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    src: blog.image,
                    alt: blog.title,
                    fill: true,
                    className: "object-cover"
                }, void 0, false, {
                    fileName: "[project]/pages/Blog/index.js",
                    lineNumber: 25,
                    columnNumber: 116
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/Blog/index.js",
                lineNumber: 25,
                columnNumber: 78
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center px-4 pt-4 space-x-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mb-2",
                        children: blog.publishedAt
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 25,
                        columnNumber: 257
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-l h-4 border-gray-500 mb-2"
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 25,
                        columnNumber: 321
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 mb-2",
                        children: blog.author
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 25,
                        columnNumber: 374
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Blog/index.js",
                lineNumber: 25,
                columnNumber: 202
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold mb-2",
                        children: blog.title
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 25,
                        columnNumber: 460
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-700 mb-4",
                        children: blog.content
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 25,
                        columnNumber: 516
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Blog/index.js",
                lineNumber: 25,
                columnNumber: 439
            }, this)
        ]
    }, blog.id, true, {
        fileName: "[project]/pages/Blog/index.js",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "BlogPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/Blog/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/Blog";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/Blog/index.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/Blog/index.js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/Blog/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__6cc41d04._.js.map