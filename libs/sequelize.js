const { Sequelize } = require('sequelize');
const { setUpModels } = require('../db/models')

const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.rdbms}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
    dialect: `${config.rdbms}`,
    logging:true,
});

setUpModels(sequelize);

// sequelize.sync();

module.exports = { sequelize };
