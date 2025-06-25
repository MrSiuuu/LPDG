const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Inscription (tous rôles sauf admin)
router.post('/signup', authController.signup);
// Connexion
router.post('/login', authController.login);

module.exports = router; 