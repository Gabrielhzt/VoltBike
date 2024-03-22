const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    pool.query('SELECT product_id,name, price, image_url FROM products', (error, result) => {
        if (error) {
            console.error('Error retrieving products:', error);
            res.status(500).send('Error retrieving products');
        } else {
            res.send(result.rows);
        }
    });
});

router.get('/:productId', (req, res) => {
    const { productId } = req.params;

    pool.query('SELECT name, description, price, image_1 FROM products WHERE product_id = $1', [productId], (error, result) => {
        if (error) {
            console.error('Error retrieving product:', error);
            res.status(500).send('Error retrieving product');
        } else {
            res.send(result.rows[0]);
        }
    });
});

module.exports = router;