const express = require('express');
const app = express();
const port = 3000;
const host = 'localhost'

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
    products:[]
  },
  {
    name:"Category 2",
    products:[]
  },
]

app.get('/', (req, res) => {
  res.send('Hi from Express');
});

app.get('/products', (req, res) => {
  res.json(products)
});

app.get('/products/:product_id', (req, res) => {
  const { product_id } = req.params
  const product = (product_id > 0 && product_id <=products.length) ? {id: product_id, ...products.at(product_id-1)}:{}
  res.json(product)
})

app.get('/categories', (req, res) => {
  res.json(categories)
});

app.get('/categories/:category_id', (req, res) => {
  const { category_id } = req.params
  const category = (category_id > 0 && category_id <=categories.length) ? {id: category_id, ...categories.at(category_id-1)}:{}
  res.json(category)
})

app.get('/categories/:category_id/products/:product_id', (req, res) => {
  const {category_id, product_id} = req.params
  res.json({category_id, product_id})
})

app.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
