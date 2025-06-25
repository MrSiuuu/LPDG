const { supabase } = require('../utils/supabaseClient');

class EvenementsService {
  // Récupérer tous les événements d'un lieu
  async getEvenementsByLieu(lieuId) {
    try {
      const { data, error } = await supabase
        .from('evenements_lieu')
        .select('*')
        .eq('lieu_id', lieuId)
        .eq('est_actif', true)
        .order('date_debut', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des événements: ${error.message}`);
    }
  }

  // Récupérer les événements à venir
  async getEvenementsAvenir(lieuId) {
    try {
      const { data, error } = await supabase
        .from('evenements_lieu')
        .select('*')
        .eq('lieu_id', lieuId)
        .eq('est_actif', true)
        .gte('date_debut', new Date().toISOString())
        .order('date_debut', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des événements à venir: ${error.message}`);
    }
  }

  // Récupérer un événement par ID
  async getEvenementById(evenementId) {
    try {
      const { data, error } = await supabase
        .from('evenements_lieu')
        .select('*')
        .eq('id', evenementId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'événement: ${error.message}`);
    }
  }

  // Ajouter un nouvel événement
  async addEvenement(evenementData, userId) {
    try {
      const { data, error } = await supabase
        .from('evenements_lieu')
        .insert([{
          ...evenementData,
          user_id: userId
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de l'ajout de l'événement: ${error.message}`);
    }
  }

  // Modifier un événement
  async updateEvenement(evenementId, evenementData, userId) {
    try {
      // Vérifier que l'événement existe
      const existingEvenement = await this.getEvenementById(evenementId);
      if (!existingEvenement) {
        throw new Error('Événement non trouvé');
      }

      const { data, error } = await supabase
        .from('evenements_lieu')
        .update({
          ...evenementData,
          updated_at: new Date().toISOString()
        })
        .eq('id', evenementId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la modification de l'événement: ${error.message}`);
    }
  }

  // Supprimer un événement (désactiver)
  async deleteEvenement(evenementId, userId) {
    try {
      // Vérifier que l'événement existe
      const existingEvenement = await this.getEvenementById(evenementId);
      if (!existingEvenement) {
        throw new Error('Événement non trouvé');
      }

      const { error } = await supabase
        .from('evenements_lieu')
        .update({ 
          est_actif: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', evenementId);

      if (error) throw error;
      return { success: true, message: 'Événement supprimé avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'événement: ${error.message}`);
    }
  }

  // Activer/Désactiver un événement
  async toggleEvenement(evenementId, estActif, userId) {
    try {
      const { data, error } = await supabase
        .from('evenements_lieu')
        .update({ 
          est_actif: estActif,
          updated_at: new Date().toISOString()
        })
        .eq('id', evenementId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la modification du statut de l'événement: ${error.message}`);
    }
  }

  // Récupérer tous les événements (pour admin)
  async getAllEvenements() {
    try {
      const { data, error } = await supabase
        .from('evenements_lieu')
        .select('*, lieux(nom, ville)')
        .order('date_debut', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de tous les événements: ${error.message}`);
    }
  }
}

module.exports = new EvenementsService(); 