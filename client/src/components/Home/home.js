import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/footer';
import './home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:46381/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error retrieving products:', error);
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Pour un défilement en douceur
    });
  };

  return (
    <>
      <header className='home-header'>
        <nav className='home-nav'>
          <div className='home-navlink'>
            <NavLink to={'/'} className='name'><h1>VoltBike</h1></NavLink>
            {products.map(product => (
              <ul key={product.product_id}>
                <li><NavLink to={`/product/${product.product_id}`} className='link'>{product.name}</NavLink></li>
              </ul>
            ))}
          </div>
          <div className='icon'>
            <NavLink to={"./cart"}><FontAwesomeIcon icon={faCartShopping} size='xl' style={{ color: "#ffffff" }} /></NavLink>
            <NavLink to={"./account"}><FontAwesomeIcon icon={faCircleUser} size='xl' style={{ color: "#ffffff" }} /></NavLink>
          </div>
        </nav>
        <div className='home-title'>
          <h2>Ride into the Future with WattWheels</h2>
          <p>Your Eco-Friendly Electric Bike Destination!</p>
          <Link to={"./register"}><button className='btn'>Register</button></Link>
        </div>
      </header>
      <section className='products'>
        {products.map(product => (
          <div key={product.product_id}>
            <div className='products-cart' style={{ backgroundImage: `url(${product.image_url})` }}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Link to={`/product/${product.product_id}`} onClick={scrollToTop}><button>Buy it</button></Link>
            </div>
          </div>
        ))}
      </section>
      <section className='class-img'>
        <img className='img' src='https://www.vanmoof.com/sites/default/files/2023-02/CTA-D-H01-v2.jpg' alt='bar-img'/>
      </section>
      <Footer />
    </>
  );
}

export default Home;
