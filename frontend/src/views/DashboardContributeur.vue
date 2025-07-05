<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-indigo-900 text-white flex flex-col py-8 px-4">
      <div class="mb-10 flex items-center justify-center">
        <span class="text-xl font-bold dark:text-white">Contributeur</span>
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
    <main class="flex-1 p-6 mt-5">
      <div v-if="profile.prenom || profile.nom" class="text-2xl font-semibold text-gray-900 mt-12">Bonjour {{ profile.prenom || profile.nom }} !</div>
      <h1 class="text-3xl font-bold mb-6 text-gray-900">Tableau de bord</h1>

      <!-- En-tête avec photo de profil et bouton d'édition -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="h-16 w-16 rounded-full bg-indigo-200 flex items-center justify-center text-2xl font-bold text-indigo-800 uppercase">
                {{ getInitiales(profile.nom) }}
              </div>
              <div class="ml-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {{ profile.nom }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-300">{{ profile.email }}</p>
              </div>
            </div>
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
          <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Actions rapides</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button @click="setTab('ajouter')" class="border-2 border-indigo-300 rounded-lg p-6 text-center hover:bg-indigo-50">
              <div class="text-lg font-medium text-indigo-700">+ Ajouter un lieu</div>
            </button>
            <button @click="setTab('lieux')" class="border-2 border-indigo-300 rounded-lg p-6 text-center hover:bg-indigo-50">
              <div class="text-lg font-medium text-indigo-700">Voir mes lieux</div>
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'lieux'">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-4">Mes lieux récents</h2>
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
          <p class="text-gray-500 dark:text-gray-300">Aucun lieu ajouté pour le moment.</p>
        </div>
        <button @click="setTab('dashboard')" class="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Retour au tableau de bord</button>
      </div>

      <div v-else-if="activeTab === 'ajouter'">
        <LieuForm 
          :editing-lieu="editingLieu" 
          @submit="submitLieu" 
          @cancel="cancelForm" 
        />
      </div>

      <div v-else-if="activeTab === 'profil'">
        <ProfileEdit :profile="profile" @update="handleProfileUpdate" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import axios from 'axios'
import LieuForm from '../components/LieuForm.vue'
import ProfileEdit from './ProfileEdit.vue'

const router = useRouter()
const loading = ref(true)
const editingLieu = ref(null)
const activeTab = ref('dashboard')
const profile = ref({})

// Navigation items
const navItems = [
  { tab: 'dashboard', label: 'Tableau de bord' },
  { tab: 'lieux', label: 'Mes lieux' },
  { tab: 'ajouter', label: 'Ajouter un lieu' },
  { tab: 'profil', label: 'Mon profil' }
]

// Statistiques
const totalLieux = ref(0)
const lieuxEnAttente = ref(0)
const lieuxValides = ref(0)

// Liste des lieux
const lieuxRecents = ref([])

// Changer d'onglet
const setTab = (tab) => {
  activeTab.value = tab
  // Réinitialiser le lieu en édition si on change d'onglet
  if (tab !== 'ajouter') {
    editingLieu.value = null
  }
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
      axios.get(`${import.meta.env.VITE_API_URL}/api/lieux/user/lieux`, { headers }),
      axios.get(`${import.meta.env.VITE_API_URL}/api/lieux/user/stats`, { headers })
    ])

    if (Array.isArray(lieuxResponse.data)) {
      lieuxRecents.value = lieuxResponse.data
    } else {
      console.error('Réponse inattendue:', lieuxResponse.data)
      lieuxRecents.value = []
    }
    totalLieux.value = statsResponse.data.totalLieux
    lieuxEnAttente.value = statsResponse.data.lieuxEnAttente
    lieuxValides.value = statsResponse.data.lieuxValides
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
      await axios.put(`${import.meta.env.VITE_API_URL}/api/lieux/${editingLieu.value.id}`, formData, { headers })
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/lieux`, formData, { headers })
    }

    // Réinitialiser et retourner au tableau de bord
    editingLieu.value = null
    setTab('dashboard')
    loadData()
  } catch (error) {
    console.error('Erreur lors de la soumission du lieu:', error)
  }
}

// Éditer un lieu
const editLieu = (lieu) => {
  editingLieu.value = lieu
  setTab('ajouter')
}

// Supprimer un lieu
const deleteLieu = async (lieu) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) return

  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    await axios.delete(`${import.meta.env.VITE_API_URL}/api/lieux/${lieu.id}`, { headers })
    loadData()
  } catch (error) {
    console.error('Erreur lors de la suppression du lieu:', error)
  }
}

// Annuler le formulaire
const cancelForm = () => {
  editingLieu.value = null
  setTab('dashboard')
}

const handleProfileUpdate = async (updatedProfile) => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update(updatedProfile)
      .eq('id', profile.value.id)
    if (error) throw error
    profile.value = { ...profile.value, ...updatedProfile }
  } catch (error) {
    alert('Erreur lors de la mise à jour du profil : ' + error.message)
  }
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

function getInitiales(nom) {
  if (!nom) return ''
  const parts = nom.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2)
  return (parts[0][0] + parts[1][0]).toUpperCase()
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
