const express = require('express');
const router = express.Router();
const pool = require('../database');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const bcrypt = require('bcrypt');

router.get('/profile', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT full_name, email FROM users WHERE user_id = $1', [userId], (error, result) => {
        if(error) {
            console.error(error)
            res.status(500).send("Error")
        }else {
            res.send(result.rows[0])
        }
    })
});

router.put('/profile', async (req, res) => {
    const userId = req.user.user_id;
    const { full_name, email, password } = req.body;

    try {
        await pool.query('UPDATE users SET full_name = $1, email = $2 WHERE user_id = $3', [full_name, email, userId]);

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, userId]);
        }

        res.send("User information updated successfully");
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
});

router.post('/logout', (req, res) => {
    localStorage.removeItem('token');

    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;