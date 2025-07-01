import axios from 'axios'

// Configuration de base pour axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  async (config) => {
    try {
      // Récupérer le token depuis Supabase
      const { data: { session } } = await import('../supabase').then(m => m.supabase.auth.getSession())
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du token:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ne pas rediriger automatiquement sur les erreurs 401
    // Laisser chaque composant gérer ses propres erreurs d'authentification
    console.warn('Erreur API:', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

export default api 