import { connectDatabase } from "@/helper/db-util";
import { hashPassword, verifyPassword } from "@/helper/hash-Password";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (!oldPassword || !newPassword || newPassword.trim().length < 7) {
    res.status(422).json({
      message: "Invalid input - password should be at least 7 characters long.",
    });
    return;
  }

  const userEmail = session.user.email;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  let userCollection;
  let user;

  try {
    userCollection = client.db().collection("users");
    user = await userCollection.findOne({ email: userEmail });
  } catch (error) {
    res.status(500).json({ message: "Finding user failed!" });
    client.close();
    return;
  }
  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid old password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } },
  );
  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;
