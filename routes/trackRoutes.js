const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

router.get('/', trackController.getAllTracks);
router.post('/', async (req, res) => {
    try {
      const { name, album_id, duration } = req.body; // Incluindo 'duration'
      const track = await Track.create({
        name, 
        album_id, 
        duration, // Duração será salva junto com os outros dados
      });
      res.status(201).json(track); // Retorna a faixa criada
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar faixa' });
    }
  });  
router.delete('/:id', trackController.deleteTrack);

module.exports = router;
