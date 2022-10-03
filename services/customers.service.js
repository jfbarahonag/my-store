const boom = require('@hapi/boom')

const { sequelize } = require('../libs/sequelize')

const { models } = sequelize

class CustomerService {
  constructor(){}

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const response = await models.Customer.findAll({
      include:['user']
    });
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found')
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = { CustomerService };
