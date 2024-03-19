import React from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './navbar.css'

const Navbar = () => {
    return (
        <nav className='home-nav-2'>
          <div className='home-navlink'>
            <h1>VoltBike</h1>
            <ul>
              <li><NavLink to={"/product"} className='link'>VoltBike Pulse</NavLink></li>
              <li><NavLink to={"/product"} className='link'>VoltBike Boost</NavLink></li>
              <li><NavLink to={"/product"} className='link'>VoltBike Spark</NavLink></li>
            </ul>
          </div>
          <div className='icon'>
            <NavLink to={"./cart"}><FontAwesomeIcon icon={faCartShopping} size='xl' style={{color: "#ffffff",}} /></NavLink>
            <NavLink to={"./account"}><FontAwesomeIcon icon={faCircleUser} size='xl' style={{color: "#ffffff",}} /></NavLink>
          </div>
        </nav>
    )
}

export default Navbar;