const express = require('express');
const { CustomerService } = require('../services/customers.service');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
  deleteCustomerSchema} = require('../schemas/customers.schema');
const { validatorHandler } = require('../middlewares/validator.handler');

const router = express.Router()

const customersService = new CustomerService();

router.get('/', async (req, res) => {
  const {limit, offset} = req.query
  let users = await customersService.find()
  if (limit && offset) {
    users = {limit, offset, users}
  }
  res.json(users)
});

router.get('/:id',
validatorHandler(this.getCustomerSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await customersService.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})

router.post('/',
validatorHandler(createCustomerSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await customersService.create(body)
    res.json({
      message:"Created",
      data: newUser
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id',
validatorHandler(getCustomerSchema, 'params'),
validatorHandler(updateCustomerSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await customersService.update(id, body)
    res.json({
      message: 'updated',
      data: user,
      id
    });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',
validatorHandler(deleteCustomerSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const id_deleted = await customersService.delete(id)
    res.json(id_deleted);
  } catch (error) {
    next(error)
  }
});

module.exports = router
