<template>
  <div>
    <button class="btn btn-xs btn-ghost" @click="show = !show">💬 Commentaires</button>
    <div v-if="show" class="mt-2 bg-gray-50 rounded p-2">
      <div v-if="loading" class="text-xs text-gray-400">Chargement...</div>
      <div v-else>
        <div v-if="comments.length === 0" class="text-xs text-gray-400">Aucun commentaire</div>
        <div v-else class="space-y-1">
          <div v-for="c in comments" :key="c.id" class="text-xs"><b>{{ c.user_nom || 'Anonyme' }}:</b> {{ c.texte }}</div>
        </div>
        <form v-if="isConnected" @submit.prevent="addComment" class="flex gap-1 mt-2">
          <input v-model="newComment" class="input input-xs input-bordered flex-1" placeholder="Ajouter un commentaire..." />
          <button class="btn btn-xs btn-primary">Envoyer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '../utils/api'
import { supabase } from '../supabase'
const props = defineProps({ articleId: Number })
const show = ref(false)
const loading = ref(false)
const comments = ref([])
const newComment = ref('')
const isConnected = !!localStorage.getItem('user_id')

watch(show, (val) => {
  if (val) fetchComments()
})

async function fetchComments() {
  loading.value = true
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const { data } = await api.get(`/api/articles/${props.articleId}/comments`, { headers })
    comments.value = data || []
  } catch (e) {
    comments.value = []
  }
  loading.value = false
}
async function addComment() {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    await api.post(`/api/articles/${props.articleId}/comments`, { texte: newComment.value }, { headers })
    newComment.value = ''
    fetchComments()
  } catch (e) {}
}
</script> 