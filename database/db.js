const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('music_catalog', 'pamubr', 'pamubr', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
