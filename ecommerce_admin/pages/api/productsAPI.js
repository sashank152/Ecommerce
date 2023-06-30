import { Product } from "@/models/ProductModel";
import { MongooseConnection } from "@/lib/mongooseConnection";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handleProducts(req,res){
    const {method} = req
    await MongooseConnection()
    await isAdminRequest(req,res);
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
        const {title,Description,price,images,category,productProperties}= req.body
        const productDocument = await Product.create({
            title,Description,price,images,category,properties:productProperties, 
        })
        res.json(productDocument);
    }

    if(method === 'PUT')
    {
        const {title,Description,price,images,productProperties,category,_id}= req.body
        await Product.updateOne({_id}, {title,Description,price,images,properties:productProperties,category});
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