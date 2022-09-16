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

router.get('/:id', (req, res) => {
    let { id } = req.params;
    id = parseInt(id)
    const product = (id > 0 && id <=products.length) ? {id: id, ...products.at(id-1)}:{};
    if (JSON.stringify(product) != JSON.stringify({})) {
      res.status(200).json(product);
    }
    else{
      res.status(404).json({
        message:"Not found"
      });
    }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message:"Created",
    data: body
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update total',
    data: body,
    id
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update partial',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id
  });
});

module.exports = router
