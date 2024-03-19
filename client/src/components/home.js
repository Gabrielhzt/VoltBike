import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <>
      <header>
        <nav>
          <div>
            <h1>VoltBike</h1>
            <ul>
              <li><NavLink to="/product">VoltBike Pulse</NavLink></li>
              <li><NavLink to="/product">VoltBike Boost</NavLink></li>
              <li><NavLink to="/product">VoltBike Spark</NavLink></li>
            </ul>
          </div>
          <div>
            <FontAwesomeIcon icon={faCartShopping} />
            <FontAwesomeIcon icon={faCircleUser} style={{color: "#ffffff",}} />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Home;
