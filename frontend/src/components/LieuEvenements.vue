<template>
  <div class="bg-white rounded-lg shadow p-6 mt-8">
    <h2 class="text-xl font-bold mb-4 text-indigo-700 flex items-center">
      <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Événements à venir
    </h2>
    
    <div v-if="loading" class="text-gray-500">Chargement des événements...</div>
    <div v-else-if="evenements.length === 0" class="text-gray-400">Aucun événement à venir pour ce lieu.</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="evenement in evenements" :key="evenement.id" class="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
        <div v-if="evenement.photo_evenement" class="mb-3">
          <img :src="evenement.photo_evenement" :alt="evenement.titre" class="w-full h-32 object-cover rounded-lg" />
        </div>
        
        <h3 class="font-semibold text-gray-800 mb-2">{{ evenement.titre }}</h3>
        <p v-if="evenement.description" class="text-sm text-gray-600 mb-3">{{ evenement.description }}</p>
        
        <div class="space-y-2 text-sm">
          <div class="flex items-center text-gray-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{{ formatDate(evenement.date_debut) }}</span>
          </div>
          
          <div v-if="evenement.heure_debut" class="flex items-center text-gray-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ evenement.heure_debut }}{{ evenement.heure_fin ? ` - ${evenement.heure_fin}` : '' }}</span>
          </div>
          
          <div v-if="evenement.prix_evenement" class="flex items-center text-green-700 font-medium">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span>{{ evenement.prix_evenement }} €</span>
          </div>
          
          <div v-if="evenement.capacite_max" class="flex items-center text-gray-600">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Capacité: {{ evenement.capacite_max }} personnes</span>
          </div>
        </div>
        
        <div class="mt-3 pt-3 border-t border-gray-200">
          <span class="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full capitalize">
            {{ evenement.type_evenement }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const props = defineProps({
  lieuId: {
    type: Number,
    required: true
  }
})

const evenements = ref([])
const loading = ref(false)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

async function fetchEvenements() {
  if (!props.lieuId || isNaN(props.lieuId)) {
    console.warn('LieuEvenements: lieuId invalide:', props.lieuId)
    return
  }
  
  loading.value = true
  try {
    console.log('Fetching events for lieu ID:', props.lieuId)
    
    // D'abord, récupérons tous les événements pour ce lieu
    const { data: allEvents, error: allError } = await supabase
      .from('evenements_lieu')
      .select('*')
      .eq('lieu_id', props.lieuId)
    
    console.log('All events for this lieu:', allEvents)
    console.log('Error if any:', allError)
    
    if (allError) {
      console.error('Erreur lors du chargement de tous les événements:', allError)
      return
    }
    
    // Maintenant, filtrons les événements futurs et actifs
    const { data, error } = await supabase
      .from('evenements_lieu')
      .select('*')
      .eq('lieu_id', props.lieuId)
      .gte('date_debut', new Date().toISOString())
      .eq('est_actif', true)
      .order('date_debut', { ascending: true })
    
    console.log('Filtered events (future and active):', data)
    console.log('Error if any:', error)
    
    if (error) {
      console.error('Erreur lors du chargement des événements:', error)
      return
    }
    
    evenements.value = data || []
  } catch (error) {
    console.error('Erreur lors du chargement des événements:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEvenements()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 