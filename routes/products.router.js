const express = require('express');
const ProductsService = require('../services/products.service')
const { validatorHandler } = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products.schema')

const router = express.Router();

const productsService = new ProductsService();

router.get('/', async (req, res) => {
  const products = await productsService.find()
  res.json(products)
});

// endpoints especificos deben ir antes de los dinamicos
router.get('/filter', (req, res) => {
    res.send('i am a filter')
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      let { id } = req.params;
      const product = await productsService.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await productsService.create(body)
    res.status(201).json({
      message:"Created",
      data: newProduct
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

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productsService.update(id, body)
      res.json({message:"Updated", ...product});

    } catch (error) {
      next(error)
    }
  });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const id_deleted = await productsService.delete(id)
  res.json(id_deleted);
});

module.exports = router
