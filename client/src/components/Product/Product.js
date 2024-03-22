import React, { useState, useEffect } from 'react';
import Navbar from '../nav/navbar';
import Footer from '../footer/footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './product.css';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:46381/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error retrieving product details:', error);
      });
  }, [productId]);

  console.log(product)

  return (
    <div>
      <Navbar />
      <section className='product'>
        <div className='all-info'>
          <div>
            <img className='product-img' src={`${product.image_1}`} alt='produt'/>
          </div>
          <div className='produdt-info'>
            <h2 className='product-name'>{product.name}</h2>
            <p className='product-description'>{product.description}</p>
            <h3 className='color'>Color:</h3>
            <div className='color-2'></div>
            <h3 className='color'>Price:</h3>
            <p className='price'>${product.price}</p>
            <button className='add'>Add to cart</button>
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
