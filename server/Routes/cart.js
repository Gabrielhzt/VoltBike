const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    const userId = req.user.user_id;
    pool.query('SELECT c.cart_id, c.total_amount, ci.cart_item_id, ci.product_id, ci.quantity, p.name, p.price, p.image_1 FROM carts c INNER JOIN cart_items ci ON c.cart_id = ci.cart_id INNER JOIN products p ON ci.product_id = p.product_id WHERE user_id = $1 AND validate = false', [userId], (error, result) => {
        if (error) {
            console.error('Error retrieving cart:', error);
            res.status(500).send('Error retrieving cart');
        } else if (result.rows.length > 0) {
            console.log(result)
            res.send(result.rows);
        } else {
            pool.query('INSERT INTO carts (user_id) VALUES ($1)', [userId], (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error creating cart:', insertError);
                    res.status(500).send('Error creating cart');
                } else {
                    res.send('Cart created successfully');
                }
            });
        }
    });
});

router.post('/:cartId', (req, res) => {
    const { cartId } = req.params;

    pool.query('UPDATE carts SET validate = true WHERE cart_id = $1', [cartId], (error, result) => {
        if (error) {
            console.error('Error updating cart validation:', error);
            res.status(500).send('Error updating cart validation');
        } else {
            if (result.rowCount > 0) {
                res.status(200).send('Cart validation updated successfully');
            } else {
                res.status(404).send('Cart not found');
            }
        }
    });
});

router.put('/addproduct', (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.user_id;

    pool.query('SELECT cart_id FROM carts WHERE user_id = $1 AND validate = false', [userId], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error');
        } else if (result.rowCount > 0) {
            const cartId = result.rows[0].cart_id; 
            console.log(cartId)

            pool.query('UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3', [quantity, cartId, productId], (error, result) => {
                if(error) {
                    console.error(error);
                    res.status(500).send('Error');
                } else if (result.rowCount === 0) {
                    pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)', [cartId, productId, quantity], (error, result) => {
                        if(error) {
                            console.error(error);
                            res.status(500).send('Error');
                        } else {
                            res.send(result);
                        }
                    });
                }
            });
        } else {
            pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING cart_id', [userId], (error, result) => {
                if(error) {
                    console.error(error);
                    res.status(500).send('Error');
                } else {
                    const cartId = result.rows[0].cart_id;

                    pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)', [cartId, productId, quantity], (error, result) => {
                        if(error) {
                            console.error(error);
                            res.status(500).send('Error');
                        } else {
                            res.send(result);
                        }
                    });
                }
            });
        }
    });
});

router.delete('/remove', (req, res) => {
    const cartItemId = req.body.cartItemId;
    const userId = req.user.user_id;

    pool.query('DELETE FROM cart_items WHERE cart_item_id = $1', [cartItemId], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error');
        } else {
            res.send('Deleted');
        }
    });
});

router.put('/quantity', (req, res) => {
    const { cartItemId, quantity } = req.body;

    pool.query('UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2', [quantity, cartItemId], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error');
        } else {
            res.send('Updated');
        }
    });
});

router.put('/total', (req, res) => {
    const { cartId, totalAmount } = req.body;

    pool.query('UPDATE carts SET total_amount = $1 WHERE cart_id = $2', [totalAmount, cartId], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error');
        } else {
            res.send('Updated');
        }
    });
});



router.get('/validated', (req, res) => {
    const userId = req.user.user_id;

    pool.query(`
        SELECT 
            c.cart_id, 
            c.total_amount, 
            ci.product_id, 
            ci.quantity, 
            p.image_1,
            p.name, 
            p.price 
        FROM 
            carts c 
            INNER JOIN cart_items ci ON c.cart_id = ci.cart_id 
            INNER JOIN products p ON ci.product_id = p.product_id 
        WHERE 
            c.validate = true
            AND c.user_id = $1
    `, [userId] , (error, result) => {
        if (error) {
            console.error('Error retrieving validated carts:', error);
            res.status(500).send('Error retrieving validated carts');
        } else {
            const validatedCarts = {};

            result.rows.forEach(row => {
                const { cart_id, total_amount, product_id, quantity, name, price, image_1 } = row; // Include image_url in destructuring

                if (!validatedCarts[cart_id]) {
                    validatedCarts[cart_id] = {
                        cart_id,
                        total_amount,
                        products: []
                    };
                }

                validatedCarts[cart_id].products.push({
                    product_id,
                    image_1,
                    name,
                    quantity,
                    price
                });
            });

            res.send(Object.values(validatedCarts));
        }
    });
});



module.exports = router;