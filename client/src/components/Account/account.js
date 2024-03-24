import React, { useState } from 'react';
import Navbar from '../nav/navbar';
import Footer from '../footer/footer';
import { NavLink, Outlet } from 'react-router-dom';
import './account.css';

const Account = () => {
  const [activeLink, setActiveLink] = useState('');

  return (
    <div>
      <Navbar />
      <section className='account'>
        <div className='pages'>
          <NavLink to="/account/personal-information">
            Personal Information
          </NavLink>
          <NavLink to="/account/order-history">
            Order History
          </NavLink>
          <NavLink to="/account/wishlist">
            Wishlist
          </NavLink>
        </div>
        <div className='page-info'>
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Account;
