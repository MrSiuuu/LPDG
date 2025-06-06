<template>
  <div v-if="show" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            {{ editingLieu ? 'Modifier le lieu' : 'Ajouter un lieu' }}
          </h3>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Colonne gauche -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nom du lieu</label>
                  <input v-model="form.nom" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Type</label>
                  <select v-model="form.type" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Sélectionner un type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="hotel">Hôtel</option>
                    <option value="monument">Monument</option>
                    <option value="musee">Musée</option>
                    <option value="parc">Parc</option>
                    <option value="shopping">Shopping</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Ville</label>
                  <input v-model="form.ville" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Adresse</label>
                  <input v-model="form.adresse" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Prix approximatif (€)</label>
                  <input v-model="form.prix" type="number" step="0.01" min="0" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>

                <!-- Coordonnées -->
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label for="latitude" class="block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="latitude"
                      v-model="form.latitude"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="14.7167"
                    />
                  </div>
                  <div>
                    <label for="longitude" class="block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="longitude"
                      v-model="form.longitude"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="-17.4677"
                    />
                  </div>
                </div>
              </div>

              <!-- Colonne droite -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea v-model="form.description" rows="4" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Image principale</label>
                  <div class="mt-1 flex items-center space-x-4">
                    <input type="file" @change="handleMainImageUpload" accept="image/*" class="hidden" ref="mainImageInput">
                    <button type="button" @click="$refs.mainImageInput.click()" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Choisir une image
                    </button>
                    <img v-if="mainImagePreview" :src="mainImagePreview" class="h-20 w-20 object-cover rounded-md">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Galerie d'images</label>
                  <div class="mt-1">
                    <input type="file" @change="handleGalleryUpload" accept="image/*" multiple class="hidden" ref="galleryInput">
                    <button type="button" @click="$refs.galleryInput.click()" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Ajouter des images
                    </button>
                    <div class="mt-2 grid grid-cols-4 gap-2">
                      <div v-for="(image, index) in galleryPreviews" :key="index" class="relative">
                        <img :src="image" class="h-20 w-20 object-cover rounded-md">
                        <button type="button" @click="removeGalleryImage(index)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                {{ editingLieu ? 'Modifier' : 'Ajouter' }}
              </button>
              <button type="button" @click="close" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '../supabase'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  editingLieu: {
    type: Object,
    default: null
  },
  showStatut: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  nom: '',
  type: '',
  ville: '',
  description: '',
  prix: null,
  adresse: '',
  latitude: null,
  longitude: null,
  image_principale: '',
  images: []
})

const mainImagePreview = ref(null)
const galleryPreviews = ref([])
const mainImageFile = ref(null)
const galleryFiles = ref([])

// Réinitialiser le formulaire quand le modal s'ouvre avec un lieu à éditer
watch(() => props.editingLieu, (newValue) => {
  if (newValue) {
    form.value = { ...newValue }
    mainImagePreview.value = newValue.image_principale
    galleryPreviews.value = newValue.images || []
  } else {
    form.value = {
      nom: '',
      type: '',
      ville: '',
      description: '',
      prix: null,
      adresse: '',
      latitude: null,
      longitude: null,
      image_principale: '',
      images: []
    }
    mainImagePreview.value = null
    galleryPreviews.value = []
  }
}, { immediate: true })

const handleMainImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    mainImageFile.value = file
    mainImagePreview.value = URL.createObjectURL(file)
  }
}

const handleGalleryUpload = (event) => {
  const files = Array.from(event.target.files)
  galleryFiles.value.push(...files)
  files.forEach(file => {
    galleryPreviews.value.push(URL.createObjectURL(file))
  })
}

const removeGalleryImage = (index) => {
  galleryPreviews.value.splice(index, 1)
  galleryFiles.value.splice(index, 1)
}

const uploadImages = async () => {
  const uploadedUrls = []

  // Upload image principale
  if (mainImageFile.value) {
    const fileExt = mainImageFile.value.name.split('.').pop()
    const fileName = `lieux/${Date.now()}_main.${fileExt}`
    const { data, error } = await supabase.storage.from('images').upload(fileName, mainImageFile.value)
    if (!error) {
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
      form.value.image_principale = publicUrlData.publicUrl
    }
  }

  // Upload images de la galerie
  for (const file of galleryFiles.value) {
    const fileExt = file.name.split('.').pop()
    const fileName = `lieux/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`
    const { data, error } = await supabase.storage.from('images').upload(fileName, file)
    if (!error) {
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
      uploadedUrls.push(publicUrlData.publicUrl)
    }
  }

  form.value.images = uploadedUrls
}

const submitForm = async () => {
  await uploadImages()
  emit('submit', form.value)
}

const close = () => {
  emit('close')
}
</script> 