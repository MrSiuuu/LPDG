const express = require('express');
const router = express.Router();
const evenementsController = require('../controllers/evenements.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Routes pour les événements d'un lieu
router.get('/lieu/:lieuId', evenementsController.getEvenementsByLieu);
router.get('/lieu/:lieuId/avenir', evenementsController.getEvenementsAvenir);
router.get('/:id', evenementsController.getEvenementById);

// Routes nécessitant une authentification
router.post('/lieu/:lieuId', requireAuth, evenementsController.addEvenement);
router.put('/:id', requireAuth, evenementsController.updateEvenement);
router.delete('/:id', requireAuth, evenementsController.deleteEvenement);
router.patch('/:id/toggle', requireAuth, evenementsController.toggleEvenement);

// Route admin pour tous les événements
router.get('/', evenementsController.getAllEvenements);

module.exports = router; 