<template>
  <div class="flex items-center gap-1">
    <button class="btn btn-xs btn-ghost" @click="like" :disabled="!isConnected">❤️</button>
    <span class="text-xs">{{ likes }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { supabase } from '../supabase'
const props = defineProps({ articleId: Number })
const likes = ref(0)
const isConnected = !!localStorage.getItem('user_id')

async function fetchLikes() {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const { data } = await axios.get(`/api/articles/${props.articleId}/likes`, { headers })
    likes.value = data?.count || 0
  } catch (e) {
    likes.value = 0
  }
}
async function like() {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    await axios.post(`/api/articles/${props.articleId}/like`, {}, { headers })
    fetchLikes()
  } catch (e) {}
}
onMounted(fetchLikes)
</script> 