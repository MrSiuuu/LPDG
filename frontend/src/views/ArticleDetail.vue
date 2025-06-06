<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ArticleComments from '../components/ArticleComments.vue'
import ArticleLikes from '../components/ArticleLikes.vue'

const route = useRoute()
const article = ref(null)
const loading = ref(true)
const error = ref(null)

async function fetchArticle() {
  loading.value = true
  try {
    const { data } = await axios.get(`/api/articles/${route.params.id}`)
    article.value = data
  } catch (e) {
    error.value = "Impossible de charger l'article."
  }
  loading.value = false
}

onMounted(fetchArticle)
</script>

<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else-if="article" class="bg-white rounded-lg shadow p-8">
      <h1 class="text-3xl font-bold mb-2">{{ article.title || article.titre }}</h1>
      <div class="flex items-center text-gray-500 text-sm mb-4">
        <span v-if="article.created_at">Publié le {{ new Date(article.created_at).toLocaleDateString('fr-FR') }}</span>
        <span v-if="article.author || article.auteur" class="ml-4">par {{ article.author || article.auteur }}</span>
      </div>
      <div class="prose max-w-none mb-6" v-html="article.contenu || article.content"></div>
      <div class="mb-6">
        <ArticleLikes :articleId="article.id" />
      </div>
      <ArticleComments :articleId="article.id" />
    </div>
    <div v-else class="text-center text-gray-500">Aucun article trouvé.</div>
  </div>
</template> 