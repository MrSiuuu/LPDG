<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-gray-100 flex flex-col py-8 px-4">
      <div class="mb-10 flex items-center justify-center">
        <span class="text-2xl font-bold tracking-wide">Admin LPDG</span>
      </div>
      <nav class="flex-1 space-y-2">
        <button
          v-for="item in navItems"
          :key="item.tab"
          @click="setTab(item.tab)"
          class="block w-full text-left px-4 py-3 rounded transition-colors duration-150 hover:bg-gray-800 hover:text-white"
          :class="{
            'bg-gray-800 text-indigo-400 font-semibold': activeTab === item.tab,
            'text-gray-200': activeTab !== item.tab
          }"
        >
          {{ item.label }}
        </button>
      </nav>
      <button @click="logout" class="mt-10 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full">Se déconnecter</button>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-10 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- En-tête utilisateur simplifié -->
        <h2 class="text-2xl font-bold text-gray-800 mb-8">Bienvenue sur le dashboard, {{ profile.nom }}</h2>

        <div v-if="activeTab === 'dashboard'">
          <h1 class="text-3xl font-bold mb-6 text-gray-800">Bienvenue sur le dashboard administrateur</h1>
          <p class="mb-8 text-gray-700">Vous êtes connecté en tant qu'<strong>admin</strong>.</p>
          <router-link
            to="/ajouter-lieu"
            class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 mb-8"
          >
            + Ajouter un lieu touristique
          </router-link>
          <!-- Autres contenus du dashboard admin -->
          <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">Statistiques (exemple)</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <span class="text-2xl font-bold text-indigo-600">{{ lieuxCount }}</span>
                <span class="text-gray-500 mt-2">Lieux validés</span>
              </div>
              <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <span class="text-2xl font-bold text-indigo-600">{{ userCount }}</span>
                <span class="text-gray-500 mt-2">Utilisateurs</span>
              </div>
              <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <span class="text-2xl font-bold text-indigo-600">8</span>
                <span class="text-gray-500 mt-2">Articles</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="activeTab === 'utilisateurs'">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Liste des utilisateurs</h2>
          <div v-if="usersLoading" class="text-gray-500">Chargement...</div>
          <div v-else>
            <table class="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Nom</th>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Email</th>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Rôle</th>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id" class="border-t">
                  <td class="px-4 py-2 text-gray-800">{{ user.nom }}</td>
                  <td class="px-4 py-2 text-gray-800">{{ user.email }}</td>
                  <td class="px-4 py-2 text-gray-800">
                    <select 
                      v-model="user.roles.label"
                      @change="updateUserRole(user)"
                      class="border rounded px-2 py-1"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="contributor">Contributeur</option>
                      <option value="blogger">Blogueur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </td>
                  <td class="px-4 py-2 text-gray-800">
                    <button 
                      @click="updateUserRole(user)"
                      class="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Mettre à jour
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else-if="activeTab === 'lieux'">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Liste des lieux</h2>
          <div v-if="lieuxLoading" class="text-gray-500">Chargement...</div>
          <div v-else>
            <table class="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Nom</th>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Ville</th>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Type</th>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Description</th>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Statut</th>
                  <th class="px-4 py-2 text-left text-gray-700 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lieu in lieux" :key="lieu.id" class="border-t">
                  <td class="px-4 py-2 text-gray-800">{{ lieu.nom }}</td>
                  <td class="px-4 py-2 text-gray-800">{{ lieu.ville }}</td>
                  <td class="px-4 py-2 text-gray-800">{{ lieu.type }}</td>
                  <td class="px-4 py-2 text-gray-800">{{ lieu.description }}</td>
                  <td class="px-4 py-2 text-gray-800">
                    <span :class="{
                      'px-2 py-1 rounded text-sm': true,
                      'bg-yellow-100 text-yellow-800': !lieu.est_valide,
                      'bg-green-100 text-green-800': lieu.est_valide
                    }">
                      {{ lieu.est_valide ? 'Validé' : 'En attente' }}
                    </span>
                  </td>
                  <td class="px-4 py-2 text-gray-800">
                    <button 
                      @click="toggleValidation(lieu)" 
                      :class="{
                        'px-3 py-1 rounded mr-2': true,
                        'bg-green-600 text-white hover:bg-green-700': !lieu.est_valide,
                        'bg-yellow-600 text-white hover:bg-yellow-700': lieu.est_valide
                      }"
                    >
                      {{ lieu.est_valide ? 'Dévalider' : 'Valider' }}
                    </button>
                    <button @click="editLieu(lieu)" class="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">Modifier</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Modal d'édition de lieu -->
            <LieuModal
              :show="showLieuModal"
              :editing-lieu="editingLieu"
              :show-statut="true"
              @close="closeLieuModal"
              @submit="updateLieu"
            />
          </div>
        </div>
        <div v-else-if="activeTab === 'profil'">
          <ProfileEdit :profile="profile" @update="handleProfileUpdate" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import LieuModal from '@/components/LieuModal.vue'
import axios from 'axios'
import ProfileEdit from './ProfileEdit.vue'

const router = useRouter()
const profile = ref({})
const showLieuModal = ref(false)
const editingLieu = ref(null)

// Navigation items
const navItems = [
  { label: 'Accueil', tab: 'dashboard' },
  { label: 'Utilisateurs', tab: 'utilisateurs' },
  { label: 'Lieux', tab: 'lieux' },
  { label: 'Profil', tab: 'profil' }
]

const activeTab = ref('dashboard')

// Charger le profil
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

function setTab(tab) {
  activeTab.value = tab
  if (tab === 'utilisateurs') fetchUsers()
  if (tab === 'lieux') fetchLieux()
}

function logout() {
  localStorage.removeItem('user_role')
  router.push('/login')
}

// Statistiques
const userCount = ref(0)
const lieuxCount = ref(0)

onMounted(async () => {
  await fetchProfile() // Charger le profil au démarrage
  
  // Compter les utilisateurs
  const { count: userCountData } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
  userCount.value = userCountData

  // Compter les lieux
  const { count: lieuxCountData } = await supabase
    .from('lieux')
    .select('*', { count: 'exact', head: true })
  lieuxCount.value = lieuxCountData
})

// Utilisateurs
const users = ref([])
const usersLoading = ref(false)
async function fetchUsers() {
  usersLoading.value = true
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*, roles(label)')
      .order('created_at', { ascending: false })

    if (error) throw error
    users.value = data || []
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error.message)
  }
  usersLoading.value = false
}

// Lieux
const lieux = ref([])
const lieuxLoading = ref(false)

function editLieu(lieu) {
  editingLieu.value = lieu
  showLieuModal.value = true
}

const closeLieuModal = () => {
  showLieuModal.value = false
  editingLieu.value = null
}

const updateLieu = async (lieuData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non authentifié')

    const { error } = await supabase
      .from('lieux')
      .update(lieuData)
      .eq('id', lieuData.id)

    if (error) throw error

    // Rafraîchir la liste des lieux
    await fetchLieux()
    closeLieuModal()
  } catch (error) {
    console.error('Erreur lors de la mise à jour du lieu:', error.message)
  }
}

const toggleValidation = async (lieu) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non authentifié')

    const { error } = await supabase
      .from('lieux')
      .update({ est_valide: !lieu.est_valide })
      .eq('id', lieu.id)

    if (error) throw error

    // Rafraîchir la liste des lieux
    await fetchLieux()
  } catch (error) {
    console.error('Erreur lors de la validation du lieu:', error.message)
  }
}

async function fetchLieux() {
  lieuxLoading.value = true
  const { data, error } = await supabase
    .from('lieux')
    .select('id, nom, ville, type, description, est_valide')
  lieux.value = data || []
  lieuxLoading.value = false
}

const updateUserRole = async (user) => {
  try {
    // D'abord, récupérer l'ID du rôle
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('label', user.roles.label)
      .single()

    if (roleError) throw roleError

    // Mettre à jour le rôle de l'utilisateur
    const { error } = await supabase
      .from('user_profiles')
      .update({ role_id: roleData.id })
      .eq('id', user.id)

    if (error) throw error

    // Rafraîchir la liste des utilisateurs
    await fetchUsers()
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle:', error.message)
  }
}
</script> 