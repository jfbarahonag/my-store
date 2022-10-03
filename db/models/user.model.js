const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  static associate(models) {
    //associate models
    this.hasOne(models.Customer, {
      as:'customer',
      foreignKey: 'userId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    };
  }
};

module.exports = { USER_TABLE, userSchema, User }
