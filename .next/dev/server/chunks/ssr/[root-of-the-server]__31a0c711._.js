module.exports = [
"[project]/Documents/Git-Projects/AtlasEgypt/helper/data-util.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllDestination",
    ()=>getAllDestination,
    "getDestinationById",
    ()=>getDestinationById,
    "getFeaturedDestination",
    ()=>getFeaturedDestination
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
async function getFeaturedDestination() {
    const allDestination = await getAllDestination();
    return allDestination.filter((destination)=>destination.isFeatured);
}
async function getDestinationById(Id) {
    const allDestination = await getAllDestination();
    return allDestination.find((destination)=>destination.id === Id);
}
}),
"[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getStaticPaths",
    ()=>getStaticPaths,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/lucide-react/dist/esm/icons/star.js [ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/lucide-react/dist/esm/icons/bookmark.js [ssr] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$data$2d$util$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/helper/data-util.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$ui$2f$Button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/components/ui/Button.jsx [ssr] (ecmascript)");
;
;
;
;
;
;
;
function TripDetailPage(props) {
    const destinationDetails = props.DestinationDetails;
    if (!destinationDetails) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
            lineNumber: 12,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: [
                            "AtlasEgypt - ",
                            destinationDetails.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: destinationDetails.description
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "mt-20 md:min-h-screen p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "bg-gray-100 relative rounded-lg overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: destinationDetails.image,
                                    alt: destinationDetails.name,
                                    width: 300,
                                    height: 150,
                                    className: "w-full h-auto rounded-lg"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-0 left-0 right-0 z-10 px-4 pb-8 md:pb-15 bg-white bg-opacity-50 shadow-amber-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl md:text-5xl font-bold text-black mt-2",
                                            children: destinationDetails.name
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                            lineNumber: 32,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                                    className: "inline-block mt-2 mb-2 mr-2 text-orange-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                    lineNumber: 36,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 mb-2 inline-block",
                                                    children: destinationDetails.category
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                    lineNumber: 37,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                            lineNumber: 35,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "absolute top-2 right-2 flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                    className: "mr-1 fill-yellow-500 border-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                    lineNumber: 40,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        " ",
                                                        destinationDetails.rating
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                    lineNumber: 41,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                            lineNumber: 39,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "absolute top-2 right-2 flex items-center my-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "mr-5 text-2xl font-bold ",
                                                    children: [
                                                        " ",
                                                        destinationDetails.price,
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-amber-500",
                                                            children: "EGP"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                            lineNumber: 44,
                                                            columnNumber: 87
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                    lineNumber: 44,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$ui$2f$Button$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "mt-4",
                                                    children: "Book Now"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                    lineNumber: 45,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "my-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl md:text-4xl font-bold mb-4",
                                    children: [
                                        "About ",
                                        destinationDetails.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700 text-lg md:text-xl",
                                    children: destinationDetails.description
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                    className: "w-full mt-8 table-auto border-collapse border border-gray-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        className: "border border-gray-300 px-4 py-2 font-semibold text-2xl",
                                                        children: "Includes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                        lineNumber: 59,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        className: "border border-gray-300 px-4 py-2 text-xl",
                                                        children: destinationDetails.Includes
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                        lineNumber: 60,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                lineNumber: 58,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                className: "bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        className: "border border-gray-300 px-4 py-2 font-semibold text-2xl",
                                                        children: "Best Time to Visit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                        lineNumber: 63,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        className: "border border-gray-300 px-4 py-2 text-xl",
                                                        children: destinationDetails.BestTimeToVisit
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                        lineNumber: 64,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        className: "border border-gray-300 px-4 py-2 font-semibold text-2xl",
                                                        children: "Attractions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                        lineNumber: 67,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        className: "border border-gray-300 px-4 py-2 text-xl",
                                                        children: destinationDetails.Attractions
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                        lineNumber: 68,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                lineNumber: 66,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                className: "bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        className: "border border-gray-300 px-4 py-2 font-semibold text-2xl",
                                                        children: "Activities"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                        lineNumber: 71,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        className: "border border-gray-300 px-4 py-2 text-xl",
                                                        children: destinationDetails.Activities
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                        lineNumber: 72,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                                lineNumber: 70,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Discover/[Id].js",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
async function getStaticProps(context) {
    const { params } = context;
    const { Id } = params;
    const destination = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$data$2d$util$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDestinationById"])(Id);
    return {
        props: {
            DestinationDetails: destination
        },
        revalidate: 1800
    };
}
async function getStaticPaths() {
    const destinations = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$data$2d$util$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllDestination"])();
    const paths = destinations.map((destination)=>({
            params: {
                Id: destination.id
            }
        }));
    return {
        paths: paths,
        fallback: false
    };
}
const __TURBOPACK__default__export__ = TripDetailPage;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__31a0c711._.js.map