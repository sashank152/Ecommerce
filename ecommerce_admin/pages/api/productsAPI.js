import { Product } from "@/models/ProductModel";
import { MongooseConnection } from "@/lib/mongooseConnection";

export default async function handleProducts(req,res){
    const {method} = req
    await MongooseConnection()

    if(method === 'GET')
    {
        res.json(await Product.find());
    }

    if(method === 'POST')
    {
        const {title,description,price}= req.body
        const productDocument = await Product.create({
            title,description,price, 
        })
        res.json(productDocument);
    }
}