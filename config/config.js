require('dotenv').config();

const { NODE_ENV, PORT, 
    DB_HOST, DB_PORT,
    DB_NAME, DB_USER, DB_PASSWORD } = process.env

const config = {
    /* server config */
    env: NODE_ENV || 'dev',
    port: PORT || 3000,
    /* db config */
    dbHost: DB_HOST,
    dbPort: DB_PORT,

    dbName: DB_NAME,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
};

module.exports = { config }
