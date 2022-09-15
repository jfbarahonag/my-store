const express = require('express');
const app = express();
const port = 3000;
// const host = 'localhost'
const host = '172.25.111.204'

let products = [
  {
    name:"Product 1",
    price:"1.00",
    stock:"1",
  },
  {
    name:"Product 2",
    price:"2.00",
    stock:"2",
  },
]

let categories = [
  {
    name:"Category 1",
  },
  {
    name:"Category 2",
  },
]

app.get('/', (req, res) => {
  res.send('Hi from Express');
});

app.get('/products', (req, res) => {
  res.json(products)
});

app.get('/categories', (req, res) => {
  res.json(categories)
});

app.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
