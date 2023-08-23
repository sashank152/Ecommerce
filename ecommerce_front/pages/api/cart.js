import { MongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/ProductModel";

export default async function handle(req,res){
    await MongooseConnection();
    const ids=req.body.ids;
    res.json(await Product.find({_id:ids}));
}