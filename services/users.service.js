const boom = require('@hapi/boom')
const faker = require('faker')

const { sequelize } = require('../libs/sequelize')

const { models } = sequelize

class UsersService {
  constructor(){
    this.users = [];
    this.generate(5)
  }

  generate(limit=100) {
    for (let idx = 0; idx < limit; idx++) {
      const first_name = faker.name.firstName()
      const last_name = faker.name.lastName()
      const email = faker.internet.email(first_name, last_name)
      const password = faker.internet.password(10)
      this.users.push({
        id: faker.datatype.uuid(),
        first_name,
        last_name,
        email,
        password,
      });
    };
  }

  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const response = await models.User.findAll();
    return response;
  }

    findOne(id) {
      const user = this.users.find(item => item.id === id);
      if (!user) {
        throw boom.notFound('User not found')
      }
      return user
    }

    update(id, changes) {
      const idx = this.users.findIndex(item => item.id === id);
      if (idx === -1) {
        throw boom.notFound('User not found');
      }
      const user = this.users[idx];
      this.users[idx] = {
        ...user,
        ...changes
      };
      return this.users[idx];
    }

    delete(id) {
      const idx = this.users.findIndex(item => item.id === id);
      if (idx === -1) {
        throw boom.notFound('User not found');
      }
      this.users.splice(idx, 1);
      return { id };
    }
}

module.exports = UsersService
