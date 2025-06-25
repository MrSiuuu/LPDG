const signalementsService = require('../services/signalements.service');

class SignalementsController {
  // Créer un signalement
  async createSignalement(req, res) {
    try {
      const { lieuId } = req.params;
      const { motif } = req.body;
      const userId = req.user.id;

      if (!motif || motif.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Le motif du signalement est requis' 
        });
      }

      // Vérifier si l'utilisateur a déjà signalé ce lieu
      const hasReported = await signalementsService.hasUserReported(lieuId, userId);
      if (!hasReported.success) {
        return res.status(500).json({ 
          success: false, 
          error: 'Erreur lors de la vérification du signalement' 
        });
      }

      if (hasReported.hasReported) {
        return res.status(400).json({ 
          success: false, 
          error: 'Vous avez déjà signalé ce lieu' 
        });
      }

      // Créer le signalement
      const result = await signalementsService.createSignalement(lieuId, userId, motif.trim());
      
      if (!result.success) {
        return res.status(500).json({ 
          success: false, 
          error: result.error 
        });
      }

      res.status(201).json({
        success: true,
        message: 'Signalement créé avec succès',
        data: result.data
      });

    } catch (error) {
      console.error('Erreur dans createSignalement:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Erreur interne du serveur' 
      });
    }
  }

  // Vérifier si l'utilisateur a signalé ce lieu
  async hasUserReported(req, res) {
    try {
      const { lieuId } = req.params;
      const userId = req.user.id;

      const result = await signalementsService.hasUserReported(lieuId, userId);
      
      if (!result.success) {
        return res.status(500).json({ 
          success: false, 
          error: result.error 
        });
      }

      res.json({
        success: true,
        hasReported: result.hasReported
      });

    } catch (error) {
      console.error('Erreur dans hasUserReported:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Erreur interne du serveur' 
      });
    }
  }

  // Récupérer tous les signalements (admin seulement)
  async getAllSignalements(req, res) {
    try {
      // Vérifier que l'utilisateur est admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          error: 'Accès non autorisé' 
        });
      }

      const result = await signalementsService.getAllSignalements();
      
      if (!result.success) {
        return res.status(500).json({ 
          success: false, 
          error: result.error 
        });
      }

      res.json({
        success: true,
        data: result.data
      });

    } catch (error) {
      console.error('Erreur dans getAllSignalements:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Erreur interne du serveur' 
      });
    }
  }

  // Récupérer les signalements d'un lieu spécifique (admin seulement)
  async getSignalementsByLieu(req, res) {
    try {
      const { lieuId } = req.params;

      // Vérifier que l'utilisateur est admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          error: 'Accès non autorisé' 
        });
      }

      const result = await signalementsService.getSignalementsByLieu(lieuId);
      
      if (!result.success) {
        return res.status(500).json({ 
          success: false, 
          error: result.error 
        });
      }

      res.json({
        success: true,
        data: result.data
      });

    } catch (error) {
      console.error('Erreur dans getSignalementsByLieu:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Erreur interne du serveur' 
      });
    }
  }
}

module.exports = new SignalementsController(); 