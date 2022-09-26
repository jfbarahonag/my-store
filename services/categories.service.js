const boom = require('@hapi/boom');
const faker = require('faker')

class CategoriesService {
  constructor(){
    this.categories = [];
    this.generate(5)
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

  find() {
    return new Promise((resolve, reject) => {
      const condition = this.categories.length > 0
      setTimeout(() => {
        if (condition === true) {
          resolve(this.categories)
        } else {
          reject({})
        }
      }, 2000/*ms*/);
    })
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
