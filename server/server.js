const express = require('express');
const app = express();
const port = 46312;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
