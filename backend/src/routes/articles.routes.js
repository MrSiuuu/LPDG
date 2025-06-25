const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

// Liste tous les articles
router.get('/', articlesController.getAllArticles);
// Récupérer un article par son ID
router.get('/:id', articlesController.getArticleById);
// Récupérer le nombre de likes d'un article
router.get('/:id/likes', articlesController.getLikes);
// Récupérer les commentaires d'un article
router.get('/:id/comments', articlesController.getComments);
// Créer un article
router.post('/', requireAuth, articlesController.createArticle);
// Modifier un article
router.put('/:id', requireAuth, articlesController.updateArticle);
// Supprimer un article
router.delete('/:id', requireAuth, articlesController.deleteArticle);
// Ajouter un commentaire
router.post('/:id/comments', requireAuth, articlesController.addComment);
// Ajouter un like
router.post('/:id/like', requireAuth, articlesController.addLike);

module.exports = router; 