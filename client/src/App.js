import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home/home';
import Product from './components/Product/Product';
import Cart from './components/cart';
import Login from './components/login/login';
import Register from './components/register/register';
import Account from './components/Account/account';
import Info from './components/Account/Info/info';
import Order from './components/Account/order/order';
import Wishlist from './components/Account/wishlist/wishlist';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/*" element={<Account />}>
            <Route path="personal-information" element={<Info />} />
            <Route path="order-history" element={<Order />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
