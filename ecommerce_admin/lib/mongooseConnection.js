import mongoose, { mongo } from "mongoose";

export function MongooseConnection()
{
    const URI = process.env.MONGODB_URI;
    if(mongoose.connection.readyState ==1)
    {
        return mongoose.connection.asPromise;
    }
    else{
        return mongoose.connect(URI);
    }
}