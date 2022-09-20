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
            setTimeout(() => {
                resolve(this.products)
            }, 5000/*ms*/);
        })
    }

    async findOne(id) {
        // Delete this: Test for error middlewares
        const test_errors_middleware = this.not_valid_function();
        return this.products.find(item => item.id === id) || {};
    }

    async update( id, changes) {
        const idx = this.products.findIndex(item => item.id === id);
        if (idx === -1) {
            throw new Error('Product not found');
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
            throw new Error('Product not found');
        }
        this.products.splice(idx, 1)
        return { id }
    }
}

module.exports = ProductsService