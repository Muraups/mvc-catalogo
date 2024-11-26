const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

router.get('/', trackController.getAllTracks);
router.post('/', trackController.createTrack);
router.delete('/:id', trackController.deleteTrack);

module.exports = router;
