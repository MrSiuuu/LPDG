<template>
  <div class="min-h-screen flex flex-col bg-gray-100 md:flex-row pt-12 md:pt-16">
    <!-- Sidebar Desktop -->
    <aside class="w-64 bg-gray-900 text-gray-100 flex-col py-8 px-4 hidden md:flex">
      <div class="mb-10 flex items-center justify-center">
        <span class="text-2xl font-bold tracking-wide">Espace Utilisateur</span>
      </div>
      <nav class="flex-1 space-y-2">
        <button
          v-for="item in navItems"
          :key="item.tab"
          @click="setTab(item.tab)"
          class="flex items-center w-full text-left px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:translate-x-1"
          :class="{
            'bg-gray-800 text-indigo-400 font-semibold': activeTab === item.tab,
            'text-gray-300': activeTab !== item.tab
          }"
        >
          <span class="mr-3 text-xl">{{ item.icon }}</span>
          {{ item.label }}
        </button>
      </nav>
      <button @click="logout" class="mt-10 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 w-full shadow-lg hover:shadow-xl">
        🔐 Déconnexion
      </button>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-4 md:p-10 bg-gray-50 pb-24 md:pb-10">
      <div class="max-w-7xl mx-auto py-4 md:py-6 px-2 sm:px-6 lg:px-8">
        <!-- Onglet Dashboard -->
        <div v-show="activeTab === 'dashboard'">
          <div v-if="profile.prenom || profile.nom" class="text-2xl font-semibold text-gray-800 mb-2">Bonjour {{ profile.prenom || profile.nom }} !</div>
          <h1 class="text-3xl font-bold mb-6 text-gray-900">Bienvenue sur votre espace</h1>
          <div class="bg-white shadow rounded-lg mb-6">
            <div class="px-4 py-5 sm:px-6">
              <div class="flex items-center">
                <UserAvatar 
                  :nom="profile.nom" 
                  :prenom="profile.prenom" 
                  size="lg"
                />
                <div class="ml-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ profile.nom }}
                  </h3>
                  <p class="text-sm text-gray-500">{{ profile.email }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h2 class="text-lg font-medium text-gray-900">Tableau de bord</h2>
              <!-- Ajoutez ici le contenu spécifique du dashboard -->
            </div>
          </div>
        </div>

        <!-- Onglet Accueil du site -->
        <div v-show="activeTab === 'accueil'">
          <h2 class="text-2xl font-bold mb-6 text-gray-900">Retour à l'accueil</h2>
          <div class="bg-white shadow rounded-lg p-6">
            <p class="text-gray-600 mb-4">Vous allez quitter votre espace personnel pour retourner à l'accueil du site.</p>
            <router-link 
              to="/" 
              class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <span class="mr-2">🏠</span>
              Aller à l'accueil du site
            </router-link>
          </div>
        </div>

        <!-- Onglet Favoris & Visites -->
        <div v-show="activeTab === 'favoris'">
          <h2 class="text-2xl font-bold mb-6 text-gray-900">Mes lieux favoris & visités</h2>
          <!-- Lieux likés -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-indigo-700 mb-2">Lieux likés</h3>
            <div v-if="loadingLikedLieux" class="text-center py-4">
              <p class="text-gray-500">Chargement de vos lieux favoris...</p>
            </div>
            <div v-else-if="likedLieux.length === 0" class="text-center py-8">
              <p class="text-gray-500">Vous n'avez pas encore liké de lieux.</p>
              <router-link to="/" class="text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                Découvrir des lieux
              </router-link>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="lieu in likedLieux" 
                :key="'like-' + lieu.id" 
                class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">{{ lieu.nom }}</h3>
                    <p class="text-sm text-gray-600">{{ lieu.ville }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ lieu.type }}</p>
                    <p v-if="lieu.prix" class="text-sm text-indigo-600 font-medium mt-1">
                      {{ lieu.prix }}€
                    </p>
                  </div>
                  <button 
                    @click="unlikeLieu(lieu.id)"
                    class="text-red-500 hover:text-red-700 ml-2"
                    title="Retirer des favoris"
                  >
                    ❤️
                  </button>
                </div>
                <div v-if="lieu.image_principale" class="mt-3">
                  <img 
                    :src="lieu.image_principale" 
                    :alt="lieu.nom"
                    class="w-full h-32 object-cover rounded"
                  />
                </div>
                <div class="mt-3">
                  <router-link 
                    :to="`/lieu/${lieu.id}`"
                    class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Voir les détails →
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- Lieux visités -->
          <div>
            <h3 class="text-lg font-semibold text-green-700 mb-2">Lieux visités</h3>
            <div v-if="loadingVisitedLieux" class="text-center py-4">
              <p class="text-gray-500">Chargement de vos lieux visités...</p>
            </div>
            <div v-else-if="visitedLieux.length === 0" class="text-center py-8">
              <p class="text-gray-500">Vous n'avez pas encore visité de lieux.</p>
              <router-link to="/" class="text-green-600 hover:text-green-800 mt-2 inline-block">
                Explorer des lieux
              </router-link>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="lieu in visitedLieux" 
                :key="'visited-' + lieu.id" 
                class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">{{ lieu.nom }}</h3>
                    <p class="text-sm text-gray-600">{{ lieu.ville }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ lieu.type }}</p>
                    <p v-if="lieu.prix" class="text-sm text-indigo-600 font-medium mt-1">
                      {{ lieu.prix }}€
                    </p>
                  </div>
                  <span class="text-green-600 ml-2 font-bold" title="Déjà visité">✅</span>
                </div>
                <div v-if="lieu.image_principale" class="mt-3">
                  <img 
                    :src="lieu.image_principale" 
                    :alt="lieu.nom"
                    class="w-full h-32 object-cover rounded"
                  />
                </div>
                <div class="mt-3">
                  <router-link 
                    :to="`/lieu/${lieu.id}`"
                    class="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Voir les détails →
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Onglet Profil -->
        <div v-show="activeTab === 'profil'">
          <h2 class="text-2xl font-bold mb-6 text-gray-900">Mon profil</h2>
          <ProfileEdit :profile="profile" @update="handleProfileUpdate" />
          <div v-if="successMessage" class="text-green-600 text-center mt-4 font-semibold">{{ successMessage }}</div>
        </div>
      </div>
    </main>

    <!-- Barre d'onglets mobile en bas -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around md:hidden z-50">
      <button 
        v-for="item in navItems" 
        :key="item.tab" 
        @click="setTab(item.tab)" 
        class="flex flex-col items-center py-2 flex-1" 
        :class="activeTab === item.tab ? 'text-indigo-600' : 'text-gray-400'"
      >
        <span class="text-xl mb-1">{{ item.icon }}</span>
        <span class="text-xs">{{ item.label }}</span>
      </button>
      <button @click="logout" class="flex flex-col items-center py-2 flex-1 text-red-500">
        <span class="text-xl mb-1">🔐</span>
        <span class="text-xs">Déconnexion</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import axios from 'axios'
import ProfileEdit from './ProfileEdit.vue'
import UserAvatar from '../components/UserAvatar.vue'

const router = useRouter()
const profile = ref({})
const activeTab = ref('dashboard')
const likedLieux = ref([])
const visitedLieux = ref([])
const loadingLikedLieux = ref(false)
const loadingVisitedLieux = ref(false)
const successMessage = ref('')

const navItems = [
  { label: 'Dashboard', tab: 'dashboard', icon: '📊' },
  { label: 'Accueil', tab: 'accueil', icon: '🏠' },
  { label: 'Favoris', tab: 'favoris', icon: '❤️' },
  { label: 'Profil', tab: 'profil', icon: '👤' }
]

function setTab(tab) {
  activeTab.value = tab
  if (tab === 'favoris') {
    fetchLikedLieux()
    fetchVisitedLieux()
  }
}

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

const fetchLikedLieux = async () => {
  loadingLikedLieux.value = true
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const { data } = await axios.get('/api/lieux/user/likes', { headers })
    likedLieux.value = data || []
  } catch (error) {
    likedLieux.value = []
  } finally {
    loadingLikedLieux.value = false
  }
}

const fetchVisitedLieux = async () => {
  loadingVisitedLieux.value = true
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    const { data } = await axios.get('/api/lieux/user/visited', { headers })
    visitedLieux.value = data || []
  } catch (error) {
    visitedLieux.value = []
  } finally {
    loadingVisitedLieux.value = false
  }
}

const unlikeLieu = async (lieuId) => {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData?.session?.access_token
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    
    await axios.post(`/api/lieux/${lieuId}/like`, {}, { headers })
    
    // Retirer le lieu de la liste locale
    likedLieux.value = likedLieux.value.filter(lieu => lieu.id !== lieuId)
  } catch (error) {
    console.error('Erreur lors du unlike:', error)
  }
}

const handleProfileUpdate = async (updatedProfile) => {
  try {
    // Toujours inclure les champs obligatoires depuis le profil actuel si non modifiés
    const payload = {
      ...profile.value, // tous les champs actuels
      ...updatedProfile // écrase ceux modifiés par l'utilisateur
    }
    // On ne garde que les champs pertinents pour la table user_profiles
    const { nom, email, role_id, prenom, adresse, ville, telephone, photo } = payload

    const { error } = await supabase
      .from('user_profiles')
      .update({ nom, email, role_id, prenom, adresse, ville, telephone, photo })
      .eq('id', profile.value.id)
    if (error) throw error
    profile.value = { ...profile.value, ...updatedProfile }
    successMessage.value = 'Vous avez mis à jour votre profil avec succès.'
    setTimeout(() => { successMessage.value = '' }, 4000)
  } catch (error) {
    alert('Erreur lors de la mise à jour du profil : ' + error.message)
  }
}

const logout = () => {
  localStorage.removeItem('user_role')
  router.push('/login')
}

onMounted(() => {
  fetchProfile()
})
</script> 