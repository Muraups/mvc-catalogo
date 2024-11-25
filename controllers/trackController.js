const Track = require('../models/track');
const Album = require('../models/album');

exports.getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.findAll({ include: Album });
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTrack = async (req, res) => {
    try {
        const { title, album_id } = req.body;
        const track = await Track.create({ title, album_id });
        res.status(201).json(track);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTrack = async (req, res) => {
    try {
        const { id } = req.params;
        await Track.destroy({ where: { id } });
        res.status(200).send('Track deleted successfully.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
