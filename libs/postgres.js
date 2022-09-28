const { Client } = require('pg')

const { DB_USER, DB_NAME, DB_PASSWORD } = process.env

const getConnection = async () => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: DB_USER,
        password:DB_PASSWORD,
        database:DB_NAME
    })
    await client.connect();

    return client
}

module.exports = { getConnection }
