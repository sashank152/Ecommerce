import mongoose, {model, Schema ,models} from "mongoose"

const ProductSchema = new Schema({
    title: {type:String, required:true},
    Description : {type:String, required:false},
    price : {type: Number, required: true},
    images: [{type:String}],
    category: {type: mongoose.Types.ObjectId, ref:'Category'}
}, { minimize: false })

export const Product =models.Product || model('Product', ProductSchema)