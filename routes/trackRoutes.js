const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

router.get('/', trackController.getAllTracks);
router.post('/', async (req, res) => {
    try {
      const { name, album_id, duration } = req.body; 
      const track = await Track.create({
        name, 
        album_id, 
        duration, 
      });
      res.status(201).json(track); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar faixa' });
    }
  });  
router.delete('/:id', trackController.deleteTrack);

module.exports = router;
