const express = require('express');
const router = express.Router();
const signalementsController = require('../controllers/signalements.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Appliquer l'authentification à toutes les routes
router.use(requireAuth);

// Créer un signalement pour un lieu
router.post('/lieux/:lieuId', signalementsController.createSignalement);

// Vérifier si l'utilisateur a signalé ce lieu
router.get('/lieux/:lieuId', signalementsController.hasUserReported);

// Récupérer tous les signalements (admin seulement)
router.get('/', signalementsController.getAllSignalements);

// Récupérer les signalements d'un lieu spécifique (admin seulement)
router.get('/lieux/:lieuId/list', signalementsController.getSignalementsByLieu);

module.exports = router; 