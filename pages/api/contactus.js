import { connectDatabase , InsertDocument} from "@/helper/db-util";

async function handler(req, res){
    const {name, email, message} = req.body;

    if(req.method === 'POST'){

        if(!email || !email.includes('@') || !name || name.trim() ==='' || !message || message.trim()=== ''){
            return (
                res.status(422).json({message: 'Invalid input.'})
            )
        }

        const newMessage = {
            email,
            name,
            message,
        };

        let client;
        try{
            client = await connectDatabase();
        }catch(error){
            res.status(500).json({message: 'Connecting to the database failed!'});
            return;
        }

        try{
            const result = await InsertDocument(client, newMessage, 'messages');
            newMessage.id = result.insertedId;
        }catch(error){
            client.close;
            res.status(500).json({message: 'Inserting message failed!'});
            return;
        }

        res.status(201).json({message: 'Successfully stored message!', message: newMessage});
    }

}


export default handler;