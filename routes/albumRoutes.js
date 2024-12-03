const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/api/albums/:id', async (req, res) => {
  const { id } = req.params;
  const album = await Album.findByPk(id, { include: [Artist, Genre, Track] });
  if (!album) {
    return res.status(404).json({ message: 'Álbum não encontrado.' });
  }
  res.json(album);
});
router.post('/', albumController.createAlbum);

module.exports = router;