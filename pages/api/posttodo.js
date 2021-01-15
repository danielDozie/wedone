import { connectToDatabase } from "../../util/mongodb";


export default async (req, res) => {
  const {db} = await connectToDatabase();
  const content = req.body.content;
  
  const date = new Date().toString()

	try {
    const response = await db.collection("wedone").insertOne({content: content, date_added: date})
    
    if (response.status === 200) {
      res.statusCode = 200
      res.end()
    } else {
      res.statusCode = 400
      res.end()
    }
  } catch { }
}

