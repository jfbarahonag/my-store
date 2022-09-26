const boom = require('@hapi/boom');
const faker = require('faker')

class ProductsService {
  constructor(){
      this.products = [];
      this.generate()
  }

  generate(limit=100) {
    for (let idx = 0; idx < limit; idx++) {
        this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price()),
            image: faker.image.imageUrl(),
            isBlock: faker.datatype.boolean(),
        });
    };
  }

  async create(data) {
    const newProduct = {
        id: faker.datatype.uuid(),
        ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    // simulate delayed reponse from a db
    return new Promise((resolve, reject) => {
        const condition = this.products.length > 0
        setTimeout(() => {
            if(condition===true){
                resolve(this.products)
            } else {
                reject({})
            }
        }, 5000/*ms*/);
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
        throw boom.notFound('Product not found');
    }
    if(product.isBlock) {
        throw boom.conflict('Product is blocked')
    }

    return product;
  }

  async update( id, changes) {
    const idx = this.products.findIndex(item => item.id === id);
    if (idx === -1) {
        throw boom.notFound('Product not found');
    }
    const product = this.products[idx]
    this.products[idx] = {
        ...product,
        ...changes
    };
    return this.products[idx]
  }

  async delete(id) {
    const idx = this.products.findIndex(item => item.id === id);
    if (idx === -1) {
        throw boom.notFound('Product not found');
    }
    this.products.splice(idx, 1)
    return { id }
  }
}

module.exports = ProductsService
