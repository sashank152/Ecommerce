import Layout from "@/Components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title:existingTitle,
    Description:existingDescription,
    price:existingPrice,
    images:existingImages,
    category:existingCategory
    })
{
    const [title,setTitle] = useState(existingTitle || '');
    const [Description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');
    const [category, setCategory] = useState(existingCategory || null);
    const [goToProducts,setGoToProducts] = useState(false);
    const [images,setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const [categories,setCategories] = useState([]);
    
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }
    ,[])

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title,Description,price,images,category}
        if(_id)
        {
            //update
            await axios.put('/api/productsAPI',{...data,_id})
            
        }
        else{
            //create
            await axios.post('/api/productsAPI',data);       
        }
        setGoToProducts(true);
    }
    if(goToProducts)
    {
        router.push('/products');
    }

    async function uploadImages(ev)
    {
        const files = ev.target?.files;
        if(files?.length > 0)
        {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files)
            {
                data.append('file',file);
            }
            const response = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...response.data.links];
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images)
    {
        setImages(images);
    }

    return (
        <form onSubmit={saveProduct}>   
            <label>Product Name</label>
            <input type= "text" 
            placeholder="Enter Product Name" 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}/>

            <label>Select Category</label>
            <select value={category}
            onChange={ev=>setCategory(ev.target.value)}>
                <option value={""}>Uncategorised</option>   
                {categories.length > 0 && categories.map(c => (
                    <option value={c._id}>{c.name}</option>
                ))}
            </select>

            <label>
                Add Image

            </label>
            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable className="flex flex-wrap gap-2" 
                list={images} setList={updateImagesOrder}>
                {!!images?.length && images.map(link => (
                    <div key = {link} className="h-24">
                        <img src={link} alt="" className="rounded-lg"/>
                    </div>
                ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 bg-gray-200 p-1 flex items-center rounded-lg">
                        <Spinner />
                    </div>
                )}
                <label className="inline-block w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 rounded-lg text-black-900 bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <div>                    
                    Upload Images
                </div>
                <input type = "file" onChange={uploadImages} className="hidden"/>
                </label>
                {/* {!images?.length && (
                    <div>No Photos in this product</div>
                )} */}
            </div>

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