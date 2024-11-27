const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Album = require('./album'); 
const Genre = require('./genre'); 

const Track = sequelize.define('Track', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.FLOAT, 
    },
});

Track.belongsTo(Album, { foreignKey: 'album_id' }); 
Album.hasMany(Track);

module.exports = Track;
