<template>
  <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-4">
    <h2 class="text-2xl font-bold mb-6 text-slate-800 text-center">Mon profil</h2>
    
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
        <label class="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
        <input v-model="formData.prenom" type="text" class="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Nom</label>
        <input v-model="formData.nom" type="text" class="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input v-model="formData.email" type="email" class="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Adresse</label>
        <input v-model="formData.adresse" type="text" class="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Ville</label>
        <input v-model="formData.ville" type="text" class="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
        <input v-model="formData.telephone" type="tel" class="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-semibold">Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch, toRefs } from 'vue'
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

// Remplir les champs avec les valeurs existantes
watch(() => props.profile, (val) => {
  if (val) {
    formData.prenom = val.prenom || ''
    formData.nom = val.nom || ''
    formData.email = val.email || ''
    formData.adresse = val.adresse || ''
    formData.ville = val.ville || ''
    formData.telephone = val.telephone || ''
  }
}, { immediate: true })

function submitForm() {
  emit('update', { ...formData })
}
</script> 