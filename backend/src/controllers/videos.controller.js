const videosService = require('../services/videos.service');

// Récupérer toutes les vidéos d'un lieu
async function getVideosByLieu(req, res) {
  try {
    const { lieuId } = req.params;
    const videos = await videosService.getVideosByLieu(lieuId);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer une vidéo par ID
async function getVideoById(req, res) {
  try {
    const { id } = req.params;
    const video = await videosService.getVideoById(id);
    if (!video) {
      return res.status(404).json({ message: 'Vidéo non trouvée' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Ajouter une nouvelle vidéo
async function addVideo(req, res) {
  try {
    const { lieuId } = req.params;
    const videoData = { ...req.body, lieu_id: lieuId };
    const userId = req.user.id;

    // Validation des données
    if (!videoData.titre || !videoData.url_video) {
      return res.status(400).json({ message: 'Titre et URL de la vidéo sont requis' });
    }

    const video = await videosService.addVideo(videoData, userId);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Modifier une vidéo
async function updateVideo(req, res) {
  try {
    const { id } = req.params;
    const videoData = req.body;
    const userId = req.user.id;

    const video = await videosService.updateVideo(id, videoData, userId);
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Supprimer une vidéo
async function deleteVideo(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await videosService.deleteVideo(id, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Définir une vidéo comme principale
async function setMainVideo(req, res) {
  try {
    const { id } = req.params;
    const { lieuId } = req.body;
    const userId = req.user.id;

    if (!lieuId) {
      return res.status(400).json({ message: 'ID du lieu requis' });
    }

    const video = await videosService.setMainVideo(id, lieuId, userId);
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getVideosByLieu,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
  setMainVideo
}; 