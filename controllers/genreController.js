const Genre = require('../models/genre');
const Artist = require('../models/artist');
const Album = require('../models/album');

module.exports = {
    async getAll(req, res) {
        const genres = await Genre.findAll({
            include: [
                { model: Artist, attributes: ['id', 'name'] },
                { model: Album, attributes: ['id', 'title'] },
            ],
        });
        res.json(genres);
    },

    async create(req, res) {
        const { name } = req.body;
        const genre = await Genre.create({ name });
        res.status(201).json(genre);
    },

    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const genre = await Genre.update({ name }, { where: { id } });
        res.json(genre);
    },

    async delete(req, res) {
        const { id } = req.params;
        await Genre.destroy({ where: { id } });
        res.status(204).send();
    },
};
