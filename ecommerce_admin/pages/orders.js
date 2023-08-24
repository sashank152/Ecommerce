import Layout from "@/Components/layout";
import {useEffect,useState} from 'react';
import axios from "axios";

export default function OrdersPage()
{
    const [order,setOrder] = useState([]);
    useEffect(() => {
        axios.get('/api/orders').then(response => {
            setOrder(response.data)
        });
    },[]);
    return( 
    <Layout>
        <h1>Orders</h1>
        <table className = "TableStyle mt-4" >
            <thead>
                <tr>
                <td>ID</td>
                <td>Recipient</td>
                <td>Products Ordered</td>
                </tr>
            </thead>
            <tbody>
                {order.length > 0 && order.map(currentOrder => {
                    <tr>
                        <td>{currentOrder._id}</td>
                        <td>{currentOrder.name},{currentOrder.email},<br />
                        {currentOrder.city}, {currentOrder.postalCode}, <br />
                        {currentOrder.streetAddress}, {currentOrder.country}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </Layout>
    );
}