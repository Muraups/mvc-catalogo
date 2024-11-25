const Artist = require('../models/artist');
const Genre = require('../models/genre');

module.exports = {
    async getAll(req, res) {
        const artists = await Artist.findAll({ include: Genre }); // Inclui o gênero associado
        res.json(artists);
    },

    async create(req, res) {
        const { name, genre_id } = req.body;
        const artist = await Artist.create({ name, genre_id });
        res.status(201).json(artist);
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, genre_id } = req.body;
        const artist = await Artist.update({ name, genre_id }, { where: { id } });
        res.json(artist);
    },

    async delete(req, res) {
        const { id } = req.params;
        await Artist.destroy({ where: { id } });
        res.status(204).send();
    },
};
