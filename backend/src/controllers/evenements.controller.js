const evenementsService = require('../services/evenements.service');

// Récupérer tous les événements d'un lieu
async function getEvenementsByLieu(req, res) {
  try {
    const { lieuId } = req.params;
    const evenements = await evenementsService.getEvenementsByLieu(lieuId);
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer les événements à venir d'un lieu
async function getEvenementsAvenir(req, res) {
  try {
    const { lieuId } = req.params;
    const evenements = await evenementsService.getEvenementsAvenir(lieuId);
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer un événement par ID
async function getEvenementById(req, res) {
  try {
    const { id } = req.params;
    const evenement = await evenementsService.getEvenementById(id);
    if (!evenement) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Ajouter un nouvel événement
async function addEvenement(req, res) {
  try {
    const { lieuId } = req.params;
    const evenementData = { ...req.body, lieu_id: lieuId };
    const userId = req.user.id;

    // Validation des données
    if (!evenementData.titre || !evenementData.date_debut) {
      return res.status(400).json({ message: 'Titre et date de début sont requis' });
    }

    const evenement = await evenementsService.addEvenement(evenementData, userId);
    res.status(201).json(evenement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Modifier un événement
async function updateEvenement(req, res) {
  try {
    const { id } = req.params;
    const evenementData = req.body;
    const userId = req.user.id;

    const evenement = await evenementsService.updateEvenement(id, evenementData, userId);
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Supprimer un événement
async function deleteEvenement(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await evenementsService.deleteEvenement(id, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Activer/Désactiver un événement
async function toggleEvenement(req, res) {
  try {
    const { id } = req.params;
    const { est_actif } = req.body;
    const userId = req.user.id;

    if (typeof est_actif !== 'boolean') {
      return res.status(400).json({ message: 'est_actif doit être un booléen' });
    }

    const evenement = await evenementsService.toggleEvenement(id, est_actif, userId);
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Récupérer tous les événements (pour admin)
async function getAllEvenements(req, res) {
  try {
    // Vérifier si l'utilisateur est admin
    if (req.user.roles.label !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const evenements = await evenementsService.getAllEvenements();
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getEvenementsByLieu,
  getEvenementsAvenir,
  getEvenementById,
  addEvenement,
  updateEvenement,
  deleteEvenement,
  toggleEvenement,
  getAllEvenements
}; 