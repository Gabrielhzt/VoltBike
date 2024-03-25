const express = require('express');
const router = express.Router();
const pool = require('../database');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

router.get('/profile', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT username, email FROM users WHERE user_id = $1', [userId], (error, result) => {
        if(error) {
            console.error(error)
            res.status(500).send("Error")
        }else {
            res.send(result.rows[0])
        }
    })
});

router.put('/profile', (req, res) => {
    const userId = req.user.user_id;
    const { username, email } = req.body;

    pool.query('UPDATE users SET username = $1, email = $2 WHERE user_id = $3', [username, email, userId], (error, result) => {
        if (error) {
            console.error('Error updating user:', error);
            res.status(500).send('Error updating user');
        } else {
            res.send("User information updated successfully");
        }
    });
});

router.post('/logout', (req, res) => {
    // Clear the JWT token from local storage
    res.clearCookie('token'); // If using cookies
    localStorage.removeItem('token'); // If using local storage

    // Respond with a success message
    res.status(200).json({ message: 'Logout successful' });
});




module.exports = router;