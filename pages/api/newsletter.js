import { connectDatabase, InsertDocument } from "../../helper/db-util";

async function handler(req,res){
    const enteredEmail = req.body.email;
    if(!enteredEmail || !enteredEmail.includes('@')){
        res.status(422).json({message: "Invalid email address."})
        return;
    }

    if(req.method === "POST"){
      let client;
      try{
        client = await connectDatabase();
      }catch(error){
        res.status(500).json({message: "Could not connect to database."});
        return;
      }
        try{
            await InsertDocument(client, {email: enteredEmail}, "newsletterEmails");
            res.status(201).json({message: "Signed up successfully!"});
            client.close();
        }catch(error){
            res.status(500).json({message: "Inserting data failed!"});
            return;
        }
        res.status(201).json({message: "singed up successfully!", email: enteredEmail});
    }
}

export default handler;