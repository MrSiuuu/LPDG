<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    
    <div class="pt-20 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header de recherche -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Résultats de recherche
              </h1>
              <p class="text-gray-600 mt-1">
                {{ totalResults }} lieu{{ totalResults > 1 ? 'x' : '' }} trouvé{{ totalResults > 1 ? 's' : '' }} pour "{{ searchQuery }}"
              </p>
            </div>
            <router-link 
              to="/" 
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'accueil
            </router-link>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>

        <!-- Aucun résultat -->
        <div v-else-if="lieux.length === 0" class="bg-white rounded-lg shadow-sm p-12 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun lieu trouvé</h3>
          <p class="text-gray-600 mb-6">
            Aucun lieu ne correspond à votre recherche "{{ searchQuery }}"
          </p>
          <div class="space-y-2">
            <p class="text-sm text-gray-500">Suggestions :</p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Vérifiez l'orthographe des mots-clés</li>
              <li>• Essayez des mots-clés plus généraux</li>
              <li>• Essayez moins de mots-clés</li>
            </ul>
          </div>
        </div>

        <!-- Résultats -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="lieu in lieux" 
            :key="lieu.id" 
            class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <!-- Image -->
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img 
                v-if="lieu.image_principale" 
                :src="lieu.image_principale" 
                :alt="lieu.nom"
                class="w-full h-48 object-cover"
              />
              <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-6">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
                  {{ lieu.nom }}
                </h3>
                <span class="ml-2 px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {{ lieu.type }}
                </span>
              </div>
              
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ lieu.description }}
              </p>
              
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ lieu.ville }}
              </div>

              <!-- Actions -->
              <div class="flex space-x-2">
                <router-link
                  :to="`/lieu/${lieu.id}`"
                  class="flex-1 bg-indigo-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-600 transition-colors duration-200 text-center text-sm"
                >
                  Voir détails
                </router-link>
                <button 
                  @click.stop="toggleVisite(lieu.id)"
                  class="bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-200 text-sm"
                  :class="{ 'bg-green-200 text-green-800': lieu.hasVisited }"
                >
                  {{ lieu.hasVisited ? '✓ Visité' : 'Visiter' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
import axios from 'axios'
import Navbar from '../components/Navbar.vue'

const route = useRoute()
const lieux = ref([])
const loading = ref(true)
const totalResults = ref(0)

const searchQuery = computed(() => route.query.q || '')

// Fonction pour récupérer les lieux avec recherche
async function fetchLieux() {
  loading.value = true
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    
    const response = await axios.get(`/api/lieux/search?query=${encodeURIComponent(searchQuery.value)}`, { headers })
    lieux.value = response.data
    totalResults.value = response.data.length
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
    lieux.value = []
    totalResults.value = 0
  } finally {
    loading.value = false
  }
}

// Fonction pour basculer le statut "visité"
const toggleVisite = async (lieuId) => {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    
    if (!token) {
      alert('Vous devez être connecté pour marquer un lieu comme visité')
      return
    }

    const lieu = lieux.value.find(l => l.id === lieuId)
    if (lieu.hasVisited) {
      await axios.delete(`/api/lieux/${lieuId}/visites`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      lieu.hasVisited = false
    } else {
      await axios.post(`/api/lieux/${lieuId}/visites`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      lieu.hasVisited = true
    }
  } catch (error) {
    console.error('Erreur lors du toggle visite:', error)
  }
}

onMounted(() => {
  if (searchQuery.value) {
    fetchLieux()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 