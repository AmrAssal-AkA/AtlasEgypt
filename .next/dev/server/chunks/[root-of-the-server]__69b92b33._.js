module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/newsletter.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/node_modules/mongodb)");
;
function connectDatabase() {
    const client = __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__["MongoClient"].connect("mongodb+srv://amrkhaledassal:AkA1292003@cluster0.bozkfl7.mongodb.net/AtlasEgypt?retryWrites=true&w=majority");
    return client;
}
function InsertDocument(client, document) {
    const db = client.db();
    const newsletterCollection = db.collection("newsletterEmails");
    return newsletterCollection.insertOne(document);
}
async function handler(req, res) {
    const enteredEmail = req.body.email;
    if (!enteredEmail || !enteredEmail.includes('@')) {
        res.status(422).json({
            message: "Invalid email address."
        });
        return;
    }
    if (req.method === "POST") {
        let client;
        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({
                message: "Could not connect to database."
            });
        }
        try {
            await InsertDocument(client, {
                email: enteredEmail
            });
            res.status(201).json({
                message: "Signed up successfully!"
            });
            client.close();
        } catch (error) {
            res.status(500).json({
                message: "Inserting data failed!"
            });
            return;
        }
        res.status(201).json({
            message: "singed up successfully!",
            email: enteredEmail
        });
    }
}
const __TURBOPACK__default__export__ = handler;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__69b92b33._.js.map