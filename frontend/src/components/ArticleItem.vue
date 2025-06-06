<template>
  <div class="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center gap-4">
    <div class="flex-1">
      <h3 class="text-lg font-bold">{{ article.titre }}</h3>
      <p class="text-gray-600 line-clamp-2">{{ article.contenu }}</p>
      <div class="flex gap-2 mt-2">
        <span v-if="article.brouillon" class="badge badge-warning">Brouillon</span>
        <span class="badge badge-ghost">{{ article.created_at?.slice(0,10) }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-2 md:items-end">
      <button class="btn btn-sm btn-outline" @click="$emit('edit', article)">✏️ Modifier</button>
      <button class="btn btn-sm btn-error" @click="deleteArticle">🗑️ Supprimer</button>
      <button class="btn btn-sm btn-info" @click="showPreview = true">👁️ Aperçu</button>
      <ArticleLikes :article-id="article.id" />
      <ArticleComments :article-id="article.id" />
    </div>
  </div>
  <template v-if="showPreview">
    <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-red-600" @click="showPreview = false">✖</button>
        <h2 class="text-2xl font-bold mb-4">{{ article.titre }}</h2>
        <div class="text-gray-700 whitespace-pre-line">{{ article.contenu }}</div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import ArticleLikes from './ArticleLikes.vue'
import ArticleComments from './ArticleComments.vue'
import axios from 'axios'
import { supabase } from '../supabase'
import { ref } from 'vue'

const props = defineProps({ article: Object })
const emit = defineEmits(['edit', 'refresh'])

const showPreview = ref(false)

async function deleteArticle() {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    await axios.delete(`/api/articles/${props.article.id}`, { headers })
    emit('refresh')
  } catch (e) {}
}
</script> 