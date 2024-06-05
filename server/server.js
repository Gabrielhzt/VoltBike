const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./Routes/auth');
const productsRoutes = require('./Routes/products');
const usersRoutes = require('./Routes/user');
const passport = require('passport');

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/user', passport.authenticate('jwt', { session: false }), usersRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
