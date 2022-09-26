const express = require("express");
const CategoriesService = require('../services/categories.service')
const { validatorHandler } = require('../middlewares/validator.handler')
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  deleteCategorySchema } = require('../schemas/categories.schema')

const router = express.Router()

const categoriesService = new CategoriesService()

router.get('/', async (req, res) => {
  const categories = await categoriesService.find()
    res.json(categories)
  });

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await categoriesService.findOne(id)
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  });

router.get('/:category_id/products/:product_id', (req, res) => {
    const {category_id, product_id} = req.params
    res.json({category_id, product_id})
})

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await categoriesService.create(body)
    res.json({
      message:"Created",
      data: newCategory
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
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await categoriesService.update(id, body)
      res.json({message: 'updated', category});
    } catch (error) {
      next(error)
    }
  });

router.delete('/:id',
  validatorHandler(deleteCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const id_deleted = await categoriesService.delete(id)
      res.json(id_deleted);
    } catch (error) {
      next(error)
    }
  });

module.exports = router
