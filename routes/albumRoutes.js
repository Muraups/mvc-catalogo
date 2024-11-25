const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.getAllAlbums);
router.post('/', albumController.createAlbum);

module.exports = router;
