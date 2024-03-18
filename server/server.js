require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./Routes/auth')
const productsRoutes = require('./Routes/products')

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});