const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM products', (error, result) => {
        if (error) {
            console.error(error)
            res.status(500).send('Error retrieving products');
        } else {
            res.send(result.rows)
        }
    })
})

module.exports = router;