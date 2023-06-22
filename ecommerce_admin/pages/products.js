import Layout from "@/Components/layout";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";

export default function Products()
{
    useEffect(() => {
        axios.get('/api/productsAPI').then(response => {
            console.log(response.data)
        });
    })
    return <Layout>
        <Link className="bg-blue-600 text-white rounded-md py-1 px-2" href={'/products/AddNewProduct'}>
            Add New Product
        </Link>
    </Layout>
}