const faker = require('faker')

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

    create() {

    }

    find() {
        return this.users;
    }

    findOne(id) {
        return this.users.find(item => item.id === id) || {};
    }

    update() {

    }

    delete() {

    }
}

module.exports = UsersService