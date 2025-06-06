<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-indigo-900 text-white flex flex-col py-8 px-4">
      <div class="mb-10 flex items-center justify-center">
        <span class="text-xl font-bold">Contributeur</span>
      </div>
      <nav class="flex-1 space-y-2">
        <button
          v-for="item in navItems"
          :key="item.tab"
          @click="setTab(item.tab)"
          class="block w-full text-left px-4 py-3 rounded hover:bg-indigo-800"
          :class="{
            'bg-indigo-800 font-semibold': activeTab === item.tab,
            'text-white': activeTab !== item.tab
          }"
        >
          {{ item.label }}
        </button>
      </nav>
      <button @click="logout" class="mt-10 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full">Se déconnecter</button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Tableau de bord</h1>

      <!-- En-tête avec photo de profil et bouton d'édition -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                :src="profile.photo || 'https://via.placeholder.com/150'"
                alt="Avatar"
                class="h-16 w-16 rounded-full"
              />
              <div class="ml-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {{ profile.nom }}
                </h3>
                <p class="text-sm text-gray-500">{{ profile.email }}</p>
              </div>
            </div>
            <button
              @click="showEditModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Modifier le profil
            </button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'dashboard'">
        <!-- Statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-indigo-600">{{ totalLieux }}</div>
            <div class="text-gray-500">Total des lieux</div>
          </div>
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-yellow-600">{{ lieuxEnAttente }}</div>
            <div class="text-gray-500">En attente</div>
          </div>
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-green-600">{{ lieuxValides }}</div>
            <div class="text-gray-500">Validés</div>
          </div>
        </div>

        <!-- Actions Rapides -->
        <div class="mt-10">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Actions rapides</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button @click="showAjouterLieu = true" class="border-2 border-indigo-300 rounded-lg p-6 text-center hover:bg-indigo-50">
              <div class="text-lg font-medium text-indigo-700">+ Ajouter un lieu</div>
            </button>
            <button @click="setTab('lieux')" class="border-2 border-indigo-300 rounded-lg p-6 text-center hover:bg-indigo-50">
              <div class="text-lg font-medium text-indigo-700">Voir mes lieux</div>
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'lieux'">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Mes lieux récents</h2>
        <div v-if="lieuxRecents.length">
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white shadow rounded">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left px-4 py-2 text-sm font-semibold text-gray-600">Nom</th>
                  <th class="text-left px-4 py-2 text-sm font-semibold text-gray-600">Statut</th>
                  <th class="text-left px-4 py-2 text-sm font-semibold text-gray-600">Ajouté le</th>
                  <th class="text-left px-4 py-2 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lieu in lieuxRecents" :key="lieu.id" class="border-t">
                  <td class="px-4 py-2">{{ lieu.nom }}</td>
                  <td class="px-4 py-2">
                    <span :class="{
                      'text-yellow-600': lieu.est_valide === false,
                      'text-green-600': lieu.est_valide === true
                    }">{{ getStatutLabel(lieu.est_valide) }}</span>
                  </td>
                  <td class="px-4 py-2">{{ formatDate(lieu.created_at) }}</td>
                  <td class="px-4 py-2">
                    <button @click="editLieu(lieu)" class="text-indigo-600 hover:underline mr-2">Modifier</button>
                    <button @click="deleteLieu(lieu)" class="text-red-600 hover:underline">Supprimer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500">Aucun lieu ajouté pour le moment.</p>
        </div>
        <button @click="setTab('dashboard')" class="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Retour au tableau de bord</button>
      </div>

      <div v-else-if="activeTab === 'profil'">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Mon profil</h2>
        <p class="text-gray-500">Fonctionnalité à compléter : affichage du profil utilisateur.</p>
        <button @click="setTab('dashboard')" class="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Retour au tableau de bord</button>
      </div>

      <!-- Modal Ajouter / Modifier -->
      <LieuModal
        :show="showAjouterLieu"
        :editing-lieu="editingLieu"
        :show-statut="false"
        @close="closeModal"
        @submit="submitLieu"
      />

      <!-- Modal d'édition -->
      <EditProfileModal
        :is-open="showEditModal"
        :profile="profile"
        @close="showEditModal = false"
        @update="handleProfileUpdate"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import axios from 'axios'
import LieuModal from '../components/LieuModal.vue'
import EditProfileModal from '../components/modals/EditProfileModal.vue'

const router = useRouter()
const loading = ref(true)
const showAjouterLieu = ref(false)
const showMesLieux = ref(false)
const editingLieu = ref(null)
const activeTab = ref('dashboard')
const showEditModal = ref(false)
const profile = ref({})

// Navigation items
const navItems = [
  { tab: 'dashboard', label: 'Tableau de bord' },
  { tab: 'lieux', label: 'Mes lieux' },
  { tab: 'profil', label: 'Mon profil' }
]

// Statistiques
const totalLieux = ref(0)
const lieuxEnAttente = ref(0)
const lieuxValides = ref(0)

// Liste des lieux
const lieuxRecents = ref([])

// Formulaire
const lieuForm = ref({
  nom: '',
  description: '',
  adresse: '',
  categorie: ''
})

// Changer d'onglet
const setTab = (tab) => {
  activeTab.value = tab
}

// Déconnexion
const logout = async () => {
  try {
    await supabase.auth.signOut()
    localStorage.removeItem('user_role')
    router.push('/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}

// Charger les données
const loadData = async () => {
  loading.value = true
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const [lieuxResponse, statsResponse] = await Promise.all([
      axios.get('/api/lieux/user/lieux', { headers }),
      axios.get('/api/lieux/user/stats', { headers })
    ])

    lieuxRecents.value = lieuxResponse.data
    totalLieux.value = statsResponse.data.total
    lieuxEnAttente.value = statsResponse.data.en_attente
    lieuxValides.value = statsResponse.data.valides
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
  loading.value = false
}

// Formater la date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Obtenir le label du statut
const getStatutLabel = (estValide) => {
  if (estValide === true) return 'Validé'
  if (estValide === false) return 'En attente'
  return 'Inconnu'
}

// Modifier la fonction submitLieu pour utiliser le nouveau format
const submitLieu = async (formData) => {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    if (editingLieu.value) {
      await axios.put(`/api/lieux/${editingLieu.value.id}`, formData, { headers })
    } else {
      await axios.post('/api/lieux', formData, { headers })
    }

    closeModal()
    loadData()
  } catch (error) {
    console.error('Erreur lors de la soumission du lieu:', error)
  }
}

// Éditer un lieu
const editLieu = (lieu) => {
  editingLieu.value = lieu
  lieuForm.value = { ...lieu }
  showAjouterLieu.value = true
}

// Supprimer un lieu
const deleteLieu = async (lieu) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) return

  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    await axios.delete(`/api/lieux/${lieu.id}`, { headers })
    loadData()
  } catch (error) {
    console.error('Erreur lors de la suppression du lieu:', error)
  }
}

// Fermer le modal
const closeModal = () => {
  showAjouterLieu.value = false
  editingLieu.value = null
  lieuForm.value = {
    nom: '',
    description: '',
    adresse: '',
    categorie: ''
  }
}

const handleProfileUpdate = (updatedProfile) => {
  profile.value = { ...profile.value, ...updatedProfile }
}

onMounted(() => {
  loadData()
  fetchProfile()
})

const fetchProfile = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non authentifié')

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*, roles(label)')
      .eq('id', user.id)
      .single()

    if (error) throw error
    profile.value = data
  } catch (error) {
    console.error('Erreur lors du chargement du profil:', error.message)
    router.push('/login')
  }
}
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.hover\:bg-indigo-50:hover {
  background-color: rgb(238, 242, 255);
}

.hover\:bg-indigo-800:hover {
  background-color: rgb(55, 48, 163);
}

.hover\:bg-red-700:hover {
  background-color: rgb(185, 28, 28);
}
</style>
