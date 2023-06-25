import Layout from "@/Components/layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProducts()
{
    const router = useRouter();
    const {id} = router.query;
    const [productInfo,setProductInfo] = useState();

    useEffect(() => {
        if(!id)
        {
            return;
        }
        else
        {
            axios.get('/api/productsAPI?id='+id).then(response => {
                setProductInfo(response.data)
            })
        }
    },[id]);


    function goBack()
    {
        router.push('/products')
    }

    async function deleteProduct()
    {
        await axios.delete('/api/productsAPI?id='+id);
        goBack();
    }

    return(
        <Layout>
            <h1 className="text-center">Do you really want to delete product:<b>"{productInfo?.title}"</b></h1>
            <div className="flex gap-2 justify-center">
                <button onClick={deleteProduct} className="btn-red">Yes</button>
                <button onClick={goBack} className="btn-default">No</button>
            </div>
        </Layout>
    )
}