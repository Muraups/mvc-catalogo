const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

router.get('/', trackController.getAllTracks);
router.post('/', async (req, res) => {
    try {
        const { title, albumId, duration } = req.body;
        const track = await Track.create({ title, albumId, duration });
        res.status(201).json(track);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar a faixa.' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, albumId, duration } = req.body;
        const track = await Track.findByPk(id);

        if (!track) {
            return res.status(404).json({ error: 'Faixa não encontrada.' });
        }

        await track.update({ title, albumId, duration });
        res.json(track);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar a faixa.' });
    }
});
router.delete('/:id', trackController.deleteTrack);

module.exports = router;
