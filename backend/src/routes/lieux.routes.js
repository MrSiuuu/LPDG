const express = require('express');
const router = express.Router();
const lieuxController = require('../controllers/lieux.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Routes protégées par authentification
router.post('/', requireAuth, lieuxController.addLieu);
router.put('/:id', requireAuth, lieuxController.updateLieu);
router.get('/', lieuxController.getAllLieux);
router.get('/user/lieux', requireAuth, lieuxController.getLieuxByUser);
router.get('/user/likes', requireAuth, lieuxController.getLikedLieux);
router.get('/user/stats', requireAuth, lieuxController.getStatsByUser);
router.get('/:id', lieuxController.getLieuById);
router.patch('/:lieuId/validation', requireAuth, lieuxController.toggleLieuValidation);

// Routes pour les likes
router.get('/:id/likes', lieuxController.getLikes);
router.get('/:id/has-liked', requireAuth, lieuxController.hasUserLiked);
router.post('/:id/like', requireAuth, lieuxController.addLike);

// Routes pour les visites
router.post('/:id/visite', requireAuth, lieuxController.addVisite);
router.delete('/:id/visite', requireAuth, lieuxController.removeVisite);
router.get('/:id/has-visited', requireAuth, lieuxController.hasUserVisited);
router.get('/user/visited', requireAuth, lieuxController.getVisitedLieux);

// Route pour ajouter un avis
router.post('/:id/avis', requireAuth, lieuxController.addAvis);

// Recherche de lieux
router.get('/search', lieuxController.searchLieux);

module.exports = router; 