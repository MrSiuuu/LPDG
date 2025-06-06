<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Modal -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Modifier le profil
                </h3>
                
                <!-- Photo de profil -->
                <div class="mb-4">
                  <div class="flex items-center space-x-4">
                    <img
                      :src="formData.photo || 'https://via.placeholder.com/150'"
                      alt="Photo de profil"
                      class="h-20 w-20 rounded-full object-cover"
                    />
                    <div>
                      <label class="block text-sm font-medium text-gray-700">
                        Photo de profil
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        @change="handlePhotoUpload"
                        class="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-indigo-50 file:text-indigo-700
                          hover:file:bg-indigo-100"
                      />
                    </div>
                  </div>
                </div>

                <!-- Nom -->
                <div class="mb-4">
                  <label for="nom" class="block text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="nom"
                    v-model="formData.nom"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <!-- Email -->
                <div class="mb-4">
                  <label for="email" class="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <!-- Adresse -->
                <div class="mb-4">
                  <label for="adresse" class="block text-sm font-medium text-gray-700">
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="adresse"
                    v-model="formData.adresse"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <!-- Ville -->
                <div class="mb-4">
                  <label for="ville" class="block text-sm font-medium text-gray-700">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="ville"
                    v-model="formData.ville"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <!-- Téléphone -->
                <div class="mb-4">
                  <label for="telephone" class="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    v-model="formData.telephone"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Enregistrer
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { supabase } from '../../supabase'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  profile: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update'])

const formData = ref({
  nom: '',
  email: '',
  photo: '',
  adresse: '',
  ville: '',
  telephone: ''
})

// Initialiser le formulaire avec les données du profil
onMounted(() => {
  if (props.profile) {
    formData.value = {
      nom: props.profile.nom || '',
      email: props.profile.email || '',
      photo: props.profile.photo || '',
      adresse: props.profile.adresse || '',
      ville: props.profile.ville || '',
      telephone: props.profile.telephone || ''
    }
  }
})

// Mettre à jour le formulaire quand le profil change
watch(() => props.profile, (newProfile) => {
  if (newProfile) {
    formData.value = {
      nom: newProfile.nom || '',
      email: newProfile.email || '',
      photo: newProfile.photo || '',
      adresse: newProfile.adresse || '',
      ville: newProfile.ville || '',
      telephone: newProfile.telephone || ''
    }
  }
}, { immediate: true, deep: true })

const handlePhotoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    formData.value.photo = publicUrl
  } catch (error) {
    console.error('Erreur lors du téléchargement de la photo:', error.message)
  }
}

const handleSubmit = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non authentifié')

    // Mettre à jour l'email dans Supabase Auth si modifié
    if (formData.value.email !== props.profile.email) {
      const { error: updateEmailError } = await supabase.auth.updateUser({
        email: formData.value.email
      })
      if (updateEmailError) throw updateEmailError
    }

    // Mettre à jour le profil dans la base de données
    const { error: updateProfileError } = await supabase
      .from('user_profiles')
      .update({
        nom: formData.value.nom,
        email: formData.value.email,
        photo: formData.value.photo,
        adresse: formData.value.adresse,
        ville: formData.value.ville,
        telephone: formData.value.telephone
      })
      .eq('id', user.id)

    if (updateProfileError) throw updateProfileError

    emit('update', formData.value)
    emit('close')
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error.message)
  }
}
</script> 