require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pool = require('./database')

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});