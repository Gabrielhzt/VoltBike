const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT order_id FROM orders WHERE user_id = $1 AND close = false', [userId], (error, result) => {
        if (error) {
            console.error('Error retrieving cart:', error);
            res.status(500).send('Error retrieving cart');
        } else if (result.rows.length > 0) {
            pool.query('SELECT o.order_id, o.total, od.order_detail_id, od.product_id, od.quantity, p.name, p.price, p.product_img FROM orders o INNER JOIN orders_detail od ON o.order_id = od.order_id INNER JOIN products p ON od.product_id = p.product_id WHERE user_id = $1 AND close = false', [userId], (error, result) => {
                if(error) {
                    console.error('Error retrieving cart:', error);
                    res.status(500).send('Error retrieving cart');
                }else {
                    res.send(result.rows)
                }
            })
        } else {
            pool.query('INSERT INTO orders (user_id) VALUES ($1)', [userId], (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error creating cart:', insertError);
                    res.status(500).send('Error creating cart');
                } else {
                    pool.query('SELECT o.order_id, o.total, od.order_detail_id, od.product_id, od.quantity, p.name, p.price, p.product_img FROM orders o INNER JOIN orders_detail od ON o.order_id = od.order_id INNER JOIN products p ON od.product_id = p.product_id WHERE user_id = $1 AND close = false', [userId], (error, result) => {
                        if(error) {
                            console.error('Error retrieving cart:', error);
                            res.status(500).send('Error retrieving cart');
                        }else {
                            res.send(result.rows)
                        }
                    })
                }
            });
        }
    });
});

router.post('/validate', (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT order_id FROM orders WHERE user_id = $1 AND close = false', [userId], (error, result) => {
        if(error) {
            console.error(error)
            res.status(500).send('Error');
        }else {
            const orderId = result.rows[0].order_id
            pool.query('UPDATE orders SET close = true WHERE order_id = $1', [orderId], (error, result) => {
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
        }
    })
});

router.put('/addproduct', (req, res) => {
    const { productId, quantity, price } = req.body;
    const userId = req.user.user_id;

    pool.query('SELECT order_id FROM orders WHERE user_id = $1 AND close = false', [userId], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error');
        } else if (result.rowCount > 0) {
            const orderId = result.rows[0].order_id; 

            pool.query('UPDATE orders_detail SET quantity = $1, price = $2 WHERE order_id = $3 AND product_id = $4', [quantity, price, orderId, productId], (error, result) => {
                if(error) {
                    console.error(error);
                    res.status(500).send('Error');
                } else if (result.rowCount === 0) {
                    pool.query('INSERT INTO orders_detail (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)', [orderId, productId, quantity, price], (error, result) => {
                        if(error) {
                            console.error(error);
                            res.status(500).send('Error');
                        } else {
                            res.send('Product added');
                        }
                    });
                }else {
                    res.send('Product added');
                }
            });
        } else {
            pool.query('INSERT INTO orders (user_id) VALUES ($1) RETURNING order_id', [userId], (error, result) => {
                if(error) {
                    console.error(error);
                    res.status(500).send('Error');
                } else {
                    const orderId = result.rows[0].order_id;

                    pool.query('INSERT INTO orders_detail (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)', [orderId, productId, quantity, price], (error, result) => {
                        if(error) {
                            console.error(error);
                            res.status(500).send('Error');
                        } else {
                            res.send('Product added');
                        }
                    });
                }
            });
        }
    });
});

router.delete('/remove', (req, res) => {
    const { order_detail_id } = req.body;

    pool.query('DELETE FROM orders_detail WHERE order_detail_id = $1', [order_detail_id], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error');
        } else {
            res.send('Deleted');
        }
    });
});

router.put('/quantity', (req, res) => {
    const { orderDetailId, quantity, orderId } = req.body;

    pool.query('UPDATE orders_detail SET quantity = $1 WHERE order_detail_id = $2', [quantity, orderDetailId], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error');
        } else {
            pool.query('SELECT product_id, quantity FROM orders_detail WHERE order_id = $1', [orderId], (error, result) => {
                if(error) {
                    console.error(error)
                    res.status(500).useChunkedEncodingByDefault('Error')
                }else {
                    res.send(result.rows)
                }
            })
        }
    });
});

router.put('/total', (req, res) => {
    const { orderId } = req.body;

    pool.query('SELECT SUM(quantity * price) AS total FROM orders_detail WHERE order_id = $1;', [orderId], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error calculating total');
        } else {
            const total = result.rows[0].total;

            pool.query('UPDATE orders SET total = $1 WHERE order_id = $2;', [total, orderId], (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error updating total');
                } else {
                    res.send({ total });
                }
            });
        }
    });
});

router.get('/validated', (req, res) => {
    const userId = req.user.user_id;

    pool.query(
        `
        SELECT 
            o.order_id, 
            o.total AS total_amount, 
            o.created_at,
            od.product_id, 
            od.quantity, 
            p.product_img AS image_url,
            p.name, 
            p.price 
        FROM 
            orders o 
            INNER JOIN orders_detail od ON o.order_id = od.order_id 
            INNER JOIN products p ON od.product_id = p.product_id 
        WHERE 
            o.close = true
            AND o.user_id = $1
        `,
        [userId],
        (error, result) => {
            if (error) {
                console.error('Error retrieving validated carts:', error);
                res.status(500).send('Error retrieving validated carts');
            } else {
                const validatedCarts = {};

                result.rows.forEach(row => {
                    const { order_id, created_at, total_amount, product_id, quantity, name, price, image_url } = row;

                    if (!validatedCarts[order_id]) {
                        validatedCarts[order_id] = {
                            order_id,
                            total_amount,
                            created_at,
                            products: []
                        };
                    }

                    validatedCarts[order_id].products.push({
                        product_id,
                        image_url,
                        name,
                        quantity,
                        price
                    });
                });

                res.json(Object.values(validatedCarts));
            }
        }
    );
});

router.get('/totalItems', (req, res) => {
    const { orderId } = req.query;

    pool.query('SELECT SUM(quantity) AS total_item FROM orders_detail WHERE order_id = $1;', [orderId], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving total items' });
        } else {
            const totalItem = result.rows[0]?.total_item || 0;
            res.json({ totalItem: totalItem.toString() });
        }
    });
});


module.exports = router;