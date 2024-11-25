const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Genre = require('./genre'); // Certifique-se de que o caminho está correto e o modelo está exportado

const Artist = sequelize.define('Artist', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Configuração de associações
Artist.belongsTo(Genre, { foreignKey: 'genre_id' });

module.exports = Artist;
