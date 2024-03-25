import React, { useState, useEffect } from 'react';
import Navbar from '../nav/navbar';
import Footer from '../footer/footer';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:46381/cart', {
                    headers: {
                        Authorization: token
                    }
                });
                setCart(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();

    }, []);

    const calculateTotal = () => {
      return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const updateTotalAmount = async () => {
      try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:46381/cart/total', {
              cartId: cart[0].cart_id, // Supposons que le cart_id est le même pour tous les produits dans le panier
              totalAmount: calculateTotal()
          }, {
              headers: {
                  Authorization: token
              }
          });
      } catch (error) {
          console.log(error);
      }
    };

    const handleDelete = async (cartItemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('http://localhost:46381/cart/remove', {
                data: { cartItemId },
                headers: {
                    Authorization: token
                }
            });
            setCart(cart.filter(item => item.cart_item_id !== cartItemId)); // Mise à jour du panier en enlevant l'article supprimé
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:46381/cart/quantity', {
                cartItemId,
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: token
                }
            });
            setCart(cart.map(item => {
                if (item.cart_item_id === cartItemId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      // Mettre à jour le montant total du panier à chaque modification du panier
      updateTotalAmount();
    }, [cart]);

    return (
        <div>
            <Navbar />
            <h1 className='center'>Your Cart</h1>
            <div className='cart'>
                {cart.map((product) => (
                    <div className='all-cart' key={product.cart_item_id}>
                        <div className='flex-cart'>
                            <img src={product.image_1} alt='product' className='img-cart'/>
                            <div className='info-cart'>
                                <h2>{product.name}</h2>
                                <p>${product.price}</p>
                                <button onClick={() => handleDelete(product.cart_item_id)}>Remove</button>
                            </div>
                        </div>
                        <div className='column'>
                            <FontAwesomeIcon icon={faChevronUp} onClick={() => handleQuantityChange(product.cart_item_id, product.quantity + 1)} />
                            {product.quantity}
                            <FontAwesomeIcon icon={faChevronDown} onClick={() => handleQuantityChange(product.cart_item_id, Math.max(product.quantity - 1, 1))} />
                        </div>
                    </div>
                ))}
            </div>
            <div className='total'>
              <h2>Total</h2>
              <p>${calculateTotal()}</p>
            </div>
            <div className='center-btn'>
                <button>Validate the order</button>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;