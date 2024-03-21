require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const authRoutes = require('./Routes/auth');
const productsRoutes = require('./Routes/products');
const usersRoutes = require('./Routes/user');
const cartRoutes = require('./Routes/cart');
const wishRoutes = require('./Routes/wish');


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/user', usersRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishRoutes);

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
