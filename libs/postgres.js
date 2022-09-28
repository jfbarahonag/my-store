const { Client } = require('pg')

const getConnection = async () => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'felipe',
        password:'admin123',
        database:'jfbg-store'
    })
    await client.connect();

    return client
}

module.exports = { getConnection }
