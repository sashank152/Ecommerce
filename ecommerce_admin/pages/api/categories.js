import { MongooseConnection } from "@/lib/mongooseConnection";
import { Category } from "@/models/CategoryModel";
import mongoose from "mongoose";

export default async function Handle(req,res){
    const {method} = req;
    await MongooseConnection();

    if(method === 'POST')
    {
        const {name,parentCategory} = req.body;
        const categoryDocument = await Category.create({name,parentCategory});
        res.json(categoryDocument);
    }

    if(method === 'GET')
    {
        res.json(await Category.find().populate('parentCategory'));
    }

    if(method === 'PUT')
    {
        const {name,parentCategory,_id} = req.body;
        res.json(await Category.updateOne({_id},{
            name,
            parentCategory
        }));
    }

    if(method === 'DELETE')
    {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('OK');
    }
}