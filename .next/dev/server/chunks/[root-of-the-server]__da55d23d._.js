module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/helper/db-util.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InsertDocument",
    ()=>InsertDocument,
    "connectDatabase",
    ()=>connectDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/node_modules/mongodb)");
;
function connectDatabase() {
    const client = __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__["MongoClient"].connect("mongodb+srv://amrkhaledassal:AkA1292003@cluster0.bozkfl7.mongodb.net/AtlasEgypt?retryWrites=true&w=majority");
    return client;
}
async function InsertDocument(client, document, collection) {
    const db = client.db();
    const result = db.collection(collection).insertOne(document);
    return result;
}
}),
"[project]/helper/hash-Password.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__ = __turbopack_context__.i("[externals]/bcryptjs [external] (bcryptjs, esm_import, [project]/node_modules/bcryptjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function hashPassword(password) {
    const hashedPassword = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__["hash"])(password, 12);
    return hashedPassword;
}
async function verifyPassword(password, hashedPassword) {
    const isValid = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$bcryptjs__$5b$external$5d$__$28$bcryptjs$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$bcryptjs$29$__["compare"])(password, hashedPassword);
    return isValid;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/api/auth/signup.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$db$2d$util$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/helper/db-util.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$hash$2d$Password$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/helper/hash-Password.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$hash$2d$Password$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$hash$2d$Password$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, password } = req.body;
        if (!name || name.trim() === "" || !email || !email.includes("@") || !password || password.trim().length < 7) {
            res.status(422).json({
                message: "Invalid input - please check your data."
            });
            return;
        }
        let client;
        try {
            client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$db$2d$util$2e$js__$5b$api$5d$__$28$ecmascript$29$__["connectDatabase"])();
        } catch (error) {
            res.status(500).json({
                message: "Could not connect to database."
            });
            return;
        }
        const db = client.db();
        const existingUser = await db.collection("users").findOne({
            email: email
        });
        if (existingUser) {
            res.status(422).json({
                message: "User already exists!"
            });
            client.close();
            return;
        }
        const hashedPassword = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$hash$2d$Password$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hashPassword"])(password);
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        };
        try {
            client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$db$2d$util$2e$js__$5b$api$5d$__$28$ecmascript$29$__["InsertDocument"])(client, newUser, "users");
        } catch (error) {
            client.close();
            res.status(500).json({
                message: "Adding user failed!"
            });
            return;
        }
        res.status(201).json({
            message: "User Created successfully!"
        });
        client.close();
    }
}
const __TURBOPACK__default__export__ = handler;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__da55d23d._.js.map