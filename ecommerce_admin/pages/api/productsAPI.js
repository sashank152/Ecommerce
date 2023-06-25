import { Product } from "@/models/ProductModel";
import { MongooseConnection } from "@/lib/mongooseConnection";

export default async function handleProducts(req,res){
    const {method} = req
    await MongooseConnection()

    if(method === 'GET')
    {
        if(req.query?.id)
        {
            res.json(await Product.findOne({_id:req.query.id}));
        }
        else
        {
            res.json(await Product.find());
        }
    }

    if(method === 'POST')
    {
        const {title,Description,price}= req.body
        const productDocument = await Product.create({
            title,Description,price, 
        })
        res.json(productDocument);
    }

    if(method === 'PUT')
    {
        const {title,Description,price,_id}= req.body
        await Product.updateOne({_id}, {title,Description,price});
        res.json(true);
    }

    if(method === 'DELETE')
    {
        if(req.query?.id)
        {
            await Product.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}