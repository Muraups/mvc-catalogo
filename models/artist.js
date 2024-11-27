const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Genre = require('./genre'); 

const Artist = sequelize.define('Artist', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Artist.belongsTo(Genre, { foreignKey: 'genre_id' });

module.exports = Artist;
