const { supabase } = require('../utils/supabaseClient');

class SignalementsService {
  // Créer un signalement
  async createSignalement(lieuId, userId, motif) {
    try {
      const { data, error } = await supabase
        .from('signalements')
        .insert({
          lieu_id: lieuId,
          user_id: userId,
          motif: motif
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la création du signalement:', error);
      return { success: false, error: error.message };
    }
  }

  // Vérifier si un utilisateur a déjà signalé ce lieu
  async hasUserReported(lieuId, userId) {
    try {
      const { data, error } = await supabase
        .from('signalements')
        .select('id')
        .eq('lieu_id', lieuId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, hasReported: !!data };
    } catch (error) {
      console.error('Erreur lors de la vérification du signalement:', error);
      return { success: false, error: error.message };
    }
  }

  // Récupérer tous les signalements (pour les admins)
  async getAllSignalements() {
    try {
      const { data, error } = await supabase
        .from('signalements')
        .select(`
          *,
          lieux(nom, ville, type),
          user_profiles(nom, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la récupération des signalements:', error);
      return { success: false, error: error.message };
    }
  }

  // Récupérer les signalements d'un lieu spécifique
  async getSignalementsByLieu(lieuId) {
    try {
      const { data, error } = await supabase
        .from('signalements')
        .select(`
          *,
          user_profiles(nom, email)
        `)
        .eq('lieu_id', lieuId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la récupération des signalements du lieu:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new SignalementsService(); 