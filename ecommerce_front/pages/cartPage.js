import Header from "@/Components/Header";
import styled from "styled-components";
import Center from "@/Components/Center";
import PrimaryBtn from "@/Components/PrimaryBtn";
import { CartContext } from "@/Components/CartContext";
import { useContext,useState,useEffect } from "react";
import axios from "axios";
import Table from "@/Components/Table";
import Input from "@/Components/Input";

const ColumnsWrapper = styled.div`
    display:grid;
    grid-template-columns:1.3fr 0.7fr;
    gap:40px;
    margin-top:40px;
`;

const Box = styled.div`
    background-color:#fff;
    border-radius:10px;
    padding:10px;
`;

const ProductInfoCell = styled.td`
    padding:10px 0;
`;

const ProductImageBox = styled.div`
    max-width:150px;
    max-height:150px;
    padding:10px;
    border-radius:10px;
    border:1px solid rgba(0,0,0,0.1);
    display:flex;
    align-items:center;
    justify-content:center;  
    img{
        max-width:130px;
        max-height:130px;
    }
`;

const QuantityLabel = styled.span`
    padding:0 3px;
`;

const CityHolder = styled.div`
    display:flex;
    gap:5px;
`;

export default function CartPage() {
    // if(window.location.href.includes('success'))
    // {
    //     return(
    //         <>
    //         <Header />
    //         <Center>
    //             <ColumnsWrapper>
    //             <Box>
    //                 <h1>Thanks for your order!</h1>
    //                 <p>
    //                     We will notify you of your order status via email.
    //                 </p>
    //             </Box>
    //             </ColumnsWrapper>
    //         </Center>
    //         </>
    //     )
    // }
    const {cartProducts,addProduct,removeProduct} = useContext(CartContext) 
    const [products,setProducts] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    useEffect(()=> {
        if(cartProducts.length > 0)
        {
            axios.post('/api/cart',{ids:cartProducts}).then(response => {
                setProducts(response.data);
            })
        }
        else
        {
            setProducts([]);
        }
    },[cartProducts])

    function addThisProduct(id)
    {
        addProduct(id);
    }

    function removeThisProduct(id)
    {
        removeProduct(id);
    }
    async function goToPayment()
    {
        const response = await axios.post('/api/checkout',{
            name,email,city,postalCode,streetAddress,country,
            cartProducts,
        })
        if(response.data.url)
        {
            window.location=response.data.url;
        }
    }

    let total = 0
    for(const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0;
        total = total + price;
    }
    
    return(
        <>
            <Header />
            <Center>
            <ColumnsWrapper>
                <Box>
                <h2>Cart</h2>
                    {!cartProducts.length && (
                        <div>Your cart is empty</div>
                    )}
                    {products?.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                    <tr key='product._id'>
                                        <ProductInfoCell>
                                            <ProductImageBox>
                                                <img src = {product.images[0]} alt="" />
                                            </ProductImageBox>
                                            {product.title}
                                        </ProductInfoCell>
                                        <td>
                                            <PrimaryBtn onClick={() => removeThisProduct(product._id)}>-</PrimaryBtn>
                                            <QuantityLabel>
                                                {cartProducts.filter(id => id === product._id).length}
                                            </QuantityLabel>
                                            <PrimaryBtn onClick = {() => addThisProduct(product._id)}>+</PrimaryBtn>
                                        </td>
                                        <td>S${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td><h3>Total Price:</h3></td>
                                    <td></td>
                                    <td>S${total}</td>
                                </tr>
                                
                        </tbody>
                    </Table>
                     )}
                </Box>
                
                {!!cartProducts.length && (
                    <Box>
                        <h2>Order Information</h2>
                        <Input type="text" placeholder="Name"  value = {name} name="name" onChange={
                            ev => setName(ev.target.value)}/>
                        <Input type="text" placeholder="Email" value = {email} name="email" onChange={
                            ev => setEmail(ev.target.value)}/>
                        <CityHolder>
                        <Input type="text" placeholder="City" value = {city} name="city" onChange={
                            ev => setCity(ev.target.value)}/>
                        <Input type="text" placeholder="Postal Code" value = {postalCode} name="postalCode" onChange={
                            ev => setPostalCode(ev.target.value)}/>
                        </CityHolder>
                        <Input type="text" placeholder="Street Address" value = {streetAddress} name="streetAddress" onChange={
                            ev => setStreetAddress(ev.target.value)}/>
                        <Input type="text" placeholder="Country" value = {country} name="country" onChange={
                            ev => setCountry(ev.target.value)}/>
                        <PrimaryBtn onClick={goToPayment}>Continue to Payment</PrimaryBtn>
                </Box>
                )}
                
            </ColumnsWrapper>  
            </Center>
        </>
    )
}