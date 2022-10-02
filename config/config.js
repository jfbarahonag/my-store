require('dotenv').config();

const { NODE_ENV, PORT, RDBMS,
    DB_HOST, DB_NAME, DB_USER, DB_PASSWORD,
    POSTGRES_PORT, MYSQL_PORT } = process.env;

if (!(RDBMS === 'mysql' || RDBMS === 'postgres')) {
  throw Error('INVALID RDBMS');
}

const config = {
    /* server config */
    env: NODE_ENV || 'dev',
    port: PORT || 3000,
    /* db config */
    rdbms: RDBMS,
    dbHost: DB_HOST,
    dbPort: RDBMS === 'mysql' ? MYSQL_PORT :
            RDBMS === 'postgres' ? POSTGRES_PORT : 'INVALID',

    dbName: DB_NAME,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
};

module.exports = { config }
