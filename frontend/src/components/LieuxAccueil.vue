<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <!-- Header avec titre et bouton -->
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Lieux touristiques</h2>
      <router-link 
        to="/lieux" 
        class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Voir tous les lieux
      </router-link>
    </div>
    
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
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
          <span v-if="lieu.accessible_mobilite_reduite" class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 21H5V3H13V9H19V21Z"/>
            </svg>
            PMR
          </span>
          
          <!-- Bouton like -->
          <button 
            @click.stop="toggleLike(lieu.id)"
            class="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            :class="{ 'text-red-500': lieu.hasLiked, 'text-gray-400': !lieu.hasLiked }"
          >
            <HeartFilledIcon v-if="lieu.hasLiked" class="w-5 h-5" />
            <HeartIcon v-else class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Contenu de la carte -->
        <div class="p-4">
          <!-- Titre et ville -->
          <div class="flex justify-between items-start mb-2">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">{{ lieu.nom }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <MapPinIcon class="w-4 h-4 mr-1" />
                {{ lieu.ville }}
              </p>
            </div>
          </div>
          
          <!-- Prix - COMMENTÉ TEMPORAIREMENT -->
          <!-- <div v-if="lieu.prix" class="py-2">
            <p class="text-lg font-bold text-green-600 dark:text-green-400">{{ lieu.prix }} GNF</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Prix approximatif</p>
          </div> -->
          
          <!-- Note moyenne - COMMENTÉ TEMPORAIREMENT -->
          <!-- <div class="flex items-center mb-2">
            <div class="flex text-yellow-400">
              <StarSolidIcon v-for="i in 5" :key="i" class="w-4 h-4" :class="{ 'text-gray-300': i > lieu.note_moyenne }" />
            </div>
            <span class="text-gray-600 dark:text-gray-300 text-sm ml-2">({{ lieu.note_moyenne || 0 }}/5)</span>
          </div> -->
          
          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{{ resumeDescription(lieu.description) }}</p>
          
          <!-- Informations supplémentaires -->
          <div class="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
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
              class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
              :class="{ 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100': lieu.hasVisited }"
            >
              <CheckSolidIcon v-if="lieu.hasVisited" class="w-4 h-4" />
              <CheckIcon v-else class="w-4 h-4" />
              {{ lieu.hasVisited ? 'Visité' : 'Visiter' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal d'invitation à la connexion -->
    <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Connexion requise</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Connectez-vous pour interagir avec les lieux (likes, visites)
          </p>
          <div class="flex gap-3 justify-center">
            <button 
              @click="goToLogin" 
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Se connecter
            </button>
            <button 
              @click="goToRegister" 
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              S'inscrire
            </button>
            <button 
              @click="showLoginModal = false" 
              class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import api from '../utils/api'
import { 
  HeartIcon, 
  MapPinIcon,
  ClockIcon,
  CheckIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import { 
  HeartIcon as HeartFilledIcon,
  CheckIcon as CheckSolidIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/vue/24/solid'

const router = useRouter()

const props = defineProps({
  search: {
    type: String,
    default: ''
  }
})

const lieux = ref([])
const loading = ref(true)
const showLoginModal = ref(false)

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

function extractTextFromDescription(desc) {
  if (!desc) return ''
  try {
    // Si c'est du JSON (Delta Quill)
    const delta = JSON.parse(desc)
    if (delta && delta.ops) {
      return delta.ops.map(op => typeof op.insert === 'string' ? op.insert : '').join('')
    }
  } catch (e) {
    // Sinon, c'est peut-être du HTML
    const div = document.createElement('div')
    div.innerHTML = desc
    return div.textContent || div.innerText || ''
  }
  return desc
}

function resumeDescription(desc) {
  const txt = extractTextFromDescription(desc).replace(/\s+/g, ' ').trim()
  return txt.length > 90 ? txt.substring(0, 90) + '...' : txt
}

// Fonction pour récupérer les lieux avec les données enrichies
async function fetchLieux() {
  loading.value = true
  try {
    // Récupérer tous les lieux (y compris les restaurants) depuis Supabase
    console.log('Chargement des lieux depuis Supabase...')
    
    const { data: lieuxData, error } = await supabase
      .from('lieux')
      .select(`
        *,
        user_profiles (nom),
        photos_lieu (url),
        restaurants (
          type_cuisine,
          services,
          site_web,
          whatsapp,
          facebook,
          instagram
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur lors du chargement des lieux:', error)
      lieux.value = []
      return
    }

    console.log('Lieux récupérés:', lieuxData)
    
    // Filtrer les lieux validés côté client pour le moment
    const lieuxValides = lieuxData.filter(lieu => lieu.est_valide === true)
    console.log('Lieux validés:', lieuxValides)

    // Enrichir les données avec les likes et visites
    const enrichedLieux = await Promise.all(
      lieuxValides.map(async (lieu) => {
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
    console.log('Lieux enrichis:', lieux.value)
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

    const { data, error } = await supabase
      .from('likes_lieu')
      .select('*')
      .eq('lieu_id', lieuId)
      .eq('user_id', user.id)
    
    if (error) {
      console.error('Erreur lors de la vérification du like:', error)
      return false
    }

    return data && data.length > 0
  } catch (error) {
    console.error('Erreur lors de la vérification du like:', error)
    return false
  }
}

// Vérifier si l'utilisateur a visité un lieu
async function checkIfVisited(lieuId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data, error } = await supabase
      .from('lieux_visites')
      .select('*')
      .eq('lieu_id', lieuId)
      .eq('user_id', user.id)
    
    if (error) {
      console.error('Erreur lors de la vérification de la visite:', error)
      return false
    }

    return data && data.length > 0
  } catch (error) {
    console.error('Erreur lors de la vérification de la visite:', error)
    return false
  }
}

// Toggle like
async function toggleLike(lieuId) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      showLoginModal.value = true
      return
    }

    // Trouver le lieu dans la liste
    const lieuIndex = lieux.value.findIndex(l => l.id === lieuId)
    if (lieuIndex === -1) return

    if (lieux.value[lieuIndex].hasLiked) {
      // Supprimer le like
      const { error: likesError } = await supabase
        .from('likes_lieu')
        .delete()
        .eq('lieu_id', lieuId)
        .eq('user_id', user.id)
      
      if (!likesError) {
        lieux.value[lieuIndex].hasLiked = false
      }
    } else {
      // Ajouter le like
      const { error: likesError } = await supabase
        .from('likes_lieu')
        .insert([
          {
            lieu_id: lieuId,
            user_id: user.id
          }
        ])
      
      if (!likesError) {
        lieux.value[lieuIndex].hasLiked = true
      }
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
      showLoginModal.value = true
      return
    }

    // Trouver le lieu dans la liste
    const lieuIndex = lieux.value.findIndex(l => l.id === lieuId)
    if (lieuIndex === -1) return

    if (lieux.value[lieuIndex].hasVisited) {
      // Supprimer la visite
      const { error: visiteError } = await supabase
        .from('lieux_visites')
        .delete()
        .eq('lieu_id', lieuId)
        .eq('user_id', user.id)
      
      if (!visiteError) {
        lieux.value[lieuIndex].hasVisited = false
      }
    } else {
      // Ajouter la visite
      const { error: visiteError } = await supabase
        .from('lieux_visites')
        .insert([
          {
            lieu_id: lieuId,
            user_id: user.id
          }
        ])
      
      if (!visiteError) {
        lieux.value[lieuIndex].hasVisited = true
      }
    }
  } catch (error) {
    console.error('Erreur lors de la visite:', error)
  }
}

function goToLogin() {
  showLoginModal.value = false
  router.push('/login')
}

function goToRegister() {
  showLoginModal.value = false
  router.push('/register')
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