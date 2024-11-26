const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Artist = require('./artist');

const Album = sequelize.define('Album', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    release_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cover_image: {
        type: DataTypes.TEXT,
    },
});

// Relacionamento: um álbum pertence a um artista
Album.belongsTo(Artist, { foreignKey: 'artist_id' });

module.exports = Album;
