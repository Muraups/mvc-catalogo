const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Album = require('./album'); // Certifique-se de que o caminho está correto
const Genre = require('./genre'); // Caso seja necessário

const Track = sequelize.define('Track', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.FLOAT, // Duração em minutos (exemplo de tipo float)
    },
});

// Defina as associações
Track.belongsTo(Album, { foreignKey: 'album_id' }); // Associa a Faixa com o Álbum
Album.hasMany(Track); // Um álbum tem várias faixas

module.exports = Track;
