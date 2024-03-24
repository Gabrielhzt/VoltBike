const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');

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

router.get('/check', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { productId } = req.query;
    const userId = req.user.user_id;

    pool.query('SELECT * FROM wishlists WHERE user_id = $1 AND product_id = $2', [userId, productId], (error, result) => {
        if(error) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.rows.length > 0) {
                res.json({ isInWishlist: true });
            } else {
                res.json({ isInWishlist: false });
            }
        }
    });
});


router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { productId } = req.body;
    const userId = req.user.user_id;

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

router.put('/remove', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { productId } = req.body;
    const userId = req.user.user_id;

    pool.query('DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2', [userId, productId], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('ERROR');
        } else {
            res.send('The product has been removed');
        }
    });
});

module.exports = router;