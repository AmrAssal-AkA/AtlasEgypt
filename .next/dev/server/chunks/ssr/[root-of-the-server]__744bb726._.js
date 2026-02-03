module.exports = [
"[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ForgetPasswordForm
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__ = __turbopack_context__.i("[externals]/react-toastify [external] (react-toastify, esm_import, [project]/Documents/Git-Projects/AtlasEgypt/node_modules/react-toastify)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function ForgetPasswordForm() {
    const oldPasswordRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    const newPasswordRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    async function handleSumbit(e) {
        e.preventDefault();
        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        if (!oldPassword || !newPassword || newPassword.trim().length < 7) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error("Please check your input. New passwords must be at least 7 characters long.");
            return;
        }
        const response = await fetch("/api/user/change-password", {
            method: "PATCH",
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__["toast"].error(data.message || "Something went wrong!");
        } else {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$react$2d$toastify$29$__["toast"].success("Password updated successfully!");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
        className: "space-y-6",
        onSubmit: handleSumbit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "oldPassword",
                        className: "block text-sm font-medium text-gray-700",
                        children: "Old Password"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "password",
                        name: "oldPassword",
                        id: "oldPassword",
                        required: true,
                        placeholder: "enter old password here",
                        className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm",
                        ref: oldPasswordRef
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "newPassword",
                        className: "block text-sm font-medium text-gray-700",
                        children: "New Password"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: "password",
                        name: "newPassword",
                        id: "newPassword",
                        required: true,
                        placeholder: "enter new password here",
                        className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm",
                        ref: newPasswordRef
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 cursor-pointer",
                    children: "Change Password"
                }, void 0, false, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ForgetPassword,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$forget$2d$password$2d$form$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/components/Authentication/forget-password-form.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2d$auth$29$__ = __turbopack_context__.i("[externals]/next-auth/react [external] (next-auth/react, cjs, [project]/Documents/Git-Projects/AtlasEgypt/node_modules/next-auth)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$forget$2d$password$2d$form$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$forget$2d$password$2d$form$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function ForgetPassword() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "AtlasEgypt - Change Password"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Change your AtlasEgypt account password."
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "robots",
                        content: "noindex, nofollow"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "relative h-60 md:h-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/AtlasEgypt.jpg",
                                alt: "Login Banner",
                                fill: true,
                                className: "object-cover"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "p-8 md:p-12 flex flex-col justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold text-center mb-2",
                                    children: "Change Password"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-1 bg-amber-500 mx-auto mb-8"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$components$2f$Authentication$2f$forget$2d$password$2d$form$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Git-Projects/AtlasEgypt/pages/login/forget-password.js",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
async function getServerSideProps(context) {
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2d$auth$29$__["getSession"])({
        req: context.req
    });
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        };
    }
    return {
        props: {
            session
        }
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__744bb726._.js.map