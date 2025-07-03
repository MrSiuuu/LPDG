const { supabase } = require('../utils/supabaseClient');

async function addLieu(lieuData, userId) {
  // Extraire les données des entités liées
  const { videos, evenements, contacts, ...lieuInfo } = lieuData;

  // Créer le lieu principal
  const { data: lieu, error } = await supabase
    .from('lieux')
    .insert({
      ...lieuInfo,
      user_id: userId,
      est_valide: false // Par défaut, le lieu n'est pas validé
    })
    .select()
    .single();

  if (error) throw error;

  // Ajouter les vidéos si présentes
  if (videos && videos.length > 0) {
    const videosWithLieuId = videos.map(video => ({
      ...video,
      lieu_id: lieu.id,
      user_id: userId
    }));
    
    const { error: videosError } = await supabase
      .from('videos_lieu')
      .insert(videosWithLieuId);
    
    if (videosError) throw videosError;
  }

  // Ajouter les événements si présents
  if (evenements && evenements.length > 0) {
    const evenementsWithLieuId = evenements.map(evenement => ({
      ...evenement,
      lieu_id: lieu.id,
      user_id: userId
    }));
    
    const { error: evenementsError } = await supabase
      .from('evenements_lieu')
      .insert(evenementsWithLieuId);
    
    if (evenementsError) throw evenementsError;
  }

  // Ajouter les contacts si présents
  if (contacts && contacts.length > 0) {
    const contactsWithLieuId = contacts.map(contact => ({
      ...contact,
      lieu_id: lieu.id,
      user_id: userId
    }));
    
    const { error: contactsError } = await supabase
      .from('contacts_lieu')
      .insert(contactsWithLieuId);
    
    if (contactsError) throw contactsError;
  }

  return lieu;
}

async function updateLieu(lieuId, lieuData, userId) {
  // Extraire les données des entités liées
  const { videos, evenements, contacts, ...lieuInfo } = lieuData;

  // Mettre à jour le lieu principal
  const { data: lieu, error } = await supabase
    .from('lieux')
    .update(lieuInfo)
    .eq('id', lieuId)
    .select()
    .single();

  if (error) throw error;

  // Supprimer les anciennes vidéos et en ajouter de nouvelles
  if (videos !== undefined) {
    await supabase
      .from('videos_lieu')
      .delete()
      .eq('lieu_id', lieuId);

    if (videos.length > 0) {
      const videosWithLieuId = videos.map(video => ({
        ...video,
        lieu_id: lieuId,
        user_id: userId
      }));
      
      const { error: videosError } = await supabase
        .from('videos_lieu')
        .insert(videosWithLieuId);
      
      if (videosError) throw videosError;
    }
  }

  // Supprimer les anciens événements et en ajouter de nouveaux
  if (evenements !== undefined) {
    await supabase
      .from('evenements_lieu')
      .delete()
      .eq('lieu_id', lieuId);

    if (evenements.length > 0) {
      const evenementsWithLieuId = evenements.map(evenement => ({
        ...evenement,
        lieu_id: lieuId,
        user_id: userId
      }));
      
      const { error: evenementsError } = await supabase
        .from('evenements_lieu')
        .insert(evenementsWithLieuId);
      
      if (evenementsError) throw evenementsError;
    }
  }

  // Supprimer les anciens contacts et en ajouter de nouveaux
  if (contacts !== undefined) {
    await supabase
      .from('contacts_lieu')
      .delete()
      .eq('lieu_id', lieuId);

    if (contacts.length > 0) {
      const contactsWithLieuId = contacts.map(contact => ({
        ...contact,
        lieu_id: lieuId,
        user_id: userId
      }));
      
      const { error: contactsError } = await supabase
        .from('contacts_lieu')
        .insert(contactsWithLieuId);
      
      if (contactsError) throw contactsError;
    }
  }

  return lieu;
}

async function getAllLieux() {
  const { data, error } = await supabase
    .from('lieux')
    .select(`
      *,
      user_profiles (nom),
      photos_lieu (url)
    `)
    .eq('est_valide', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}



async function getLieuById(id) {
  // Récupérer le lieu principal
  const { data: lieu, error } = await supabase
    .from('lieux')
    .select(`
      *,
      user_profiles (nom),
      photos_lieu (url),
      avis (*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;

  // Récupérer les vidéos associées
  const { data: videos, error: videosError } = await supabase
    .from('videos_lieu')
    .select('*')
    .eq('lieu_id', id)
    .order('est_principale', { ascending: false })
    .order('created_at', { ascending: false });

  if (videosError) throw videosError;

  // Récupérer les événements associés
  const { data: evenements, error: evenementsError } = await supabase
    .from('evenements_lieu')
    .select('*')
    .eq('lieu_id', id)
    .eq('est_actif', true)
    .order('date_debut', { ascending: true });

  if (evenementsError) throw evenementsError;

  // Récupérer les contacts associés
  const { data: contacts, error: contactsError } = await supabase
    .from('contacts_lieu')
    .select('*')
    .eq('lieu_id', id)
    .order('est_principal', { ascending: false })
    .order('nom_contact', { ascending: true });

  if (contactsError) throw contactsError;

  // Combiner toutes les données
  return {
    ...lieu,
    videos: videos || [],
    evenements: evenements || [],
    contacts: contacts || [],
    reseaux_sociaux: lieu.reseaux_sociaux ? 
      (typeof lieu.reseaux_sociaux === 'string' ? 
        JSON.parse(lieu.reseaux_sociaux) : lieu.reseaux_sociaux) : 
      {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        youtube: '',
        website: ''
      }
  };
}

async function getLieuxByUser(userId) {
  // Récupérer les lieux de base
  const { data: lieux, error } = await supabase
    .from('lieux')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Pour chaque lieu, récupérer les relations
  const lieuxComplets = await Promise.all(
    lieux.map(async (lieu) => {
      // Récupérer les vidéos
      const { data: videos } = await supabase
        .from('videos_lieu')
        .select('*')
        .eq('lieu_id', lieu.id)
        .order('est_principale', { ascending: false })
        .order('created_at', { ascending: false });

      // Récupérer les événements
      const { data: evenements } = await supabase
        .from('evenements_lieu')
        .select('*')
        .eq('lieu_id', lieu.id)
        .order('date_debut', { ascending: true });

      // Récupérer les contacts
      const { data: contacts } = await supabase
        .from('contacts_lieu')
        .select('*')
        .eq('lieu_id', lieu.id)
        .order('est_principal', { ascending: false })
        .order('nom_contact', { ascending: true });

      // Retourner le lieu avec toutes ses relations
      return {
        ...lieu,
        videos: videos || [],
        evenements: evenements || [],
        contacts: contacts || [],
        reseaux_sociaux: lieu.reseaux_sociaux ? 
          (typeof lieu.reseaux_sociaux === 'string' ? 
            JSON.parse(lieu.reseaux_sociaux) : lieu.reseaux_sociaux) : 
          {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: '',
            youtube: '',
            website: ''
          }
      };
    })
  );
  
  return lieuxComplets;
}

async function getLikedLieux(userId) {
  console.log('getLikedLieux service appelé avec userId:', userId);
  
  // D'abord, récupérer les IDs des lieux likés
  const { data: likesData, error: likesError } = await supabase
    .from('likes_lieu')
    .select('lieu_id')
    .eq('user_id', userId);
  
  if (likesError) {
    console.error('Erreur lors de la récupération des likes:', likesError);
    throw likesError;
  }
  
  console.log('Likes trouvés:', likesData);
  
  if (!likesData || likesData.length === 0) {
    return [];
  }
  
  // Extraire les IDs des lieux
  const lieuIds = likesData.map(like => like.lieu_id);
  console.log('IDs des lieux à récupérer:', lieuIds);
  
  // Récupérer les lieux correspondants
  const { data: lieuxData, error: lieuxError } = await supabase
    .from('lieux')
    .select('*')
    .in('id', lieuIds)
    .eq('est_valide', true)
    .order('created_at', { ascending: false });
  
  if (lieuxError) {
    console.error('Erreur lors de la récupération des lieux:', lieuxError);
    throw lieuxError;
  }
  
  console.log('Lieux récupérés:', lieuxData);
  return lieuxData || [];
}

async function getStatsByUser(userId) {
  const { count: totalLieux, error: totalError } = await supabase
    .from('lieux')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (totalError) throw totalError;

  const { count: lieuxValides, error: validesError } = await supabase
    .from('lieux')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('est_valide', true);

  if (validesError) throw validesError;

  return {
    totalLieux: totalLieux || 0,
    lieuxValides: lieuxValides || 0,
    lieuxEnAttente: (totalLieux || 0) - (lieuxValides || 0)
  };
}

async function toggleLieuValidation(lieuId, estValide) {
  const { data, error } = await supabase
    .from('lieux')
    .update({ est_valide: estValide })
    .eq('id', lieuId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function addLike(lieuId, user) {
  // Vérifier si l'utilisateur a déjà liké ce lieu
  const { data: existingLike, error: checkError } = await supabase
    .from('likes_lieu')
    .select('*')
    .eq('lieu_id', lieuId)
    .eq('user_id', user.id)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError;
  }

  if (existingLike) {
    // L'utilisateur a déjà liké, on supprime le like (unlike)
    const { error: deleteError } = await supabase
      .from('likes_lieu')
      .delete()
      .eq('lieu_id', lieuId)
      .eq('user_id', user.id);
    
    if (deleteError) throw deleteError;
    return { action: 'unliked', like: null };
  } else {
    // L'utilisateur n'a pas encore liké, on ajoute le like
    const { data, error } = await supabase
      .from('likes_lieu')
      .insert([{ lieu_id: lieuId, user_id: user.id }])
      .select()
      .single();
    
    if (error) throw error;
    return { action: 'liked', like: data };
  }
}

async function getLikes(lieuId) {
  const { count, error } = await supabase
    .from('likes_lieu')
    .select('*', { count: 'exact', head: true })
    .eq('lieu_id', lieuId);
  
  if (error) throw error;
  return count || 0;
}

async function hasUserLiked(lieuId, userId) {
  const { data, error } = await supabase
    .from('likes_lieu')
    .select('*')
    .eq('lieu_id', lieuId)
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    throw error;
  }
  
  return !!data;
}

// --- VISITES ---

// Ajouter une visite (ou ignorer si déjà présente)
async function addVisite(lieuId, userId) {
  // Vérifier si déjà visité
  const { data: existing, error: checkError } = await supabase
    .from('lieux_visites')
    .select('*')
    .eq('lieu_id', lieuId)
    .eq('user_id', userId)
    .single();
  if (checkError && checkError.code !== 'PGRST116') throw checkError;
  if (existing) {
    // Déjà visité, on ne fait rien
    return { action: 'already_visited' };
  }
  // Ajouter la visite
  const { data, error } = await supabase
    .from('lieux_visites')
    .insert([{ lieu_id: lieuId, user_id: userId }])
    .select()
    .single();
  if (error) throw error;
  return { action: 'visited', visite: data };
}

// Vérifier si l'utilisateur a déjà visité ce lieu
async function hasUserVisited(lieuId, userId) {
  const { data, error } = await supabase
    .from('lieux_visites')
    .select('*')
    .eq('lieu_id', lieuId)
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}

// Récupérer tous les lieux visités par un utilisateur
async function getVisitedLieux(userId) {
  // Récupérer les IDs des lieux visités
  const { data: visitesData, error: visitesError } = await supabase
    .from('lieux_visites')
    .select('lieu_id')
    .eq('user_id', userId);
  if (visitesError) throw visitesError;
  if (!visitesData || visitesData.length === 0) return [];
  const lieuIds = visitesData.map(v => v.lieu_id);
  // Récupérer les lieux
  const { data: lieuxData, error: lieuxError } = await supabase
    .from('lieux')
    .select('*')
    .in('id', lieuIds)
    .eq('est_valide', true)
    .order('created_at', { ascending: false });
  if (lieuxError) throw lieuxError;
  return lieuxData || [];
}

// Supprimer une visite
async function removeVisite(lieuId, userId) {
  const { error } = await supabase
    .from('lieux_visites')
    .delete()
    .eq('lieu_id', lieuId)
    .eq('user_id', userId);
  if (error) throw error;
  return { action: 'removed' };
}

// Ajouter un avis sur un lieu
async function addAvis(lieuId, userId, note, commentaire) {
  const { data, error } = await supabase
    .from('avis')
    .insert([{ lieu_id: lieuId, user_id: userId, note, commentaire }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function searchLieux(query) {
  // Recherche insensible à la casse sur plusieurs champs
  const { data, error } = await supabase
    .from('lieux')
    .select('*')
    .or(`nom.ilike.%${query}%,ville.ilike.%${query}%,type.ilike.%${query}%,description.ilike.%${query}%,adresse.ilike.%${query}%`)
    .eq('est_valide', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

module.exports = {
  addLieu,
  updateLieu,
  getAllLieux,
  getLieuById,
  getLieuxByUser,
  getLikedLieux,
  getStatsByUser,
  toggleLieuValidation,
  addLike,
  getLikes,
  hasUserLiked,
  addVisite,
  hasUserVisited,
  getVisitedLieux,
  removeVisite,
  addAvis,
  searchLieux
}; 