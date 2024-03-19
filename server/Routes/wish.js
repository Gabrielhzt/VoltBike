const express = require('express');
const router = express.Router();
const pool = require('../database');
const { error } = require('console');

router.get('/', (req, res) => {
    const { userId } = req.body;

    pool.query('SELECT * FROM wishlists where user_id = $1', [userId], (error, result) => {
        if(error) {
            console.error(error)
            res.status(500).send('Error')
        }else {
            res.send(result.rows)
        }
    })
})

router.post('/add', (req, res) => {
    const { userId, productId } = req.body;

    pool.query('SELECT * FROM wishlists WHERE user_id = $1 AND product_id = $2', [userId, productId], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error');
        } else {
            if (result.rows.length > 0) {
                res.send("This product is already in your wishlist");
            } else {
                pool.query('INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2)', [userId, productId], (insertError, insertResult) => {
                    if (insertError) {
                        console.error(insertError);
                        res.status(500).send('Error');
                    } else {
                        res.send('Product Added Successfully');
                    }
                });
            }
        }
    });
});

router.put('/remove', (req, res) => {
    const { wishlistId } = req.body;

    pool.query('DELETE FROM wishlists WHERE wishlist_id = $1', [wishlistId], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('ERROR');
        } else {
            res.send('The product has been removed');
        }
    });
});

module.exports = router;