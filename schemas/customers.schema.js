const Joi = require("joi");

const id = Joi.number();
const firstName = Joi.string().min(3);
const lastName = Joi.string().min(3);
const phone = Joi.string().min(10).max(10);

const userId = Joi.number().min(1);
const email = Joi.string().email();
const password = Joi.string().min(8).max(32);
const role = Joi.string().min(5);

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone,
  user: Joi.object({
    email:email.required(),
    password:password.required(),
    role:role,
  })
})

const getCustomerSchema = Joi.object({
  id: id.required()
})

const updateCustomerSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  userId: userId,
})


const deleteCustomerSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
  deleteCustomerSchema
};
