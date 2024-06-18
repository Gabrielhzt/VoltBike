require('dotenv').config();

const express = require('express');
const router = express.Router();
const pool = require('../database');
const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);

router.post('/paiement', async (req, res) => {
    const { amount, token } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            payment_method: token,
            confirm: true,
        });

        console.log('Payment Intent:', paymentIntent);

        res.json({ success: true });
    } catch (error) {
        console.error('Erreur lors du paiement : ', error);
        res.status(500).json({ error: 'Problème lors du paiement' });
    }
});

router.post('/create-payment-intent', async (req, res) => {
    const { amount, products } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            metadata: { products: JSON.stringify(products) },
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
