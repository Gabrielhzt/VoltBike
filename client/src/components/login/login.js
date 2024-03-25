import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../nav/navbar';
import Footer from '../footer/footer';
import './login.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await axios.post('http://localhost:46381/auth/login', {
        email: email,
        password: password
      });

      // Extraire le token JWT de la réponse et le stocker dans le localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      setErrorMessage('');
      console.log(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='register'>
        <h2 className='login'>Log in</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <div>
            <label htmlFor="email" className='input-name'>Email</label>
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
          <button type="submit">Log in</button>
          <p>New here ? <Link to={'/register'} className='login-link'>Create an account</Link></p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
