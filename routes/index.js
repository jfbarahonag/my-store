const categories_router = require('./categories.router')
const products_router = require('./products.router')
const users_router = require('./users.router')

function router_api(app) {
    app.use('/categories', categories_router)
    app.use('/products', products_router)
    app.use('/users', users_router)
}

module.exports = router_api
