import { MongooseConnection } from "@/lib/mongooseConnection";
import { Category } from "@/models/CategoryModel";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authConfig, isAdminRequest } from "./auth/[...nextauth]";

export default async function Handle(req,res){
    const {method} = req;
    await MongooseConnection();
    await isAdminRequest(req,res);
    
    if(method === 'POST')
    {
        const {name,parentCategory,properties} = req.body;
        const categoryDocument = await Category.create({name, parentCategory: parentCategory || undefined,properties});
        res.json(categoryDocument);
    }

    if(method === 'GET')
    {
        res.json(await Category.find().populate('parentCategory'));
    }

    if(method === 'PUT')
    {
        const {name,parentCategory,_id,properties} = req.body;
        res.json(await Category.updateOne({_id},{
            name,
            parentCategory: parentCategory || undefined,
            properties,
        }));
    }

    if(method === 'DELETE')
    {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('OK');
    }
}