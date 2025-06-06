<template>
  <div class="max-w-5xl mx-auto py-10 px-4 bg-white min-h-screen">
    <button @click="$router.back()" class="mb-6 text-indigo-600 hover:underline flex items-center">
      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Retour
    </button>

    <!-- Images / Carrousel -->
    <div class="mb-8">
      <img v-if="lieu.image_principale" :src="lieu.image_principale" class="w-full h-96 object-cover rounded-lg shadow mb-4 border bg-white" alt="Image principale" />
      <div v-if="lieu.images && lieu.images.length" class="flex gap-2 flex-wrap bg-white p-4 rounded-lg">
        <img v-for="img in lieu.images" :key="img" :src="img" class="w-28 h-28 object-cover rounded border hover:scale-105 transition bg-white" />
      </div>
    </div>

    <!-- Infos -->
    <div class="bg-white rounded-lg shadow p-8 space-y-4">
      <h1 v-if="lieu.nom" class="text-3xl font-bold text-gray-900 mb-4">{{ lieu.nom }}</h1>
      <div class="text-gray-700 space-y-3">
        <p v-if="lieu.adresse"><strong class="text-indigo-700">Adresse :</strong> {{ lieu.adresse }}</p>
        <p v-if="lieu.ville"><strong class="text-indigo-700">Ville :</strong> {{ lieu.ville }}</p>
        <p v-if="lieu.type"><strong class="text-indigo-700">Type :</strong> {{ lieu.type }}</p>
        <p v-if="lieu.prix"><strong class="text-indigo-700">Prix :</strong> {{ lieu.prix }} €</p>
        <div v-if="lieu.description">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Description :</h2>
          <p class="text-gray-800 whitespace-pre-line">{{ lieu.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'

const route = useRoute()
const lieu = ref({})

onMounted(async () => {
  const { data } = await supabase
    .from('lieux')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (data && typeof data.images === 'string') {
    try { data.images = JSON.parse(data.images) } catch {}
  }

  if (!data.images) data.images = []
  lieu.value = data || {}
})
</script>
