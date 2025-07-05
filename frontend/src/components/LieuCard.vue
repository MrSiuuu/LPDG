<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <img :src="lieu.image_principale" :alt="lieu.nom" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">{{ lieu.nom }}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ lieu.ville }}</p>
      
      <!-- Note moyenne avec étoiles -->
      <div v-if="noteMoyenne > 0" class="flex items-center gap-1 mt-2">
        <div class="flex items-center">
          <span v-for="i in 5" :key="i" class="text-sm" :class="i <= noteMoyenne ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700'">
            ★
          </span>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">({{ nombreAvis }})</span>
      </div>
      
      <p class="mt-2 text-gray-700 dark:text-gray-200 line-clamp-2">{{ resumeDescription(lieu.description) }}</p>
      
      <div class="mt-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500 dark:text-gray-300">{{ lieu.type }}</span>
          <span v-if="lieu.prix" class="text-sm font-medium text-indigo-600 dark:text-indigo-400">{{ lieu.prix }} GNF</span>
          <!-- Accessibilité -->
          <span v-if="lieu.accessible_mobilite_reduite" class="text-xs bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100 px-2 py-1 rounded-full">
            ♿ PMR
          </span>
        </div>
      </div>
      
      <div class="mt-4 flex justify-between items-center">
        <LieuLikes :lieuId="lieu.id" />
        <router-link :to="'/lieu/' + lieu.id"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800">
          Voir plus
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import LieuLikes from './LieuLikes.vue'

const props = defineProps({
  lieu: {
    type: Object,
    required: true
  },
  avis: {
    type: Array,
    default: () => []
  }
})

// Calcul de la note moyenne et nombre d'avis
const noteMoyenne = computed(() => {
  if (props.avis.length === 0) return 0
  const total = props.avis.reduce((sum, avis) => sum + avis.note, 0)
  return Math.round(total / props.avis.length)
})

const nombreAvis = computed(() => props.avis.length)

function extractTextFromDescription(desc) {
  if (!desc) return ''
  try {
    // Si c'est du JSON (Delta Quill)
    const delta = JSON.parse(desc)
    if (delta && delta.ops) {
      return delta.ops.map(op => typeof op.insert === 'string' ? op.insert : '').join('')
    }
  } catch (e) {
    // Sinon, c'est peut-être du HTML
    const div = document.createElement('div')
    div.innerHTML = desc
    return div.textContent || div.innerText || ''
  }
  return desc
}

function resumeDescription(desc) {
  const txt = extractTextFromDescription(desc).replace(/\s+/g, ' ').trim()
  return txt.length > 90 ? txt.substring(0, 90) + '...' : txt
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 