import ProductForm from "@/Components/ProductForm";
import Layout from "@/Components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddNewProduct()
{
    return (
    <Layout>
        <h1>New Product</h1>
        <ProductForm />
    </Layout>
    )
}   