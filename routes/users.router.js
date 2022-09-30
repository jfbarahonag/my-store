const express = require('express');
const UsersService = require('../services/users.service');
const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema} = require('../schemas/users.schema');
const { validatorHandler } = require('../middlewares/validator.handler');

const router = express.Router()

const usersService = new UsersService();

router.get('/', async (req, res) => {
  const {limit, offset} = req.query
  let users = await usersService.find()
  if (limit && offset) {
    users = {limit, offset, users}
  }
  res.json(users)
});

router.get('/:id',
validatorHandler(getUserSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await usersService.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})

router.post('/',
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await usersService.create(body)
    res.json({
      message:"Created",
      data: newUser
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id',
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await usersService.update(id, body)
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
validatorHandler(deleteUserSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const id_deleted = await usersService.delete(id)
    res.json(id_deleted);
  } catch (error) {
    next(error)
  }
});

module.exports = router
