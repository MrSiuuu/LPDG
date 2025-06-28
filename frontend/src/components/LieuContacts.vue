<template>
  <div v-if="contacts.length > 0" class="bg-white rounded-lg shadow p-6 mt-8">
    <h2 class="text-xl font-bold mb-4 text-indigo-700 flex items-center">
      <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      Contact rapide
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="contact in contacts" :key="contact.id" class="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800 mb-1">{{ contact.nom_contact }}</h3>
            <p v-if="contact.fonction" class="text-sm text-gray-600 mb-2">{{ contact.fonction }}</p>
            
            <div class="space-y-2">
              <div v-if="contact.telephone" class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-gray-700">{{ formatPhone(contact.telephone) }}</span>
              </div>
              
              <div v-if="contact.email" class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a :href="`mailto:${contact.email}`" class="text-blue-600 hover:underline">{{ contact.email }}</a>
              </div>
            </div>
            
            <div v-if="contact.notes" class="mt-3 text-sm text-gray-600 bg-white p-2 rounded border">
              {{ contact.notes }}
            </div>
          </div>
          
          <div class="ml-4">
            <span v-if="contact.est_principal" class="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              Principal
            </span>
          </div>
        </div>
        
        <div v-if="contact.telephone" class="mt-4">
          <a 
            :href="`tel:${contact.telephone}`"
            class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Appeler
          </a>
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

const contacts = ref([])
const loading = ref(false)

function formatPhone(phone) {
  if (!phone) return ''
  // Format guinéen: +224 XXX XXX XXX
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 12 && cleaned.startsWith('224')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
  }
  return phone
}

async function fetchContacts() {
  if (!props.lieuId || isNaN(props.lieuId)) {
    console.warn('LieuContacts: lieuId invalide:', props.lieuId)
    return
  }
  
  loading.value = true
  try {
    const { data } = await supabase
      .from('contacts_lieu')
      .select('*')
      .eq('lieu_id', props.lieuId)
      .order('est_principal', { ascending: false })
      .order('nom_contact', { ascending: true })
    
    contacts.value = data || []
  } catch (error) {
    console.error('Erreur lors du chargement des contacts:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchContacts()
})
</script> 