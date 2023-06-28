import Layout from "@/Components/layout"
import axios from "axios"
import { useEffect, useState } from "react"
import React from "react";
import { withSwal } from "react-sweetalert2";

function Categories({swal}){
    const [editedCategory,setEditedCategory] = useState(null);
    const [name,setName]=useState('')
    const [categories,setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    function getCategories()
    {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }
    async function saveCategory(ev)
    {
        ev.preventDefault();
        if(editedCategory)
        {
            await axios.put('/api/categories',{name,parentCategory,_id:editedCategory._id});
            setEditedCategory(null);
        }
        else
        {
            await axios.post('/api/categories',{name,parentCategory}); 
        }
        setName('');
        getCategories();
    }
    function editCategory(category)
    {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parentCategory?._id);
    }

    function deleteCategory(category){
        swal.fire({
            title: `Delete ${category.name}`,
            text: `Are you sure you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText : 'No, Go Back',
            confirmButtonText: 'Yes, proceed',
            confirmButtonColor: '#991b1b',
            cancelButtonColor: '#4B5563'
        }).then(async result => {
            if(result.isConfirmed)
            {
                const _id=category._id;
                await axios.delete('/api/categories?_id='+_id , _id);
                getCategories();
            }
        });
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory? `Edit the category ${editedCategory.name}` : 'Enter new Category Name' }</label>
            <form onSubmit={saveCategory} className="flex gap-2">
                <input type="text" className="mb-0" placeholder={'Category Name'} 
                onChange={ev => setName(ev.target.value)}
                value={name}/>
                <select className="mb-0" 
                onChange={ev=> setParentCategory(ev.target.value)} 
                value={parentCategory}>
                    <option value = ''>No Parent Category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button type='submit' className="btn-primary">Save</button>
            </form>
            <table className="TableStyle mt-4">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td>Edit/Delete Category</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                            <td>{category?.parentCategory?.name}</td>
                            <td>
                                <div className="flex gap-1">
                                <button 
                                onClick={() => editCategory(category)} 
                                className="btn-primary ">
                                    Edit
                                </button>
                                <button 
                                onClick={()=> deleteCategory(category)}
                                className="btn-primary">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default withSwal(({swal},ref) => (
    <Categories swal ={swal} />
));