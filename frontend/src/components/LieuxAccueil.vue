<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <h2 class="text-3xl font-bold mb-8 text-gray-800 text-center">Lieux touristiques</h2>
    
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    
    <div v-else-if="lieuxFiltres.length === 0" class="text-center text-gray-500 py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
      <p class="text-lg">Aucun lieu trouvé.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="lieu in lieuxFiltres"
        :key="lieu.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <!-- Image avec badges -->
        <div class="relative">
          <img 
            :src="lieu.image_principale || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMC45MTMgMTUwIDIzNy41IDEzMy40MTMgMjM3LjUgMTEyLjVDMjM3LjUgOTEuNTg3IDIyMC45MTMgNzUgMjAwIDc1QzE3OS4wODcgNzUgMTYyLjUgOTEuNTg3IDE2Mi41IDExMi41QzE2Mi41IDEzMy40MTMgMTc5LjA4NyAxNTAgMjAwIDE1MFoiIGZpbGw9IiNEMTQ3RjAiLz4KPHN2ZyB4PSIxNzUiIHk9IjEyNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo='"
            :alt="lieu.nom"
            class="w-full h-64 object-cover"
          />
          
          <!-- Badge de type -->
          <span class="absolute top-2 left-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
            {{ lieu.type }}
          </span>
          
          <!-- Badge d'accessibilité -->
          <span v-if="lieu.accessible_mobilite_reduite" class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ♿ PMR
          </span>
          
          <!-- Bouton like -->
          <button 
            @click.stop="toggleLike(lieu.id)"
            class="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            :class="{ 'text-red-500': lieu.hasLiked, 'text-gray-400': !lieu.hasLiked }"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
        
        <!-- Contenu de la carte -->
        <div class="p-4">
          <!-- Titre et ville -->
          <div class="flex justify-between items-start mb-2">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-800 mb-1 line-clamp-1">{{ lieu.nom }}</h3>
              <p class="text-sm text-gray-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ lieu.ville }}
              </p>
            </div>
          </div>
          
          <!-- Prix -->
          <div v-if="lieu.prix" class="py-2">
            <p class="text-lg font-bold text-green-600">{{ lieu.prix }} €</p>
            <p class="text-sm text-gray-500">Prix approximatif</p>
          </div>
          
          <!-- Note moyenne -->
          <div class="flex items-center mb-2">
            <div class="flex text-yellow-400">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="{ 'text-gray-300': i > lieu.note_moyenne }" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="text-gray-600 text-sm ml-2">({{ lieu.note_moyenne || 0 }}/5)</span>
          </div>
          
          <!-- Description -->
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ lieu.description }}</p>
          
          <!-- Informations supplémentaires -->
          <div class="flex items-center justify-between mb-4 text-xs text-gray-500">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Ouvert</span>
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              <span>{{ lieu.adresse ? lieu.adresse.substring(0, 20) + '...' : 'Adresse non disponible' }}</span>
            </div>
          </div>
          
          <!-- Boutons d'action -->
          <div class="flex space-x-2">
            <router-link
              :to="`/lieu/${lieu.id}`"
              class="flex-1 bg-indigo-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-indigo-600 transition-colors duration-200 text-center"
            >
              Voir détails
            </router-link>
            <button 
              @click.stop="toggleVisite(lieu.id)"
              class="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200"
              :class="{ 'bg-green-200 text-green-800': lieu.hasVisited }"
            >
              {{ lieu.hasVisited ? '✓ Visité' : 'Visiter' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { supabase } from '../supabase'
import axios from 'axios'

const props = defineProps({
  search: {
    type: String,
    default: ''
  }
})

const lieux = ref([])
const loading = ref(true)

const lieuxFiltres = computed(() => {
  if (!props.search || !props.search.trim()) return lieux.value
  const q = props.search.trim().toLowerCase()
  return lieux.value.filter(lieu =>
    (lieu.nom && lieu.nom.toLowerCase().includes(q)) ||
    (lieu.ville && lieu.ville.toLowerCase().includes(q)) ||
    (lieu.type && lieu.type.toLowerCase().includes(q)) ||
    (lieu.description && lieu.description.toLowerCase().includes(q)) ||
    (lieu.adresse && lieu.adresse.toLowerCase().includes(q))
  )
})

// Fonction pour récupérer les lieux avec les données enrichies
async function fetchLieux() {
  loading.value = true
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const response = await axios.get('/api/lieux', { headers })
    const lieuxData = response.data

    // Enrichir les données avec les likes et visites
    const enrichedLieux = await Promise.all(
      lieuxData.map(async (lieu) => {
        try {
          // Vérifier si l'utilisateur a liké ce lieu
          const hasLiked = await checkIfLiked(lieu.id)
          // Vérifier si l'utilisateur a visité ce lieu
          const hasVisited = await checkIfVisited(lieu.id)
          
          return {
            ...lieu,
            hasLiked,
            hasVisited,
            note_moyenne: lieu.note_moyenne || 0
          }
        } catch (error) {
          console.error('Erreur lors de l\'enrichissement des données:', error)
          return {
            ...lieu,
            hasLiked: false,
            hasVisited: false,
            note_moyenne: lieu.note_moyenne || 0
          }
        }
      })
    )

    lieux.value = enrichedLieux
  } catch (error) {
    console.error('Erreur lors du chargement des lieux:', error)
    lieux.value = []
  } finally {
    loading.value = false
  }
}

// Vérifier si l'utilisateur a liké un lieu
async function checkIfLiked(lieuId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const response = await axios.get(`/api/lieux/${lieuId}/has-liked`, { headers })
    return response.data.hasLiked
  } catch (error) {
    return false
  }
}

// Vérifier si l'utilisateur a visité un lieu
async function checkIfVisited(lieuId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const response = await axios.get(`/api/lieux/${lieuId}/has-visited`, { headers })
    return response.data.hasVisited
  } catch (error) {
    return false
  }
}

// Toggle like
async function toggleLike(lieuId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      // Rediriger vers la page de connexion
      window.location.href = '/login'
      return
    }

    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    await axios.post(`/api/lieux/${lieuId}/like`, {}, { headers })
    
    // Mettre à jour l'état local
    const lieu = lieux.value.find(l => l.id === lieuId)
    if (lieu) {
      lieu.hasLiked = !lieu.hasLiked
    }
  } catch (error) {
    console.error('Erreur lors du like:', error)
  }
}

// Toggle visite
async function toggleVisite(lieuId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      // Rediriger vers la page de connexion
      window.location.href = '/login'
      return
    }

    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const lieu = lieux.value.find(l => l.id === lieuId)
    if (lieu.hasVisited) {
      await axios.delete(`/api/lieux/${lieuId}/visite`, { headers })
    } else {
      await axios.post(`/api/lieux/${lieuId}/visite`, {}, { headers })
    }
    
    // Mettre à jour l'état local
    lieu.hasVisited = !lieu.hasVisited
  } catch (error) {
    console.error('Erreur lors de la visite:', error)
  }
}

onMounted(fetchLieux)
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 