const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(5).max(15)
const products = Joi.array()

const createCategorySchema = Joi.object({
  name: name.required(),
  products: products.required()
})

const updateCategorySchema = Joi.object({
  name: name,
  products: products
})

const getCategorySchema = Joi.object({
  id: id.required()
})

const deleteCategorySchema = Joi.object({
  id: id.required()
})

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema }
