require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./Routes/auth');
const productsRoutes = require('./Routes/products');
const usersRoutes = require('./Routes/user')

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/user', usersRoutes);

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});