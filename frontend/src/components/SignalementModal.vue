<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b">
        <h3 class="text-lg font-semibold text-gray-900">Signaler ce lieu</h3>
        <button 
          @click="$emit('close')" 
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <form @submit.prevent="submitSignalement" class="space-y-4">
          <!-- Motifs prédéfinis -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Motif du signalement *
            </label>
            <select 
              v-model="selectedMotif" 
              @change="onMotifChange"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Choisir un motif</option>
              <option value="informations_incorrectes">Informations incorrectes</option>
              <option value="lieu_ferme">Lieu fermé/inexistant</option>
              <option value="contenu_inapproprie">Contenu inapproprié</option>
              <option value="doublon">Doublon d'un autre lieu</option>
              <option value="autre">Autre raison</option>
            </select>
          </div>

          <!-- Description détaillée -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description détaillée *
            </label>
            <textarea 
              v-model="description" 
              rows="4" 
              placeholder="Expliquez en détail pourquoi vous signalez ce lieu..."
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              required
            ></textarea>
          </div>

          <!-- Message d'erreur -->
          <div v-if="error" class="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {{ error }}
          </div>

          <!-- Message de succès -->
          <div v-if="success" class="text-green-600 text-sm bg-green-50 p-3 rounded-md">
            {{ success }}
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              @click="$emit('close')"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Envoi...' : 'Signaler' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import api from '../utils/api'
import { supabase } from '../supabase'

const props = defineProps({
  show: Boolean,
  lieuId: Number
})

const emit = defineEmits(['close', 'signalement-created'])

const selectedMotif = ref('')
const description = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

// Réinitialiser le formulaire quand le modal s'ouvre
watch(() => props.show, (newVal) => {
  if (newVal) {
    selectedMotif.value = ''
    description.value = ''
    error.value = ''
    success.value = ''
  }
})

const onMotifChange = () => {
  // Pré-remplir la description selon le motif sélectionné
  const descriptions = {
    informations_incorrectes: 'Veuillez préciser quelles informations sont incorrectes...',
    lieu_ferme: 'Veuillez préciser si le lieu est fermé définitivement, temporairement, ou s\'il n\'existe pas...',
    contenu_inapproprie: 'Veuillez décrire le contenu inapproprié...',
    doublon: 'Veuillez indiquer quel lieu est en doublon...',
    autre: 'Veuillez expliquer votre raison...'
  }
  
  if (selectedMotif.value && descriptions[selectedMotif.value]) {
    description.value = descriptions[selectedMotif.value]
  }
}

const submitSignalement = async () => {
  if (!selectedMotif.value || !description.value.trim()) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    if (!token) {
      throw new Error('Vous devez être connecté pour signaler un lieu')
    }
    const motif = `${selectedMotif.value}: ${description.value.trim()}`
    const response = await api.post(
      `/api/signalements/lieux/${props.lieuId}`,
      { motif },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (response.data.success) {
      success.value = 'Signalement envoyé avec succès. Merci pour votre contribution !'
      setTimeout(() => {
        emit('signalement-created')
        emit('close')
      }, 2000)
    }
  } catch (err) {
    console.error('Erreur lors du signalement:', err)
    error.value = err.response?.data?.error || 'Erreur lors de l\'envoi du signalement'
  } finally {
    loading.value = false
  }
}
</script> 