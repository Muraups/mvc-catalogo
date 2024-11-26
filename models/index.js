const sequelize = require('../database/db');

// Importa os modelos
const Genre = require('./genre');
const Artist = require('./artist');
const Album = require('./album');
const Track = require('./track');

// Configura as associações após os modelos serem definidos

// Artist ↔ Genre
Artist.belongsTo(Genre, { foreignKey: 'genre_id' });
Genre.hasMany(Artist, { foreignKey: 'genre_id' });

// Album ↔ Artist
Album.belongsTo(Artist, { foreignKey: 'artist_id' });
Artist.hasMany(Album, { foreignKey: 'artist_id' });

// Album ↔ Genre (se aplicável)
Album.belongsToMany(Genre, {
  through: 'AlbumGenre',
  foreignKey: 'album_id',
  otherKey: 'genre_id',
});
Genre.belongsToMany(Album, {
  through: 'AlbumGenre',
  foreignKey: 'genre_id',
  otherKey: 'album_id',
});

// Track ↔ Album
Track.belongsTo(Album, { foreignKey: 'album_id' });
Album.hasMany(Track, { foreignKey: 'album_id' });

// Exporta os modelos e a conexão Sequelize
module.exports = { sequelize, Artist, Genre, Album, Track };
