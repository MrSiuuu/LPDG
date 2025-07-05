<template>
  <div class="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-4">
    <h2 class="text-2xl font-bold mb-6 text-slate-800 dark:text-white text-center">Mon profil</h2>
    
    <!-- Avatar avec initiales -->
    <div class="flex justify-center mb-6">
      <UserAvatar 
        :nom="formData.nom" 
        :prenom="formData.prenom" 
        size="xl"
      />
    </div>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Prénom</label>
        <input 
          v-model="formData.prenom" 
          type="text" 
          class="w-full border border-slate-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
          required 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Nom</label>
        <input 
          v-model="formData.nom" 
          type="text" 
          class="w-full border border-slate-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
          required 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email</label>
        <input 
          v-model="formData.email" 
          type="email" 
          class="w-full border border-slate-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
          required 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Adresse</label>
        <input 
          v-model="formData.adresse" 
          type="text" 
          class="w-full border border-slate-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Ville</label>
        <input 
          v-model="formData.ville" 
          type="text" 
          class="w-full border border-slate-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Téléphone</label>
        <input 
          v-model="formData.telephone" 
          type="tel" 
          class="w-full border border-slate-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
        />
      </div>
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 font-semibold transition-colors duration-200"
        >
          Enregistrer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue'
import UserAvatar from '../components/UserAvatar.vue'

const props = defineProps({
  profile: { type: Object, required: true }
})
const emit = defineEmits(['update'])

const formData = reactive({
  prenom: '',
  nom: '',
  email: '',
  adresse: '',
  ville: '',
  telephone: ''
})

// Fonction pour remplir les champs avec les données du profil
const fillFormData = (profileData) => {
  if (profileData) {
    formData.prenom = profileData.prenom || ''
    formData.nom = profileData.nom || ''
    formData.email = profileData.email || ''
    formData.adresse = profileData.adresse || ''
    formData.ville = profileData.ville || ''
    formData.telephone = profileData.telephone || ''
  }
}

// Remplir les champs avec les valeurs existantes
watch(() => props.profile, (val) => {
  fillFormData(val)
}, { immediate: true, deep: true })

// S'assurer que les données sont chargées au montage du composant
onMounted(() => {
  if (props.profile) {
    fillFormData(props.profile)
  }
})

function submitForm() {
  emit('update', { ...formData })
}
</script> 