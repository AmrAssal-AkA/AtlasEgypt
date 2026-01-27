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
"[project]/pages/api/contactus.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$db$2d$util$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/helper/db-util.js [api] (ecmascript)");
;
async function handler(req, res) {
    const { name, email, message } = req.body;
    if (req.method === 'POST') {
        if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            return res.status(422).json({
                message: 'Invalid input.'
            });
        }
        const newMessage = {
            email,
            name,
            message
        };
        let client;
        try {
            client = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$db$2d$util$2e$js__$5b$api$5d$__$28$ecmascript$29$__["connectDatabase"])();
        } catch (error) {
            res.status(500).json({
                message: 'Connecting to the database failed!'
            });
            return;
        }
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$helper$2f$db$2d$util$2e$js__$5b$api$5d$__$28$ecmascript$29$__["InsertDocument"])(client, newMessage, 'messages');
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close;
            res.status(500).json({
                message: 'Inserting message failed!'
            });
            return;
        }
        res.status(201).json({
            message: 'Successfully stored message!',
            message: newMessage
        });
    }
}
const __TURBOPACK__default__export__ = handler;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__82072ec0._.js.map