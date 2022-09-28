const boom = require('@hapi/boom');
const faker = require('faker');
const { pool } = require('../libs/postgres.pool');

class CategoriesService {
  constructor(){
    this.categories = [];
    this.generate(5)
    this.pool = pool
    this.pool.on('error', err => console.log(err));
  }

  generate(limit=100) {
    for (let idx = 0; idx < limit; idx++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        products: [],
      });
    };
  }

  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory)
    return newCategory
  }

  async find() {
    const query = 'SELECT * FROM tasks;';
    const query_response = await this.pool.query(query);
    return query_response.rows;
  }

  findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if (!category) {
      throw boom.notFound('Category not found');
    }

    return category
  }

  update(id, changes) {
    const idx = this.categories.findIndex(item => item.id === id);
    if (idx === -1) {
      throw boom.notFound('Category not found');
    }
    const category = this.categories[idx];
    this.categories[idx] = {
      ...category,
      ...changes
    };
    return this.categories[idx];
  }

  delete(id) {
    const idx = this.categories.findIndex(item => item.id === id);
    if (idx === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(idx, 1);
    return { id }
  }
}

module.exports = CategoriesService
