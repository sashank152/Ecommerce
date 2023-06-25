import Layout from "@/Components/layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/Components/ProductForm";

export default function EditProductPage() 
{
    const [productInfo,setProductInfo] = useState(null);
    const router=useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id)
            return;
        axios.get('/api/productsAPI?id='+id).then(response => 
            {
                setProductInfo(response.data)
            });
    })
    return(
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    )
}