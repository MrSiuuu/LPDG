import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fonctions utilitaires pour l'authentification
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Fonctions utilitaires pour le stockage
export const uploadImage = async (file, path) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${path}/${fileName}`

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)

  return { publicUrl, filePath }
}

export const deleteImage = async (filePath) => {
  const { error } = await supabase.storage
    .from('images')
    .remove([filePath])

  return { error }
}

// Fonctions utilitaires pour les articles
export const getArticles = async (filters = {}) => {
  let query = supabase
    .from('articles')
    .select('*')

  if (filters.userId) {
    query = query.eq('user_id', filters.userId)
  }

  if (filters.status) {
    query = query.eq('is_draft', filters.status === 'draft')
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,meta_description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getArticle = async (id) => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

export const createArticle = async (articleData) => {
  const { data, error } = await supabase
    .from('articles')
    .insert([articleData])
    .select()

  return { data, error }
}

export const updateArticle = async (id, articleData) => {
  const { data, error } = await supabase
    .from('articles')
    .update(articleData)
    .eq('id', id)
    .select()

  return { data, error }
}

export const deleteArticle = async (id) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  return { error }
}

// =====================================================
// FONCTIONS POUR LES AVIS
// =====================================================

// Récupérer les avis d'un lieu
export const getAvis = async (lieuId) => {
  const { data, error } = await supabase
    .from('avis')
    .select(`
      *,
      user_profiles:user_id (
        nom,
        prenom
      )
    `)
    .eq('lieu_id', lieuId)
    .order('created_at', { ascending: false })

  return { data: data || [], error }
}

// Ajouter un avis sur un lieu
export const addAvis = async (lieuId, note, commentaire) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Utilisateur non connecté')
  }

  const { data, error } = await supabase
    .from('avis')
    .insert([{
      lieu_id: lieuId,
      user_id: user.id,
      note,
      commentaire
    }])
    .select()
    .single()

  return { data, error }
}

// Modifier un avis
export const updateAvis = async (avisId, note, commentaire) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Utilisateur non connecté')
  }

  const { data, error } = await supabase
    .from('avis')
    .update({ note, commentaire })
    .eq('id', avisId)
    .eq('user_id', user.id) // Sécurité : seul l'utilisateur peut modifier son avis
    .select()
    .single()

  return { data, error }
}

// Supprimer un avis
export const deleteAvis = async (avisId) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Utilisateur non connecté')
  }

  const { error } = await supabase
    .from('avis')
    .delete()
    .eq('id', avisId)
    .eq('user_id', user.id) // Sécurité : seul l'utilisateur peut supprimer son avis

  return { error }
}

// Vérifier si l'utilisateur a déjà laissé un avis sur ce lieu
export const checkUserAvis = async (lieuId) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { hasAvis: false, avis: null }
  }

  const { data, error } = await supabase
    .from('avis')
    .select('*')
    .eq('lieu_id', lieuId)
    .eq('user_id', user.id)
    .single()

  return { hasAvis: !!data, avis: data }
} 