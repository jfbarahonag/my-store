const {User, userSchema} = require('./user.model')
const {Customer, customerSchema} = require('./customer.model')

function setUpModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = { setUpModels }
