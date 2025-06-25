<template>
  <div class="flex items-center gap-1">
    <button 
      class="btn btn-xs btn-ghost" 
      @click="like" 
      :disabled="!isConnected || !lieuId"
      :class="{ 'text-red-500': hasLiked }"
    >
      {{ hasLiked ? '❤️' : '🤍' }}
    </button>
    <span class="text-xs">{{ likes }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { supabase } from '../supabase'

const props = defineProps({ lieuId: Number })
const likes = ref(0)
const hasLiked = ref(false)
const isConnected = !!localStorage.getItem('user_id')

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
    const { data: likesData } = await axios.get(`/api/lieux/${props.lieuId}/likes`, { headers })
    likes.value = likesData?.count || 0
    
    // Récupérer si l'utilisateur a liké
    if (token) {
      const { data: hasLikedData } = await axios.get(`/api/lieux/${props.lieuId}/has-liked`, { headers })
      hasLiked.value = hasLikedData?.hasLiked || false
    }
  } catch (e) {
    console.error('Erreur lors de la récupération des likes:', e.response?.data || e.message)
    likes.value = 0
    hasLiked.value = false
  }
}

async function like() {
  if (!props.lieuId) {
    console.error('lieuId non défini')
    return
  }

  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    
    if (!token) {
      console.error('Aucun token trouvé - utilisateur non connecté')
      return
    }
    
    const headers = { Authorization: `Bearer ${token}` }
    const response = await axios.post(`/api/lieux/${props.lieuId}/like`, {}, { headers })
    
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

watch(() => props.lieuId, (newId) => {
  if (newId) {
    fetchLikes()
  }
})

onMounted(() => {
  if (props.lieuId) {
    fetchLikes()
  }
})
</script> 