const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Genre = sequelize.define('Genre', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Genre; // Exporte o modelo antes de configurar associações
