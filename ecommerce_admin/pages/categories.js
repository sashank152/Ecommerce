import Layout from "@/Components/layout"
import axios from "axios"
import { useEffect, useState } from "react"
import React from "react";
import { withSwal } from "react-sweetalert2";

function Categories({swal}){
    const [editedCategory,setEditedCategory] = useState('');
    const [name,setName]=useState('')
    const [categories,setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties,setProperties] = useState([]);

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
        const data = {
            name,
            parentCategory,
            properties:properties.map(p => ({name:p.name,values:p.values.split(','),}))
        }
        if(editedCategory)
        {
            data._id = editedCategory._id;
            await axios.put('/api/categories',data);
            setEditedCategory(null);
        }
        else
        {
            await axios.post('/api/categories',data); 
        }
        setName('');
        setParentCategory('');
        setProperties([]);
        getCategories();
    }
    function editCategory(category)
    {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parentCategory?._id);
        setProperties(category.properties.map(({name,values}) => (
            {
                name,
                values:values.join(',')
            }
        )));
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

    function addProperty()
    {
        setProperties(prev=> {
            return [...prev,{name:'',values:''}]
        })
    }

    function updatePropertyName(property,newName,index)
    {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties
        });
    }

    function updatePropertyValues(index,property,newValues)
    {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties
        });
    }
    function removeProperty(index)
    {
        setProperties(prev => {
            return [...prev].filter((p,propertyIndex) => {
                return propertyIndex !== index;
            });
        });
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory? `Edit the category ${editedCategory.name}` : 'Enter new Category Name' }</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-2">
                    <input type="text" placeholder={'Category Name'} 
                    onChange={ev => setName(ev.target.value)}
                    value={name}/>
                    <select 
                    onChange={ev=> setParentCategory(ev.target.value)} 
                    value={parentCategory}>
                        <option value = ''>No Parent Category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button 
                    className="btn-default text-sm mb-2" 
                    type="button"
                    onClick={addProperty}>Add new Property</button>
                    {properties.length > 0 && properties.map((property,index) => (
                        <div className="flex gap-1  mb-2"> 
                            <input type="text" className="mb-0"
                            onChange={ev => updatePropertyName(property,ev.target.value,index)} 
                            value={property.name}
                            placeholder="Enter Property Name(ex: Colour)"/>
                            <input type="text" className="mb-0"
                            onChange={ev => updatePropertyValues(index,property,ev.target.value)}
                            value={property.values} 
                            placeholder="Enter Value(ex: Rose Gold)"/>
                            <button className="btn-default"
                            onClick={() => removeProperty(index)}
                            type="button">Remove</button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                <button type='submit' className="btn-primary">Save</button>
                {editedCategory && (
                    <button type='button' 
                    onClick=
                    {() =>{setEditedCategory(null);
                    setName('');
                    setParentCategory('');
                    setProperties([]);
                }}
                    
                    className="btn-default">Cancel</button>
                )}
                </div>
            </form>
            {!editedCategory && (
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
            )}
            
        </Layout>
    )
}

export default withSwal(({swal},ref) => (
    <Categories swal ={swal} />
));