<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
          {{ isEditing ? 'Modifier votre avis' : 'Ajouter un avis' }}
        </h3>
        <button 
          @click="closeModal" 
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submitAvis" class="space-y-4">
        <!-- Note avec étoiles -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Votre note
          </label>
          <div class="flex items-center space-x-1">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="selectedNote = star"
              @mouseenter="hoveredStar = star"
              @mouseleave="hoveredStar = 0"
              class="text-2xl transition-colors duration-200"
              :class="{
                'text-yellow-400': star <= (hoveredStar || selectedNote),
                'text-gray-300': star > (hoveredStar || selectedNote)
              }"
            >
              ★
            </button>
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {{ selectedNote }}/5
            </span>
          </div>
        </div>

        <!-- Commentaire -->
        <div>
          <label for="commentaire" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Votre commentaire
          </label>
          <textarea
            id="commentaire"
            v-model="commentaire"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Partagez votre expérience..."
            required
          ></textarea>
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            :disabled="!selectedNote || !commentaire.trim() || loading"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Enregistrement...</span>
            <span v-else>{{ isEditing ? 'Modifier' : 'Ajouter' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { addAvis, updateAvis } from '../supabase.js'

const props = defineProps({
  isOpen: Boolean,
  lieuId: Number,
  existingAvis: Object
})

const emit = defineEmits(['close', 'avis-added', 'avis-updated'])

const selectedNote = ref(0)
const commentaire = ref('')
const loading = ref(false)
const hoveredStar = ref(0)

const isEditing = computed(() => !!props.existingAvis)

// Initialiser les valeurs si on modifie un avis existant
watch(() => props.existingAvis, (avis) => {
  if (avis) {
    selectedNote.value = avis.note
    commentaire.value = avis.commentaire
  } else {
    selectedNote.value = 0
    commentaire.value = ''
  }
}, { immediate: true })

const closeModal = () => {
  selectedNote.value = 0
  commentaire.value = ''
  hoveredStar.value = 0
  loading.value = false
  emit('close')
}

const submitAvis = async () => {
  if (!selectedNote.value || !commentaire.value.trim()) {
    return
  }

  try {
    loading.value = true

    if (isEditing.value) {
      // Modifier l'avis existant
      const { data, error } = await updateAvis(
        props.existingAvis.id,
        selectedNote.value,
        commentaire.value.trim()
      )
      
      if (error) throw error
      emit('avis-updated', data)
    } else {
      // Ajouter un nouvel avis
      const { data, error } = await addAvis(
        props.lieuId,
        selectedNote.value,
        commentaire.value.trim()
      )
      
      if (error) throw error
      emit('avis-added', data)
    }

    closeModal()
  } catch (error) {
    console.error('Erreur lors de l\'ajout/modification de l\'avis:', error)
    alert('Erreur lors de l\'enregistrement de l\'avis. Veuillez réessayer.')
  } finally {
    loading.value = false
  }
}
</script> 