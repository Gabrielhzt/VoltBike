const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    pool.query('SELECT username, email FROM users WHERE user_id = $1', [userId], (error, result) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Error');
        } else {
            res.send(result.rows[0]);
        }
    })
})

router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;

    pool.query('UPDATE users SET username = $1, email = $2 WHERE user_id = $3', [username, email, userId], (error, result) => {
        if (error) {
            console.error('Error updating user:', error);
            res.status(500).send('Error updating user');
        } else {
            res.send("User information updated successfully");
        }
    })
})

module.exports = router;