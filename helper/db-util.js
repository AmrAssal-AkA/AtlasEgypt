import { MongoClient } from "mongodb";

export function connectDatabase() {
  const client = MongoClient.connect(
    "mongodb+srv://amrkhaledassal:AkA1292003@cluster0.bozkfl7.mongodb.net/AtlasEgypt?retryWrites=true&w=majority",
  );
  return client;
}

export async function InsertDocument(client, document, collection) {
  const db = client.db();
  const result = db.collection(collection).insertOne(document);
  return result;
}
