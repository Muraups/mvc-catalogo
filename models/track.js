const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Album = require('./album');

const Track = sequelize.define('Track', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

// Relacionamento: uma faixa pertence a um álbum
Track.belongsTo(Album, { foreignKey: 'album_id' });

module.exports = Track;
