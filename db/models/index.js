const {User, userSchema} = require('./user.model')

function setUpModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
}

module.exports = { setUpModels }
