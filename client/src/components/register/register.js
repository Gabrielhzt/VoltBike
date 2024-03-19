import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../nav/navbar';
import Footer from '../footer/footer';
import './register.css'

const ExampleForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:46381/auth/register', {
        username: name,
        email: email,
        password: password
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='register'>
        <h2>Create account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className='input-name'>Name</label>
            <br />
            <input
              type="text"
              id="name"
              className='input'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className='input-name'>Email address</label>
            <br />
            <input
              type="email"
              id="email"
              className='input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className='input-name'>Password</label>
            <br />
            <input
              type="password"
              id="password"
              className='input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create an account</button>
          <p>Already have an account ? <Link to={'/login'} className='login-link'>Login</Link></p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ExampleForm;