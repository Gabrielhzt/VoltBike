import React, { useState, useEffect } from 'react';
import Navbar from '../nav/navbar';
import Footer from '../footer/footer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './product.css';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [wishlistStatus, setWishlistStatus] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:46381/wishlist/check?productId=${productId}`, {
          headers: {
            Authorization: token
          }
        });
        setIsInWishlist(response.data.isInWishlist);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };

    axios.get(`http://localhost:46381/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error retrieving product details:', error);
      });

    checkWishlistStatus(); // Appeler la fonction pour vérifier le statut de la wishlist

  }, [productId]);

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:46381/wishlist/add', {
        productId: productId
      }, {
        headers: {
          Authorization: token
        }
      });
      setWishlistStatus(response.data);
      setIsInWishlist(true); // Mettre à jour l'état pour indiquer que le produit est dans la wishlist
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      setWishlistStatus('Error adding product to wishlist. Please try again later.');
    }
  };

  const removeFromWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:46381/wishlist/remove', {
        productId: productId
      }, {
        headers: {
          Authorization: token
        }
      });
      setWishlistStatus(response.data);
      setIsInWishlist(false); // Mettre à jour l'état pour indiquer que le produit n'est pas dans la wishlist
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      setWishlistStatus('Error removing product from wishlist. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar />
      <section className='product'>
        <div className='all-info'>
          <div>
            <img className='product-img' src={product.image_1} alt='produt'/>
          </div>
          <div className='produdt-info'>
            <h2 className='product-name'>{product.name}</h2>
            <p className='product-description'>{product.description}</p>
            <h3 className='color'>Color:</h3>
            <div className='color-2'></div>
            <h3 className='color'>Price:</h3>
            <p className='price'>${product.price}</p>
            <div className='separation'>
              <button className='add'>Add to cart</button>
              {isInWishlist ? ( // Afficher le bouton "Remove from Wishlist" si le produit est dans la wishlist
                <button className='wishlist-btn' onClick={removeFromWishlist}>Remove from Wishlist</button>
              ) : (
                <button className='wishlist-btn' onClick={addToWishlist}>Add to Wishlist</button>
              )}
            </div>
            {wishlistStatus && <p className="wishlist-status">{wishlistStatus}</p>}
          </div>
        </div>
      </section>
      <section className='class-img'>
        <img className='img' src='https://www.vanmoof.com/sites/default/files/2023-02/CTA-D-H01-v2.jpg' alt='bar-img'/>
      </section>
      <Footer />
    </div>
  );
}

export default Product;
