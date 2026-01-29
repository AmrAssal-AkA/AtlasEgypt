import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDatabase } from "@/helper/db-util";
import { verifyPassword } from "@/helper/hash-Password";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(Credentials) {
        const client = await connectDatabase();
        const db = client.db();

        const userCollection = db.collection("users");
        const user = await userCollection.findOne({ email: Credentials.email });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        // You can add password verification logic here

        const isValid = await verifyPassword(
          Credentials.password,
          user.password,
        );
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
