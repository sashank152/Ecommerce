import {model, Schema ,models} from "mongoose"

const ProductSchema = new Schema({
    title: {type:String, required:true},
    Description : {type:String, required:false},
    price : {type: Number, required: true},
}, { minimize: false })

export const Product =models.Product || model('Product', ProductSchema)