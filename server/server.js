const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const authRoutes = require('./Routes/auth');
const productsRoutes = require('./Routes/products');
const usersRoutes = require('./Routes/user');
const ordersRoutes = require('./Routes/orders');
const wishlistRoutes = require('./Routes/wishlist');
const passport = require('passport');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/user', passport.authenticate('jwt', { session: false }), usersRoutes);
app.use('/orders', passport.authenticate('jwt', { session: false }), ordersRoutes);
app.use('/wishlist', passport.authenticate('jwt', { session: false }), wishlistRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
