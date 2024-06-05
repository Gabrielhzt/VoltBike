const express = require('express');
const app = express();
const port = 3000;
const productsRoutes = require('./Routes/products')

app.use('/products', productsRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
