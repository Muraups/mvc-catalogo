const Album = require('../models/album');
const Artist = require('../models/artist');
const Genre = require('../models/genre');

exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll({
            include: [Artist, Genre],
        });
        res.json(albums);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAlbum = async (req, res) => {
    try {
        const { title, release_year, cover_image, artist_id, genres } = req.body;

        const album = await Album.create({
            title,
            release_year,
            cover_image,
            artist_id,
        });

        if (genres) {
            await album.addGenres(genres); // Associar gêneros ao álbum
        }

        res.status(201).json(album);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
