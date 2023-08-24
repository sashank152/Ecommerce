import { MongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/ProductModel";
import { Order } from "@/models/Order";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req,res){
    if(req.method !== 'POST')
    {
        res.json('Should Be A POST Request');
        return;
    }
    const {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
    } = req.body;
    await MongooseConnection();
    const productIds = cartProducts;
    const uniqueIds = [...new Set(productIds)];
    const productsInfo = await Product.find({_id:uniqueIds});

    let line_items = [];
    for(const productId of uniqueIds)
    {
        const productInfo = productsInfo.find(p => p._id.toString() === productId);
        const quantity = productIds.filter(id => id === productId)?.length || 0;
        if(quantity > 0 && productInfo)
        {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'SGD',
                    product_data: {name:productInfo.title},
                    unit_amount: productInfo.price*100,
                },
            });
        }   
    }
    const OrderDoc = await Order.create({
        line_items,name,email,city,postalCode,streetAddress,country,paid:false
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:'payment',
        customer_email:email,
        success_url:process.env.REDIRECT_URL + '/cartPage?success=1',
        cancel_url:process.env.REDIRECT_URL + '/cartPage?canceled=1',
        metadata:{orderId:OrderDoc._id.toString()},
    });

    res.json({
        url:session.url,
    })
}