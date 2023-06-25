import Layout from "@/Components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
    title:existingTitle,
    Description:existingDescription,
    price:existingPrice
    })
{
    const [title,setTitle] = useState(existingTitle || '');
    const [Description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');
    const [goToProducts,setGoToProducts] = useState(false)
    
    const router = useRouter();

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title,Description,price}
        if(_id)
        {
            //update
            await axios.put('/api/productsAPI',{...data,_id})
            
        }
        else{
            //create
            await axios.post('/api/productsAPI',data);        }
        setGoToProducts(true);
    }
    if(goToProducts)
    {
        router.push('/products');
    }
    return (
        <form onSubmit={saveProduct}>   
            <label>Product Name</label>
            <input type= "text" 
            placeholder="Enter Product Name" 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}
            />
            <label>Product Description</label>
            <textarea placeholder="Enter Product Description" 
            value={Description} 
            onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Product Price (SGD)</label>
            <input type="number" placeholder="Enter the Product Price" 
            value={price} 
            onChange={ev => setPrice(ev.target.value)}/>
            <button className="btn-primary" type="submit">
                Save
            </button>
        </form>
    )
}