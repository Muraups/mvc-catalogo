const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/', artistController.getAll);
// Cria um novo artista
router.post("/", async (req, res) => {
    const { name, genre } = req.body;
  
    // Encontre ou crie o gênero
    const [foundGenre] = await genreController.findOrCreate({ where: { name: genre } });
  
    // Crie o artista
    const artist = await artistController.create({ name, genre_id: foundGenre.id });
    res.status(201).json(artist);
  });
router.put('/:id', artistController.update);
router.delete('/:id', artistController.delete);

module.exports = router;
