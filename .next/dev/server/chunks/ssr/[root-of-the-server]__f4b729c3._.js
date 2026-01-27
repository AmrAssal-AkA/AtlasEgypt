module.exports = [
"[project]/data/data.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlogs",
    ()=>getBlogs,
    "getDestinationById",
    ()=>getDestinationById,
    "getToursById",
    ()=>getToursById
]);
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
function getBlogs() {
    return blogs;
}
function getDestinationById(id) {
    return Destinations.find((destination)=>destination.id === id);
}
function getToursById(tourId) {
    return tours.find((tour)=>tour.tourId === tourId);
}
}),
"[project]/components/blog/blog-grid.jsx [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/components/blog/blog-grid.jsx'\n\nExpected '</', got '}'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/pages/Blog/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/data.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$blog$2f$blog$2d$grid$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/blog/blog-grid.jsx [ssr] (ecmascript)");
;
;
;
;
;
;
function BlogPage() {
    const blogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getBlogs"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "AtlasEgypt - Blog"
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 13,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Stay updated with the latest news, tips, and insights from AtlasEgypt. Explore our blog for expert articles and travel guides."
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 14,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Blog/index.js",
                lineNumber: 12,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "mt-20 md:mt-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "relative w-full h-[40vh] md:h-[60vh]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/BlogPageBanner.jpg",
                                alt: "Blog Page Banner",
                                fill: true,
                                className: "object-cover object-center z-0",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/pages/Blog/index.js",
                                lineNumber: 18,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/40"
                            }, void 0, false, {
                                fileName: "[project]/pages/Blog/index.js",
                                lineNumber: 25,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center ",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl md:text-6xl font-bold mb-6",
                                        children: "Welcome to Our Blog"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/Blog/index.js",
                                        lineNumber: 27,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-lg md:text-xl max-w-4xl mb-5",
                                        children: "Discover the latest news, tips, and insights about our services and the travel industry. Stay updated with our expert articles and guides to make the most of your travel experiences."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/Blog/index.js",
                                        lineNumber: 30,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        className: "hover:text-white",
                                        children: "Add Post"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/Blog/index.js",
                                        lineNumber: 35,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/Blog/index.js",
                                lineNumber: 26,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 17,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$blog$2f$blog$2d$grid$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        blogs: blogs
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Blog/index.js",
                lineNumber: 16,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f4b729c3._.js.map