module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Documents/Git-Projects/AtlasEgypt/helper/db-util.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InsertDocument",
    ()=>InsertDocument,
    "connectDatabase",
    ()=>connectDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/Documents/Git-Projects/AtlasEgypt/node_modules/mongodb)");
;
function connectDatabase() {
    const client = __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$mongodb$29$__["MongoClient"].connect("mongodb+srv://amrkhaledassal:AkA1292003@cluster0.bozkfl7.mongodb.net/AtlasEgypt?retryWrites=true&w=majority");
    return client;
}
async function InsertDocument(client, document, collection) {
    const db = client.db();
    const result = db.collection(collection).insertOne(document);
    return result;
}
}),
"[project]/Documents/Git-Projects/AtlasEgypt/helper/hash-Password.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$bcryptjs$29$__ = __turbopack_context__.i("[externals]/bcryptjs [external] (bcryptjs, esm_import, [project]/Documents/Git-Projects/AtlasEgypt/node_modules/bcryptjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$bcryptjs$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$bcryptjs$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function hashPassword(password) {
    const hashedPassword = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$bcryptjs$29$__["hash"])(password, 12);
    return hashedPassword;
}
async function verifyPassword(password, hashedPassword) {
    const isValid = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$bcryptjs$29$__["compare"])(password, hashedPassword);
    return isValid;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Documents/Git-Projects/AtlasEgypt/pages/api/auth/[...nextauth].js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth__$5b$external$5d$__$28$next$2d$auth$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2d$auth$29$__ = __turbopack_context__.i("[externals]/next-auth [external] (next-auth, cjs, [project]/Documents/Git-Projects/AtlasEgypt/node_modules/next-auth)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$providers$2f$credentials__$5b$external$5d$__$28$next$2d$auth$2f$providers$2f$credentials$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2d$auth$29$__ = __turbopack_context__.i("[externals]/next-auth/providers/credentials [external] (next-auth/providers/credentials, cjs, [project]/Documents/Git-Projects/AtlasEgypt/node_modules/next-auth)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$db$2d$util$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/helper/db-util.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$hash$2d$Password$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Git-Projects/AtlasEgypt/helper/hash-Password.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$hash$2d$Password$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$hash$2d$Password$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const authOptions = {
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only",
    session: {
        strategy: "jwt"
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$providers$2f$credentials__$5b$external$5d$__$28$next$2d$auth$2f$providers$2f$credentials$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2d$auth$29$__["default"])({
            async authorize (credentials) {
                const client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$db$2d$util$2e$js__$5b$api$5d$__$28$ecmascript$29$__["connectDatabase"])();
                const db = client.db();
                const userCollection = db.collection("users");
                const user = await userCollection.findOne({
                    email: credentials.email
                });
                if (!user) {
                    client.close();
                    throw new Error("No user found!");
                }
                // You can add password verification logic here
                const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$helper$2f$hash$2d$Password$2e$js__$5b$api$5d$__$28$ecmascript$29$__["verifyPassword"])(credentials.password, user.password);
                if (!isValid) {
                    client.close();
                    throw new Error("Could not log you in!");
                }
                client.close();
                return {
                    email: user.email
                };
            }
        })
    ]
};
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth__$5b$external$5d$__$28$next$2d$auth$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Git$2d$Projects$2f$AtlasEgypt$2f$node_modules$2f$next$2d$auth$29$__["default"])(authOptions);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__62cc2a91._.js.map