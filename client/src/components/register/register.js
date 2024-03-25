import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../nav/navbar';
import Footer from '../footer/footer';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.get('http://localhost:46381/auth/verify', {
            headers: {
              Authorization: token
            }
          });
          navigate('/account/personal-information');
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    };
  
    checkAuthentication();
  }, [navigate]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:46381/auth/register', {
        username: name,
        email: email,
        password: password
      });

      navigate('/login')
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

export default Register;
