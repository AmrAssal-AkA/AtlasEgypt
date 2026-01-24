module.exports = [
"[project]/data/data.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlogs",
    ()=>getBlogs,
    "getDestinationById",
    ()=>getDestinationById,
    "getTours",
    ()=>getTours,
    "getToursById",
    ()=>getToursById
]);
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
}),
"[project]/helper/db-util.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllDestination",
    ()=>getAllDestination,
    "getAllTours",
    ()=>getAllTours
]);
async function getAllDestination() {
    const response = await fetch("https://atlasegypt-5d673-default-rtdb.firebaseio.com/Destination.json");
    const data = await response.json();
    const destinations = [];
    for(const key in data){
        destinations.push({
            id: key,
            ...data[key]
        });
    }
    return destinations;
}
async function getAllTours() {
    const response = await fetch("https://atlasegypt-5d673-default-rtdb.firebaseio.com/tours.json");
    const data = await response.json();
    const tours = [];
    for(const key in data){
        tours.push({
            id: key,
            ...data[key]
        });
    }
    return tours;
}
}),
"[project]/pages/Discover/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DestinationPage,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [ssr] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Button.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/data.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$db$2d$util$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/helper/db-util.js [ssr] (ecmascript)");
;
;
;
;
;
;
;
;
function DestinationPage(props) {
    const { destinations } = props;
    const tours = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getTours"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleClick = (id)=>{
        router.push(`/Discover/${id}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "AtlasEgypt - Discover Egypt"
                    }, void 0, false, {
                        fileName: "[project]/pages/Discover/index.js",
                        lineNumber: 25,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Explore the wonders of Egypt with AtlasEgypt. Discover top destinations and ready tours."
                    }, void 0, false, {
                        fileName: "[project]/pages/Discover/index.js",
                        lineNumber: 26,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Discover/index.js",
                lineNumber: 24,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: " mt-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-bold px-5 mb-5",
                                children: "Explore Egypt wonder's"
                            }, void 0, false, {
                                fileName: "[project]/pages/Discover/index.js",
                                lineNumber: 30,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-xl font-medium",
                                children: "Discover the magic of Egypt, from the ancient pyramids to the vibrant coral reefs. Our curated destinations offer a glimpse into the rich history and breathtaking landscapes of this extraordinary country."
                            }, void 0, false, {
                                fileName: "[project]/pages/Discover/index.js",
                                lineNumber: 31,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/Discover/index.js",
                        lineNumber: 29,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-4xl font-semibold text-center",
                                children: "Feature Distinations"
                            }, void 0, false, {
                                fileName: "[project]/pages/Discover/index.js",
                                lineNumber: 38,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-10 mt-10  px-5",
                                children: destinations.map((destination)=>{
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: " rounded-lg shadow-xl overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative w-full h-48",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    src: destination.image,
                                                    alt: destination.name,
                                                    fill: true,
                                                    className: "object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/Discover/index.js",
                                                    lineNumber: 51,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/Discover/index.js",
                                                lineNumber: 50,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold mb-2",
                                                        children: destination.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 60,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                                                className: "inline-block mb-2 mr-2 text-orange-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/Discover/index.js",
                                                                lineNumber: 64,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-600 mb-2",
                                                                children: destination.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/Discover/index.js",
                                                                lineNumber: 65,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 63,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "absolute top-2 right-2 flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                className: "mr-1 fill-yellow-500 border-yellow-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/Discover/index.js",
                                                                lineNumber: 69,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    " ",
                                                                    destination.rating
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/Discover/index.js",
                                                                lineNumber: 70,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 68,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-700 mb-4",
                                                        children: destination.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 72,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        onClick: ()=>handleClick(destination.id),
                                                        children: "Learn More"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 75,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/Discover/index.js",
                                                lineNumber: 59,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, destination.id, true, {
                                        fileName: "[project]/pages/Discover/index.js",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/pages/Discover/index.js",
                                lineNumber: 42,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/Discover/index.js",
                        lineNumber: 37,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: " justify-center mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-4xl font-semibold text-center",
                                children: "Related Ready Tours"
                            }, void 0, false, {
                                fileName: "[project]/pages/Discover/index.js",
                                lineNumber: 88,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto px-4",
                                children: tours.map((tour)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl overflow-hidden shadow-md",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative h-64 w-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    src: tour.image,
                                                    alt: tour.title,
                                                    fill: true,
                                                    className: "object-center"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/Discover/index.js",
                                                    lineNumber: 98,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/Discover/index.js",
                                                lineNumber: 97,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "text-2xl font-bold mb-2",
                                                        children: tour.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 106,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-600 flex items-center mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 16,
                                                                className: "mr-1 text-amber-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/Discover/index.js",
                                                                lineNumber: 108,
                                                                columnNumber: 19
                                                            }, this),
                                                            tour.duration
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 107,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-xl ",
                                                        children: tour.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 111,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mt-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-amber-600 font-bold text-xl",
                                                                children: [
                                                                    tour.price,
                                                                    " EGP"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/Discover/index.js",
                                                                lineNumber: 113,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                onClick: ()=>handleClick(tour.tourId),
                                                                children: "View Tour"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/Discover/index.js",
                                                                lineNumber: 116,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/Discover/index.js",
                                                        lineNumber: 112,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/Discover/index.js",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, tour.tourId, true, {
                                        fileName: "[project]/pages/Discover/index.js",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/Discover/index.js",
                                lineNumber: 91,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/Discover/index.js",
                        lineNumber: 87,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Discover/index.js",
                lineNumber: 28,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
async function getStaticProps() {
    const Destinations = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$db$2d$util$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllDestination"])();
    return {
        props: {
            destinations: Destinations
        },
        revalidate: 1800
    };
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__405653fe._.js.map