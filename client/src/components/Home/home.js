import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';

const Home = () => {
  return (
    <>
      <header className='home-header'>
        <nav className='home-nav'>
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
        <div className='home-title'>
          <h2>Ride into the Future with WattWheels</h2>
          <p>Your Eco-Friendly Electric Bike Destination!</p>
          <Link to={"./register"}><button className='btn'>Register</button></Link>
        </div>
      </header>
    </>
  );
}

export default Home;
