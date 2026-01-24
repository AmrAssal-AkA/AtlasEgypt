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
                        lineNumber: 12,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Stay updated with the latest news, tips, and insights from AtlasEgypt. Explore our blog for expert articles and travel guides."
                    }, void 0, false, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 13,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Blog/index.js",
                lineNumber: 11,
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
                                lineNumber: 17,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/40"
                            }, void 0, false, {
                                fileName: "[project]/pages/Blog/index.js",
                                lineNumber: 24,
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
                                        lineNumber: 26,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-lg md:text-xl max-w-4xl mb-5",
                                        children: "Discover the latest news, tips, and insights about our services and the travel industry. Stay updated with our expert articles and guides to make the most of your travel experiences."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/Blog/index.js",
                                        lineNumber: 29,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        className: "hover:text-white",
                                        children: "Add Post"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/Blog/index.js",
                                        lineNumber: 34,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/Blog/index.js",
                                lineNumber: 25,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 16,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "max-w-7xl mx-auto px-4 py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-4xl text-center",
                                children: "Latest Blog Posts"
                            }, void 0, false, {
                                fileName: "[project]/pages/Blog/index.js",
                                lineNumber: 38,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8",
                                children: blogs.map((blog)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg overflow-hidden shadow-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative h-48 w-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    src: blog.image,
                                                    alt: blog.title,
                                                    fill: true,
                                                    className: "object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/Blog/index.js",
                                                    lineNumber: 43,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/Blog/index.js",
                                                lineNumber: 42,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center px-4 pt-4 space-x-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500 mb-2",
                                                        children: blog.publishedAt
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Blog/index.js",
                                                        lineNumber: 51,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "border-l h-4 border-gray-500 mb-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Blog/index.js",
                                                        lineNumber: 52,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500 mb-2",
                                                        children: blog.author
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Blog/index.js",
                                                        lineNumber: 53,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/Blog/index.js",
                                                lineNumber: 50,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-bold mb-2",
                                                        children: blog.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Blog/index.js",
                                                        lineNumber: 56,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-700 mb-4",
                                                        children: blog.content
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Blog/index.js",
                                                        lineNumber: 57,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/Blog/index.js",
                                                lineNumber: 55,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, blog.id, true, {
                                        fileName: "[project]/pages/Blog/index.js",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/Blog/index.js",
                                lineNumber: 39,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/Blog/index.js",
                        lineNumber: 37,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Blog/index.js",
                lineNumber: 15,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__7dfe5e80._.js.map