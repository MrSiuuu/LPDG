<template>
  <div class="flex items-center gap-1 relative">
    <button 
      class="btn btn-xs btn-ghost" 
      @click="handleLike" 
      :disabled="!lieuId"
      :class="{ 'text-red-500': hasLiked }"
      :title="!isConnected ? 'Connectez-vous pour liker ce lieu' : ''"
    >
      {{ hasLiked ? '❤️' : '🤍' }}
    </button>
    <span class="text-xs">{{ likes }}</span>
    
    <!-- Message d'invitation à la connexion -->
    <div v-if="showLoginMessage" class="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50 mt-8 -ml-20 w-48">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-blue-500">🔐</span>
        <span class="text-sm font-medium text-gray-800">Connexion requise</span>
      </div>
      <p class="text-xs text-gray-600 mb-3">Connectez-vous pour liker ce lieu</p>
      <div class="flex gap-2">
        <button 
          @click="goToLogin" 
          class="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Se connecter
        </button>
        <button 
          @click="showLoginMessage = false" 
          class="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'
import { supabase } from '../supabase'

const router = useRouter()
const props = defineProps({ lieuId: Number })
const likes = ref(0)
const hasLiked = ref(false)
const showLoginMessage = ref(false)
const isConnected = ref(false)

// Vérifier l'authentification réelle
async function checkAuth() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    isConnected.value = !!user
  } catch (error) {
    isConnected.value = false
  }
}

async function fetchLikes() {
  if (!props.lieuId) {
    likes.value = 0
    return
  }

  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    
    // Récupérer le nombre de likes
    const { data: likesData } = await api.get(`/api/lieux/${props.lieuId}/likes`, { headers })
    likes.value = likesData?.count || 0
    
    // Récupérer si l'utilisateur a liké
    if (token) {
      const { data: hasLikedData } = await api.get(`/api/lieux/${props.lieuId}/has-liked`, { headers })
      hasLiked.value = hasLikedData?.hasLiked || false
    }
  } catch (e) {
    console.error('Erreur lors de la récupération des likes:', e.response?.data || e.message)
    likes.value = 0
    hasLiked.value = false
  }
}

async function handleLike() {
  if (!props.lieuId) {
    console.error('lieuId non défini')
    return
  }

  // Vérifier l'authentification avant de continuer
  await checkAuth()
  
  if (!isConnected.value) {
    showLoginMessage.value = true
    return
  }

  await like()
}

async function like() {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    
    if (!token) {
      console.error('Aucun token trouvé - utilisateur non connecté')
      return
    }
    
    const headers = { Authorization: `Bearer ${token}` }
    const response = await api.post(`/api/lieux/${props.lieuId}/like`, {}, { headers })
    
    // Mettre à jour l'état local
    if (response.data.action === 'liked') {
      hasLiked.value = true
      likes.value++
    } else if (response.data.action === 'unliked') {
      hasLiked.value = false
      likes.value--
    }
    
    console.log('Action effectuée:', response.data.action)
  } catch (e) {
    console.error('Erreur lors du like:', e.response?.data || e.message)
  }
}

function goToLogin() {
  showLoginMessage.value = false
  router.push('/login')
}

watch(() => props.lieuId, (newId) => {
  if (newId) {
    fetchLikes()
  }
})

onMounted(async () => {
  await checkAuth()
  if (props.lieuId) {
    fetchLikes()
  }
})
</script> 