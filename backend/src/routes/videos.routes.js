const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videos.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Routes pour les vidéos d'un lieu
router.get('/lieu/:lieuId', videosController.getVideosByLieu);
router.get('/:id', videosController.getVideoById);

// Routes nécessitant une authentification
router.post('/lieu/:lieuId', requireAuth, videosController.addVideo);
router.put('/:id', requireAuth, videosController.updateVideo);
router.delete('/:id', requireAuth, videosController.deleteVideo);
router.post('/:id/main', requireAuth, videosController.setMainVideo);

module.exports = router; 