import { connectToDatabase } from "../../util/mongodb";


export default async (req, res) => {
  const {db} = await connectToDatabase();
  const id = req.body.id;
	try {
    const response = await db.collection("wedone").deleteOne({_id: new mongo.ObjectId(id)})
    if (response.status === 200) {
      res.statusCode = 200
      res.end()
    } else {
      res.statusCode = 400
      res.end()
    }
  } catch { }
}

