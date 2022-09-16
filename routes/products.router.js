const express = require('express');
const faker = require('faker');

const router = express.Router();

const get_products = (limit=100) => {
  let products = []
  for (let idx = 0; idx < limit; idx++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
    })
  }
  return products
}

let products = get_products();

router.get('/', (req, res) => {
    const {size} = req.query;
    const limit = size || 10; // get from query params or 10 by default
    products = get_products(limit);
    res.json(products);
  });
  
// endpoints especificos deben ir antes de los dinamicos
router.get('/filter', (req, res) => {
    res.send('i am a filter')
});

router.get('/:product_id', (req, res) => {
    const { product_id } = req.params;
    const product = (product_id > 0 && product_id <=products.length) ? {id: product_id, ...products.at(product_id-1)}:{};
    res.json(product);
});

module.exports = router
