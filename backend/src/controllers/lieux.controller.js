const lieuxService = require('../services/lieux.service');

async function addLieu(req, res) {
  try {
    const userId = req.user.id; // L'ID de l'utilisateur connecté
    const lieuData = req.body;
    
    // Vérifier si l'utilisateur a le droit d'ajouter un lieu
    if (!['admin', 'contributor'].includes(req.user.roles.label)) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const lieu = await lieuxService.addLieu(lieuData, userId);
    res.status(201).json(lieu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateLieu(req, res) {
  try {
    const userId = req.user.id;
    const lieuId = req.params.id;
    const lieuData = req.body;
    
    // Vérifier si l'utilisateur a le droit de modifier un lieu
    if (!['admin', 'contributor'].includes(req.user.roles.label)) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const lieu = await lieuxService.updateLieu(lieuId, lieuData, userId);
    res.json(lieu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllLieux(req, res) {
  try {
    const lieux = await lieuxService.getAllLieux();
    res.json(lieux);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getLieuById(req, res) {
  try {
    const lieu = await lieuxService.getLieuById(req.params.id);
    if (!lieu) {
      return res.status(404).json({ message: 'Lieu non trouvé' });
    }
    res.json(lieu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getLieuxByUser(req, res) {
  try {
    const lieux = await lieuxService.getLieuxByUser(req.user.id);
    res.json(lieux);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getStatsByUser(req, res) {
  try {
    const stats = await lieuxService.getStatsByUser(req.user.id);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function toggleLieuValidation(req, res) {
  try {
    const { lieuId } = req.params;
    const { estValide } = req.body;
    
    // Vérifier si l'utilisateur est admin
    if (req.user.roles.label !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const lieu = await lieuxService.toggleLieuValidation(lieuId, estValide);
    res.json(lieu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addLike(req, res) {
  try {
    console.log('addLike appelé avec:', {
      lieuId: req.params.id,
      user: req.user,
      headers: req.headers.authorization ? 'Présent' : 'Absent'
    });
    
    const like = await lieuxService.addLike(req.params.id, req.user);
    console.log('Like créé avec succès:', like);
    res.status(201).json(like);
  } catch (error) {
    console.error('Erreur dans addLike:', error);
    res.status(400).json({ error: error.message });
  }
}

async function getLikes(req, res) {
  try {
    console.log('getLikes appelé avec lieuId:', req.params.id);
    const count = await lieuxService.getLikes(req.params.id);
    console.log('Nombre de likes récupéré:', count);
    res.json({ count });
  } catch (error) {
    console.error('Erreur dans getLikes:', error);
    res.status(400).json({ error: error.message });
  }
}

async function hasUserLiked(req, res) {
  try {
    console.log('hasUserLiked appelé avec:', {
      lieuId: req.params.id,
      userId: req.user.id
    });
    const hasLiked = await lieuxService.hasUserLiked(req.params.id, req.user.id);
    console.log('Utilisateur a liké:', hasLiked);
    res.json({ hasLiked });
  } catch (error) {
    console.error('Erreur dans hasUserLiked:', error);
    res.status(400).json({ error: error.message });
  }
}

async function getLikedLieux(req, res) {
  try {
    console.log('getLikedLieux appelé avec userId:', req.user.id);
    console.log('User complet:', req.user);
    
    const lieux = await lieuxService.getLikedLieux(req.user.id);
    console.log('Lieux likés récupérés:', lieux);
    res.json(lieux);
  } catch (error) {
    console.error('Erreur dans getLikedLieux:', error);
    res.status(500).json({ message: error.message });
  }
}

// Marquer un lieu comme visité
async function addVisite(req, res) {
  try {
    const result = await lieuxService.addVisite(req.params.id, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Vérifier si l'utilisateur a déjà visité ce lieu
async function hasUserVisited(req, res) {
  try {
    const hasVisited = await lieuxService.hasUserVisited(req.params.id, req.user.id);
    res.json({ hasVisited });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Récupérer tous les lieux visités par l'utilisateur
async function getVisitedLieux(req, res) {
  try {
    const lieux = await lieuxService.getVisitedLieux(req.user.id);
    res.json(lieux);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Supprimer une visite
async function removeVisite(req, res) {
  try {
    const result = await lieuxService.removeVisite(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Ajouter un avis sur un lieu
async function addAvis(req, res) {
  try {
    const { note, commentaire } = req.body;
    if (!note || !commentaire) {
      return res.status(400).json({ error: 'Note et commentaire requis' });
    }
    const avis = await lieuxService.addAvis(req.params.id, req.user.id, note, commentaire);
    res.status(201).json(avis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function searchLieux(req, res) {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Requête de recherche vide.' });
    }
    const results = await lieuxService.searchLieux(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addLieu,
  updateLieu,
  getAllLieux,
  getLieuById,
  getLieuxByUser,
  getStatsByUser,
  toggleLieuValidation,
  addLike,
  getLikes,
  hasUserLiked,
  getLikedLieux,
  addVisite,
  hasUserVisited,
  getVisitedLieux,
  removeVisite,
  addAvis,
  searchLieux
}; 