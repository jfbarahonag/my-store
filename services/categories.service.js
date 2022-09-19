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

    create() {

    }

    find() {
        return this.categories;
    }

    findOne(id) {
        return this.categories.find(item => item.id === id) || {};
    }

    update() {

    }

    delete() {

    }
}

module.exports = CategoriesService