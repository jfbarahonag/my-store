const express = require("express");
const CategoriesService = require('../services/categories.service')

const router = express.Router()

const categoriesService = new CategoriesService()

router.get('/', (req, res) => {
  const categories = categoriesService.find()
    res.json(categories)
  });
  
router.get('/:id', (req, res) => {
  const { id } = req.params
  const category = categoriesService.findOne(id)
  if (JSON.stringify(category) != JSON.stringify({})) {
    res.status(200).json(category);
  }
  else{
    res.status(404).json({
      message:"Not found"
    });
  }
})

router.get('/:category_id/products/:product_id', (req, res) => {
    const {category_id, product_id} = req.params
    res.json({category_id, product_id})
})

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
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
