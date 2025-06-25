const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Routes pour les contacts d'un lieu
router.get('/lieu/:lieuId', contactsController.getContactsByLieu);
router.get('/lieu/:lieuId/principal', contactsController.getContactPrincipal);
router.get('/:id', contactsController.getContactById);

// Routes nécessitant une authentification
router.post('/lieu/:lieuId', requireAuth, contactsController.addContact);
router.put('/:id', requireAuth, contactsController.updateContact);
router.delete('/:id', requireAuth, contactsController.deleteContact);
router.post('/:id/main', requireAuth, contactsController.setMainContact);

module.exports = router; 