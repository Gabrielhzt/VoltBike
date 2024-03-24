import React, { useEffect, useState } from "react";
import axios from "axios";
import './order.css';

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:46381/cart/validated', {
                headers: {
                  Authorization: token
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.log('Error fetching orders:', error);
        }
    };

    console.log(orders)

    return (
        <div>
        <p className="description-info">On this page, find a summary of all your past orders, including details such as the order number, and total amount of each purchase. It's a convenient way to keep track of your previous purchases and reorder if needed.</p>
        {orders.map((order, index) => (
        <div key={order.cart_id}>
            <div className="first">
                <h2>Commande {index + 1}</h2>
                <p>Total Amount: {order.total_amount}</p>
            </div>
            {order.products.map((product, productIndex) => (
                <div className="product-cart" key={productIndex}>
                    <div className="separation">
                        <img className="cart-img" src={`${product.image_1}`} alt="product"/>
                        <div>
                            <h2>{product.name}</h2>
                            <p>${product.price}</p>
                        </div>
                    </div>
                    <p>Quantity: {product.quantity}</p>
                </div>
            ))}
        </div>
        ))}
</div>

    );
}

export default Order;
