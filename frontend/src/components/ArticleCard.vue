<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const shortDescription = computed(() => {
  if (!props.article.description) return ''
  return props.article.description.length > 150 
    ? props.article.description.substring(0, 150) + '...'
    : props.article.description
})

const goToArticle = () => {
  router.push(`/articles/${props.article.id}`)
}
</script>

<template>
  <div 
    @click="goToArticle"
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
  >
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
        {{ article.title }}
      </h3>
      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ shortDescription }}
      </p>
      <div class="flex items-center justify-between text-sm text-gray-500">
        <div class="flex items-center space-x-2">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ new Date(article.created_at).toLocaleDateString('fr-FR') }}
          </span>
        </div>
        <span class="text-indigo-600 hover:text-indigo-800">
          Lire l'article →
        </span>
      </div>
    </div>
  </div>
</template> 