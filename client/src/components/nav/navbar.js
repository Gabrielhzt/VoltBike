import React, {useState, useEffect} from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './navbar.css'

const Navbar = () => {
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

    return (
        <nav className='home-nav-2'>
          <div className='home-navlink'>
          <NavLink to={'/'} className='name'><h1>VoltBike</h1></NavLink>
            {products.map(product => (
              <ul key={product.product_id}>
                <li><NavLink to={`/product/${product.product_id}`} className='link'>{product.name}</NavLink></li>
              </ul>
            ))}
          </div>
          <div className='icon'>
            <NavLink to={"./cart"}><FontAwesomeIcon icon={faCartShopping} size='xl' style={{color: "#ffffff",}} /></NavLink>
            <NavLink to={"./account"}><FontAwesomeIcon icon={faCircleUser} size='xl' style={{color: "#ffffff",}} /></NavLink>
          </div>
        </nav>
    )
}

export default Navbar;