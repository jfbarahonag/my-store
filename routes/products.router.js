const express = require('express');
const ProductsService = require('../services/products.service')

const router = express.Router();

const productsService = new ProductsService();

router.get('/', (req, res) => {
  const products = productsService.find()
  res.json(products)
});
  
// endpoints especificos deben ir antes de los dinamicos
router.get('/filter', (req, res) => {
    res.send('i am a filter')
});

router.get('/:id', (req, res) => {
  let { id } = req.params;
  const product = productsService.findOne(id);
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
