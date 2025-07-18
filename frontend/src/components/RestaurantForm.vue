<template>
  <form @submit.prevent="handleSubmit" class="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-6">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ajouter un restaurant</h2>
    
    <!-- Message de statut -->
    <div v-if="status.message" :class="`p-3 rounded ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
      {{ status.message }}
    </div>
    
    <!-- Infos de base du lieu -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Nom du restaurant *</label>
        <input v-model="form.nom" required class="input" type="text" placeholder="Nom du restaurant" />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Adresse *</label>
        <input v-model="form.adresse" required class="input" type="text" placeholder="Adresse" />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Ville *</label>
        <input v-model="form.ville" required class="input" type="text" placeholder="Ville" />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Prix moyen</label>
        <input v-model="form.prix_moyen" class="input" type="number" min="0" step="0.01" placeholder="Prix moyen (optionnel)" />
      </div>
    </div>

    <!-- Description avec QuillEditor -->
    <div>
        <label class="block text-gray-700 dark:text-gray-200">Description</label>
      <QuillEditor 
        v-model:content="form.description" 
        theme="snow" 
        class="mt-1 w-full min-h-[250px] bg-white dark:bg-gray-700"
        :options="{
          placeholder: 'Décrivez votre restaurant...',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link'],
              ['clean']
            ]
          }
        }"
      />
    </div>

    <!-- Images -->
    <div>
      <label class="block text-gray-700 dark:text-gray-200">Images</label>
      <input type="file" multiple @change="handleImages" accept="image/*" class="input" />
      <div class="flex gap-2 mt-2 flex-wrap">
        <img v-for="(img, i) in imagePreviews" :key="i" :src="img" class="w-20 h-20 object-cover rounded border" />
      </div>
    </div>

    <!-- Type de cuisine et services -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Type de cuisine</label>
        <input v-model="form.type_cuisine" class="input" type="text" placeholder="Guinéenne, fast-food, etc." />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Services proposés</label>
        <div class="mt-2 space-y-2">
          <div class="flex items-center">
            <input 
              id="service-sur-place" 
              v-model="form.services" 
              value="sur place" 
              type="checkbox" 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="service-sur-place" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              🍽️ Sur place
            </label>
          </div>
          <div class="flex items-center">
            <input 
              id="service-emporter" 
              v-model="form.services" 
              value="à emporter" 
              type="checkbox" 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="service-emporter" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              📦 À emporter
            </label>
          </div>
          <div class="flex items-center">
            <input 
              id="service-livraison" 
              v-model="form.services" 
              value="livraison" 
              type="checkbox" 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="service-livraison" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              🚚 Livraison
            </label>
          </div>
          <div class="flex items-center">
            <input 
              id="service-terrasse" 
              v-model="form.services" 
              value="terrasse" 
              type="checkbox" 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="service-terrasse" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              🌳 Terrasse
            </label>
          </div>
          <div class="flex items-center">
            <input 
              id="service-wifi" 
              v-model="form.services" 
              value="wifi" 
              type="checkbox" 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="service-wifi" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              📶 Wifi gratuit
            </label>
          </div>
          <div class="flex items-center">
            <input 
              id="service-parking" 
              v-model="form.services" 
              value="parking" 
              type="checkbox" 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="service-parking" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              🚗 Parking
            </label>
          </div>
          <div class="flex items-center">
            <input 
              id="service-reservation" 
              v-model="form.services" 
              value="réservation" 
              type="checkbox" 
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="service-reservation" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              📞 Réservation possible
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Réseaux sociaux -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Site web</label>
        <input v-model="form.site_web" class="input" type="url" placeholder="https://..." />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-200">WhatsApp</label>
        <input v-model="form.whatsapp" class="input" type="text" placeholder="Numéro WhatsApp" />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Facebook</label>
        <input v-model="form.facebook" class="input" type="text" placeholder="Lien Facebook" />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-200">Instagram</label>
        <input v-model="form.instagram" class="input" type="text" placeholder="Lien Instagram" />
      </div>
    </div>

    <!-- Menus et plats dynamiques -->
    <div>
      <label class="block text-gray-700 dark:text-gray-200 mb-2">Menus et plats</label>
      <div v-for="(menu, mIdx) in form.menus" :key="mIdx" class="mb-4 border rounded p-3 bg-gray-50 dark:bg-gray-800">
        <div class="flex items-center gap-2 mb-2">
          <input v-model="menu.nom" class="input flex-1" type="text" placeholder="Nom du menu (ex: Menu du jour)" />
          <input v-model="menu.prix" class="input w-32" type="number" min="0" step="0.01" placeholder="Prix (optionnel)" />
          <button type="button" @click="removeMenu(mIdx)" class="text-red-500 hover:underline">Supprimer menu</button>
        </div>
        <textarea v-model="menu.description" class="input mb-2" rows="1" placeholder="Description du menu (optionnelle)"></textarea>
        <!-- Plats du menu -->
        <div v-for="(plat, pIdx) in menu.plats" :key="pIdx" class="flex items-center gap-2 mb-2">
          <input v-model="plat.nom" class="input flex-1" type="text" placeholder="Nom du plat" />
          <input v-model="plat.prix" class="input w-24" type="number" min="0" step="0.01" placeholder="Prix" />
          <input v-model="plat.categorie" class="input w-24" type="text" placeholder="Catégorie" />
          <button type="button" @click="removePlat(mIdx, pIdx)" class="text-red-500 hover:underline">Supprimer</button>
        </div>
        <button type="button" @click="addPlat(mIdx)" class="text-indigo-600 hover:underline">+ Ajouter un plat</button>
      </div>
      <button type="button" @click="addMenu" class="text-green-600 hover:underline">+ Ajouter un menu</button>
    </div>

    <!-- Plats à la carte -->
    <div class="mt-4">
      <label class="block text-gray-700 dark:text-gray-200 mb-2">Plats à la carte</label>
      <div v-for="(plat, idx) in form.plats_a_la_carte" :key="idx" class="flex items-center gap-2 mb-2">
        <input v-model="plat.nom" class="input flex-1" type="text" placeholder="Nom du plat" />
        <input v-model="plat.prix" class="input w-24" type="number" min="0" step="0.01" placeholder="Prix" />
        <input v-model="plat.categorie" class="input w-24" type="text" placeholder="Catégorie" />
        <button type="button" @click="removePlatCarte(idx)" class="text-red-500 hover:underline">Supprimer</button>
      </div>
      <button type="button" @click="addPlatCarte" class="text-indigo-600 hover:underline">+ Ajouter un plat à la carte</button>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4 mt-6">
      <button type="button" @click="handleCancel" class="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Annuler</button>
      <button type="submit" :disabled="isSubmitting" class="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
        {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase, uploadImage } from '../supabase.js'
import { QuillEditor } from '@vueup/vue-quill'

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  nom: '',
  adresse: '',
  ville: '',
  prix_moyen: '',
  description: '', // Initialisation simple
  images: [],
  type_cuisine: '',
  services: [],
  site_web: '',
  whatsapp: '',
  facebook: '',
  instagram: '',
  menus: [],
  plats_a_la_carte: []
})

// Fonction de réinitialisation du formulaire
const resetForm = () => {
  form.value = {
    nom: '',
    adresse: '',
    ville: '',
    prix_moyen: '',
    description: '', // Réinitialisation simple
    images: [],
    type_cuisine: '',
    services: [],
    site_web: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    menus: [],
    plats_a_la_carte: []
  }
  imagePreviews.value = []
  status.value = { message: '', type: '' }
}

// Fonction pour gérer l'annulation
const handleCancel = () => {
  resetForm()
  emit('cancel')
}

const imagePreviews = ref([])
const isSubmitting = ref(false)
const status = ref({ message: '', type: '' })

function handleImages(e) {
  const files = Array.from(e.target.files)
  form.value.images = files
  imagePreviews.value = files.map(f => URL.createObjectURL(f))
}

function addMenu() {
  form.value.menus.push({ nom: '', prix: '', description: '', plats: [] })
}

function removeMenu(idx) {
  form.value.menus.splice(idx, 1)
}

function addPlat(menuIdx) {
  form.value.menus[menuIdx].plats.push({ nom: '', prix: '', categorie: '' })
}

function removePlat(menuIdx, platIdx) {
  form.value.menus[menuIdx].plats.splice(platIdx, 1)
}

function addPlatCarte() {
  form.value.plats_a_la_carte.push({ nom: '', prix: '', categorie: '' })
}

function removePlatCarte(idx) {
  form.value.plats_a_la_carte.splice(idx, 1)
}

async function uploadImages() {
  const imageUrls = []
  
  for (const file of form.value.images) {
    try {
      const { publicUrl } = await uploadImage(file, 'restaurants')
      imageUrls.push(publicUrl)
    } catch (error) {
      console.error('Erreur upload image:', error)
      throw new Error(`Erreur lors de l'upload de l'image: ${error.message}`)
    }
  }
  
  return imageUrls
}

async function createLieu(imageUrls) {
  // Gérer la description pour QuillEditor
  let description = form.value.description
  if (typeof description === 'string' && description.trim() === '') {
    description = null
  }

  const lieuData = {
    nom: form.value.nom,
    adresse: form.value.adresse,
    ville: form.value.ville,
    prix: form.value.prix_moyen ? parseFloat(form.value.prix_moyen) : null,
    description: description,
    image_principale: imageUrls.length > 0 ? imageUrls[0] : null,
    type: 'restaurant',
    created_at: new Date().toISOString()
  }

  const { data: lieu, error: lieuError } = await supabase
    .from('lieux')
    .insert([lieuData])
    .select()
    .single()

  if (lieuError) {
    console.error('Erreur création lieu:', lieuError)
    throw new Error(`Erreur lors de la création du lieu: ${lieuError.message}`)
  }

  return lieu
}

async function createRestaurant(lieuId) {
  // S'assurer que services est bien un tableau
  const servicesArray = Array.isArray(form.value.services) ? form.value.services : []
  
  const restaurantData = {
    lieu_id: lieuId,
    type_cuisine: form.value.type_cuisine || null,
    services: servicesArray,
    site_web: form.value.site_web || null,
    whatsapp: form.value.whatsapp || null,
    facebook: form.value.facebook || null,
    instagram: form.value.instagram || null
  }

  const { data: restaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .insert([restaurantData])
    .select()
    .single()

  if (restaurantError) {
    console.error('Erreur création restaurant:', restaurantError)
    throw new Error(`Erreur lors de la création du restaurant: ${restaurantError.message}`)
  }

  return restaurant
}

async function createMenus(lieuId) {
  const menusToCreate = form.value.menus.filter(menu => menu.nom.trim())
  
  for (const menu of menusToCreate) {
    const menuData = {
      lieu_id: lieuId,
      nom: menu.nom,
      prix: menu.prix ? parseFloat(menu.prix) : null,
      description: menu.description
    }

    const { data: createdMenu, error: menuError } = await supabase
      .from('menus')
      .insert([menuData])
      .select()
      .single()

    if (menuError) {
      console.error('Erreur création menu:', menuError)
      throw new Error(`Erreur lors de la création du menu: ${menuError.message}`)
    }

    // Créer les plats du menu
    const platsToCreate = menu.plats.filter(plat => plat.nom.trim())
    for (const plat of platsToCreate) {
      const platData = {
        menu_id: createdMenu.id,
        nom: plat.nom,
        prix: plat.prix ? parseFloat(plat.prix) : null,
        categorie: plat.categorie
      }

      const { error: platError } = await supabase
        .from('plats')
        .insert([platData])

      if (platError) {
        console.error('Erreur création plat:', platError)
        throw new Error(`Erreur lors de la création du plat: ${platError.message}`)
      }
    }
  }
}

async function createPlatsALaCarte(lieuId) {
  const platsToCreate = form.value.plats_a_la_carte.filter(plat => plat.nom.trim())
  
  for (const plat of platsToCreate) {
    const platData = {
      lieu_id: lieuId,
      nom: plat.nom,
      prix: plat.prix ? parseFloat(plat.prix) : null,
      categorie: plat.categorie,
      menu_id: null // Plat à la carte, pas dans un menu
    }

    const { error: platError } = await supabase
      .from('plats')
      .insert([platData])

    if (platError) {
      console.error('Erreur création plat à la carte:', platError)
      throw new Error(`Erreur lors de la création du plat à la carte: ${platError.message}`)
    }
  }
}

async function handleSubmit() {
  try {
    isSubmitting.value = true
    status.value = { message: '', type: '' }

    // 1. Upload des images
    const imageUrls = await uploadImages()

    // 2. Créer le lieu
    const lieu = await createLieu(imageUrls)

    // 3. Créer le restaurant
    await createRestaurant(lieu.id)

    // 4. Créer les menus et leurs plats
    await createMenus(lieu.id)

    // 5. Créer les plats à la carte
    await createPlatsALaCarte(lieu.id)

    // 6. Ajouter les images secondaires dans photos_lieu
    if (imageUrls.length > 1) {
      const photosData = imageUrls.slice(1).map(url => ({
        lieu_id: lieu.id,
        url: url
      }))

      const { error: photosError } = await supabase
        .from('photos_lieu')
        .insert(photosData)

      if (photosError) {
        console.error('Erreur ajout photos secondaires:', photosError)
      }
    }

    status.value = { 
      message: 'Restaurant créé avec succès !', 
      type: 'success' 
    }

    // Réinitialiser le formulaire
    resetForm()

    // Émettre l'événement de succès
    emit('submit', { success: true, lieuId: lieu.id })

  } catch (error) {
    console.error('Erreur lors de la création du restaurant:', error)
    status.value = { 
      message: error.message || 'Erreur lors de la création du restaurant', 
      type: 'error' 
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.input {
  @apply w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400;
}
</style> 