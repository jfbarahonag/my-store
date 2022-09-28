const { Pool } = require('pg')

const { DB_USER, DB_NAME, DB_PASSWORD } = process.env

const pool = new Pool({
        host: 'localhost',
        port: 5432,
        user: DB_USER,
        password:DB_PASSWORD,
        database:DB_NAME
    }
)

module.exports = { pool }
