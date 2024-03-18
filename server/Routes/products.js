const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    pool.query('SELECT name, price FROM products', (error, result) => {
        if (error) {
            // Gérer l'erreur
            console.error('Erreur lors de la récupération des produits:', error);
            res.status(500).send('Erreur lors de la récupération des produits');
        } else {
            // Envoyer le résultat au client
            res.send(result.rows);
        }
    });
});

router.get('/:productId', (req, res) => {
    const {productId} = req.params;

    pool.query('SELECT name, description, price FROM products WHERE product_id = $1', [productId], (error, result) => {
        if (error) {
            // Gérer l'erreur
            console.error('Erreur lors de la récupération des produits:', error);
            res.status(500).send('Erreur lors de la récupération des produits');
        } else {
            // Envoyer le résultat au client
            res.send(result.rows[0]);
        }
    });
});

module.exports = router;