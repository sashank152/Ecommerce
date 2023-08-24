import { MongooseConnection } from "@/lib/mongooseConnection";
import { Order } from "@/models/Order";

export default async function handle(req,res){
    await MongooseConnection();
    res.json(await Order.find().sort({createdAt: -1}));
}