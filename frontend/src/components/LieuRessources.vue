<template>
  <div v-if="hasRessources" class="bg-white rounded-lg shadow p-6 mt-8">
    <h2 class="text-xl font-bold mb-4 text-indigo-700 flex items-center">
      <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      Liens & Ressources
    </h2>
    
    <!-- Réseaux sociaux -->
    <div v-if="reseauxSociaux.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Réseaux sociaux</h3>
      <div class="flex flex-wrap gap-3">
        <a 
          v-for="reseau in reseauxSociaux" 
          :key="reseau.plateforme"
          :href="reseau.url" 
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <svg v-if="reseau.plateforme === 'facebook'" class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <svg v-else-if="reseau.plateforme === 'twitter'" class="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          <svg v-else-if="reseau.plateforme === 'instagram'" class="w-5 h-5 mr-2 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.796-1.418-1.947-1.418-3.244s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
          </svg>
          <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {{ reseau.plateforme }}
        </a>
      </div>
    </div>
    
    <!-- Ressources téléchargeables -->
    <div v-if="ressources.length > 0">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Ressources téléchargeables</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <a 
          v-for="ressource in ressources" 
          :key="ressource.nom"
          :href="ressource.url" 
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border"
        >
          <svg class="w-8 h-8 mr-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          <div class="flex-1">
            <div class="font-medium text-gray-800">{{ ressource.nom }}</div>
            <div v-if="ressource.description" class="text-sm text-gray-600">{{ ressource.description }}</div>
            <div v-if="ressource.taille" class="text-xs text-gray-500">{{ ressource.taille }}</div>
          </div>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lieu: {
    type: Object,
    required: true
  }
})

const reseauxSociaux = computed(() => {
  if (!props.lieu.reseaux_sociaux || typeof props.lieu.reseaux_sociaux !== 'object') {
    return []
  }
  return Object.entries(props.lieu.reseaux_sociaux).map(([plateforme, url]) => ({
    plateforme,
    url
  }))
})

const ressources = computed(() => {
  if (!props.lieu.ressources || typeof props.lieu.ressources !== 'object') {
    return []
  }
  return Object.entries(props.lieu.ressources).map(([nom, data]) => ({
    nom,
    ...(typeof data === 'string' ? { url: data } : data)
  }))
})

const hasRessources = computed(() => {
  return reseauxSociaux.value.length > 0 || ressources.value.length > 0
})
</script> 