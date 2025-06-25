const articlesService = require('../services/articles.service');

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articlesService.getAllArticles(req.query);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const article = await articlesService.createArticle(req.body, req.user);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await articlesService.updateArticle(req.params.id, req.body, req.user);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await articlesService.deleteArticle(req.params.id, req.user);
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await articlesService.addComment(req.params.id, req.body, req.user);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addLike = async (req, res) => {
  try {
    const like = await articlesService.addLike(req.params.id, req.user);
    res.status(201).json(like);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLikes = async (req, res) => {
  try {
    const count = await articlesService.getLikes(req.params.id)
    res.json({ count })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getComments = async (req, res) => {
  try {
    const comments = await articlesService.getComments(req.params.id)
    res.json(comments)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getArticleById = async (req, res) => {
  try {
    const article = await articlesService.getArticleById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article non trouvé' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 