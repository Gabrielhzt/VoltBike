const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./Routes/auth');
const productsRoutes = require('./Routes/products')

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
