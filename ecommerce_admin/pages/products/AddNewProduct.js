import Layout from "@/Components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddNewProduct()
{
    const [title,setTitle] = useState('');
    const [Description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [goToProducts,setGoToProducts] = useState(false)
    
    const router = useRouter();

    async function createProduct(ev){
        ev.preventDefault();
        const data = {title,Description,price}
        await axios.post('/api/productsAPI',data);
        setGoToProducts(true);
    }
    if(goToProducts)
    {
        router.push('/products');
    }
    return <Layout>
        <form onSubmit={createProduct}>   
            <h1>Add a new Product</h1>
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
    </Layout>
}   