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
"[project]/helper/data-util.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllDestination",
    ()=>getAllDestination,
    "getAllTours",
    ()=>getAllTours,
    "getDestinationById",
    ()=>getDestinationById,
    "getFeaturedTours",
    ()=>getFeaturedTours
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
async function getFeaturedTours() {
    const allTours = await getAllTours();
    return allTours.filter((tour)=>tour.isFeatured);
}
async function getDestinationById(Id) {
    const allDetination = await getAllDestination();
    return allDetination.find((destination)=>destination.Id === Id);
}
}),
"[project]/pages/Discover/[Id].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getStaticpaths",
    ()=>getStaticpaths,
    "getStaticprops",
    ()=>getStaticprops
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/data.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$data$2d$util$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/helper/data-util.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
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
            fileName: "[project]/pages/Discover/[Id].js",
            lineNumber: 10,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "mt-50 max-w-7xl mx-auto mb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold px-5 mb-5",
                children: [
                    "Trip Detail Page - ",
                    destinationDetails.Id
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Discover/[Id].js",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-xl font-medium",
                children: [
                    "This is the detail page for trip with ID: ",
                    destinationDetails.Id
                ]
            }, void 0, true, {
                fileName: "[project]/pages/Discover/[Id].js",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/Discover/[Id].js",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
async function getStaticprops(context) {
    const { params } = context;
    const { Id } = params;
    const destiantion = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$data$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getDestinationById"])(Id);
    return {
        props: {
            DestinationDetails: destiantion
        },
        revalidate: 3600
    };
}
async function getStaticpaths() {
    const destinations = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$data$2d$util$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getAllDestination"])();
    const paths = destinations.map((destination)=>({
            params: {
                Id: destination.Id
            }
        }));
    return {
        paths: paths,
        fallback: true
    };
}
const __TURBOPACK__default__export__ = TripDetailPage;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c9754b6f._.js.map