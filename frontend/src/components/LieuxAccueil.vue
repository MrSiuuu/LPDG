<template>
  <div class="max-w-4xl mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6">Lieux touristiques</h2>
    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-else-if="lieux.length === 0" class="text-center text-gray-500">Aucun lieu trouvé.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link
        v-for="lieu in lieux"
        :key="lieu.id"
        :to="`/lieu/${lieu.id}`"
        class="block border rounded-lg p-4 shadow hover:shadow-lg transition hover:bg-indigo-50 cursor-pointer"
      >
        <h3 class="text-xl font-semibold mb-2">{{ lieu.nom }}</h3>
        <p class="text-gray-600 mb-1"><strong>Type :</strong> {{ lieu.type }}</p>
        <p class="text-gray-600 mb-1"><strong>Ville :</strong> {{ lieu.ville }}</p>
        <p class="text-gray-600 mb-2">{{ lieu.description }}</p>
        <div v-if="lieu.image_principale">
          <img :src="lieu.image_principale" alt="Image du lieu" class="w-full h-48 object-cover rounded" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const lieux = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/api/lieux')
    if (!response.ok) throw new Error('Erreur lors du chargement des lieux')
    lieux.value = await response.json()
  } catch (e) {
    lieux.value = []
  } finally {
    loading.value = false
  }
})
</script> 