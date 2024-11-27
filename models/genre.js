const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Album = require('./album'); 

const Genre = sequelize.define('Genre', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports = Genre; 
