const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../database');
const jwt = require('jsonwebtoken');

require('../passport/auth_jwt')

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    try {
      await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          // Si l'authentification réussit, générez le jeton JWT
          const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, 'secretkey', { expiresIn: '1h' });
          return res.status(200).send({
            success: true,
            message: "Logged in successfully",
            token: "Bearer " + token
          })
        } else {
          // Si le mot de passe ne correspond pas, renvoyez une erreur 401
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        // Si l'utilisateur n'est pas trouvé, renvoyez une erreur 401
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;