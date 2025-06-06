<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Mes articles</h2>
    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-else-if="articles.length === 0" class="text-center text-gray-500">Aucun article trouvé.</div>
    <div v-else class="space-y-4">
      <ArticleItem v-for="article in articles" :key="article.id" :article="article" @edit="$emit('edit', article)" @refresh="$emit('refresh')" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue'
import ArticleItem from './ArticleItem.vue'
import axios from 'axios'
import { supabase } from '../supabase'
const props = defineProps({ userId: String, refreshKey: Number })
const articles = ref([])
const loading = ref(true)

async function fetchArticles() {
  loading.value = true
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const { data } = await axios.get('/api/articles', { params: { user_id: props.userId }, headers })
    articles.value = data
  } catch (e) {
    articles.value = []
  }
  loading.value = false
}

onMounted(fetchArticles)
watch(() => props.userId, fetchArticles)
watch(() => props.refreshKey, fetchArticles)
</script> 