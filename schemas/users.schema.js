const Joi =  require('joi')

const id = Joi.string().uuid()
const first_name = Joi.string().min(3).max(32)
const last_name = Joi.string().min(3).max(32)
const email = Joi.string().email()
const password = Joi.string().min(8).max(32)

const createUserSchema = Joi.object({
  first_name: first_name.required(),
  last_name: last_name.required(),
  email: email.required(),
  password: password.required(),
})

const getUserSchema = Joi.object({
  id: id.required()
})

const updateUserSchema = Joi.object({
  first_name: first_name,
  last_name: last_name,
  email: email,
  password: password
})


const deleteUserSchema = Joi.object({
  id: id.required()
})

module.exports = { createUserSchema, getUserSchema, updateUserSchema, deleteUserSchema }
