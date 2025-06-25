const { supabase } = require('../utils/supabaseClient');

class VideosService {
  // Récupérer toutes les vidéos d'un lieu
  async getVideosByLieu(lieuId) {
    try {
      const { data, error } = await supabase
        .from('videos_lieu')
        .select('*')
        .eq('lieu_id', lieuId)
        .order('est_principale', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des vidéos: ${error.message}`);
    }
  }

  // Récupérer une vidéo par ID
  async getVideoById(videoId) {
    try {
      const { data, error } = await supabase
        .from('videos_lieu')
        .select('*')
        .eq('id', videoId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la vidéo: ${error.message}`);
    }
  }

  // Ajouter une nouvelle vidéo
  async addVideo(videoData, userId) {
    try {
      const { data, error } = await supabase
        .from('videos_lieu')
        .insert([{
          ...videoData,
          user_id: userId
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de l'ajout de la vidéo: ${error.message}`);
    }
  }

  // Modifier une vidéo
  async updateVideo(videoId, videoData, userId) {
    try {
      // Vérifier que l'utilisateur est propriétaire de la vidéo ou admin
      const existingVideo = await this.getVideoById(videoId);
      if (!existingVideo) {
        throw new Error('Vidéo non trouvée');
      }

      const { data, error } = await supabase
        .from('videos_lieu')
        .update({
          ...videoData,
          updated_at: new Date().toISOString()
        })
        .eq('id', videoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la modification de la vidéo: ${error.message}`);
    }
  }

  // Supprimer une vidéo
  async deleteVideo(videoId, userId) {
    try {
      // Vérifier que l'utilisateur est propriétaire de la vidéo ou admin
      const existingVideo = await this.getVideoById(videoId);
      if (!existingVideo) {
        throw new Error('Vidéo non trouvée');
      }

      const { error } = await supabase
        .from('videos_lieu')
        .delete()
        .eq('id', videoId);

      if (error) throw error;
      return { success: true, message: 'Vidéo supprimée avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la vidéo: ${error.message}`);
    }
  }

  // Définir une vidéo comme principale
  async setMainVideo(videoId, lieuId, userId) {
    try {
      // D'abord, retirer le statut principal de toutes les vidéos du lieu
      await supabase
        .from('videos_lieu')
        .update({ est_principale: false })
        .eq('lieu_id', lieuId);

      // Ensuite, définir la vidéo sélectionnée comme principale
      const { data, error } = await supabase
        .from('videos_lieu')
        .update({ 
          est_principale: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', videoId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Erreur lors de la définition de la vidéo principale: ${error.message}`);
    }
  }
}

module.exports = new VideosService(); 