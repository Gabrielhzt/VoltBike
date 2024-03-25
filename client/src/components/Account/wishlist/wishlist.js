import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './wishlist.css'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        getWishlist();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    };

    const getWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:46381/wishlist/', {
                headers: {
                  Authorization: token
                }
            });
            setWishlist(response.data);

            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <p className="description-info">The wishlist page allows users to view and manage saved products. Users can add or remove items from their wishlist, which typically includes product name, image, description, and price. It offers a convenient way to track and organize products of interest.</p>
            <div className="wish-flex">
                {wishlist.map((product, index) => (
                <div key={index}>
                    <div className='products-cart' style={{ backgroundImage: `url(${product.image_url})` }}>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <Link to={`/product/${product.product_id}`} onClick={scrollToTop}><button>Buy it</button></Link>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
