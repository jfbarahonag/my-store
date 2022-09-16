const express = require('express')
const categories_router = require('./categories.router')
const products_router = require('./products.router')
const users_router = require('./users.router')

function router_api(app) {
    const router = express.Router()
    app.use('/api/v1', router)
    
    router.use('/categories', categories_router)
    router.use('/products', products_router)
    router.use('/users', users_router)
}

module.exports = router_api
