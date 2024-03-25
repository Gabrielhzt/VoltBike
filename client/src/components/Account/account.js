import React from 'react';
import Navbar from '../nav/navbar';
import Footer from '../footer/footer';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './account.css';
import axios from 'axios';

const Account = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        const token = localStorage.getItem('token');
        await axios.post("http://localhost:46381/user/logout", null, {
            headers: {
                Authorization: token
            }
        });
        localStorage.removeItem('token'); // Supprimez également le jeton côté client
        navigate('/login'); // Redirigez vers la page de connexion après la déconnexion
    } catch (error) {
        console.error('Error during logout:', error);
    }
  };

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
          <button onClick={handleLogout}>Logout</button>
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
