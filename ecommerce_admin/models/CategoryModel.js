import mongoose, { model, Schema ,models, mongo } from "mongoose"

const CategorySchema = new Schema({
    name:{type:String , required : true},
    parentCategory: {type:mongoose.Types.ObjectId, ref:'Category'},
});

export const Category = models.Category || model('Category', CategorySchema);