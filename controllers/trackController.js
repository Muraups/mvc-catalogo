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
      const { title, album_id, duration } = req.body;
      const track = await Track.create({ title, album_id, duration });
      res.status(201).json(track);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar a faixa: ' + error.message });
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
