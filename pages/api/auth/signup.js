import { connectDatabase, InsertDocument } from "@/helper/db-util";
import { hashPassword } from "@/helper/hash-Password";

async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    if (
      !name ||
      name.trim() === "" ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res
        .status(422)
        .json({ message: "Invalid input - please check your data." });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }
    
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
        res.status(422).json({ message: "User already exists!" });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    

    try {
      client = await InsertDocument(client, newUser, "users");
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Adding user failed!" });
      return;
    }

    res.status(201).json({ message: "User Created successfully!" });
    client.close();
  }
}

export default handler;
