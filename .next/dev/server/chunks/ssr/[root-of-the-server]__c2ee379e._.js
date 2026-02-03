module.exports = [
"[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__ = __turbopack_context__.i("[externals]/react-toastify [external] (react-toastify, esm_import, [project]/Documents/Git-Projects/AtlasEgypt/node_modules/react-toastify)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function RegisterForm() {
    const nameInputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    const emailInputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    const passwordInputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    const confirmPasswordInputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    async function handleSubmit(event) {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;
        if (!enteredName || !enteredEmail || !enteredEmail.includes("@") || !enteredPassword || enteredPassword.trim().length < 7 || enteredPassword !== enteredConfirmPassword) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error("Please enter valid data");
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
        }).then((res)=>{
            if (res.ok) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__["toast"].success("User registered successfully");
            } else {
                return res.json().then((data)=>{
                    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error(data.message || "Something went wrong!");
                });
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
        className: "space-y-6",
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "FullName",
                        className: "block text-sm font-medium text-gray-700 mb-2",
                        children: "Full Name"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "text",
                        name: "FullName",
                        placeholder: "Enter your Name here",
                        required: true,
                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                        ref: nameInputRef
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "email address",
                        className: "block text-sm font-medium text-gray-700 mb-2",
                        children: "Email address"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "email",
                        name: "email",
                        placeholder: "Enter your email address",
                        required: true,
                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                        ref: emailInputRef
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "password",
                        className: "block text-sm font-medium text-gray-700 mb-2",
                        children: "Password"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "password",
                        name: "password",
                        placeholder: "Enter your password",
                        required: true,
                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                        ref: passwordInputRef
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "confirm password",
                        className: "block text-sm font-medium text-gray-700 mb-2",
                        children: "Confirm Password"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "password",
                        name: "confirm password",
                        placeholder: "Re-enter your password",
                        required: true,
                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                        ref: confirmPasswordInputRef
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    "Already have an account?",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/login",
                        className: "underline hover:text-amber-500",
                        children: "Back to login page"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-right",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-800 cursor-pointer",
                    children: "Register"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
                lineNumber: 128,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = RegisterForm;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$Register$2d$form$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/Register-form.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/image.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$Register$2d$form$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$Register$2d$form$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function RegisterPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "AtlasEgypt - Register"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                        lineNumber: 10,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Create your AtlasEgypt account to start planning your dream trips, manage bookings, and access exclusive travel deals."
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                        lineNumber: 11,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "robots",
                        content: "noindex, nofollow"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                        lineNumber: 12,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                lineNumber: 9,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl w-full bg-white rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "relative h-64 md:h-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/BlogPageBanner.jpg",
                                alt: "Register Banner",
                                fill: true,
                                className: "object-cover"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                            lineNumber: 16,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "p-8 md:p-12 flex flex-col justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-center mb-2",
                                    children: "Create Your Account"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                                    lineNumber: 25,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-1 bg-amber-500 mx-auto mb-8"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                                    lineNumber: 28,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$Register$2d$form$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                                    lineNumber: 29,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                            lineNumber: 24,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                    lineNumber: 15,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/Register.js",
                lineNumber: 14,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c2ee379e._.js.map