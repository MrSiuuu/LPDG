<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-purple-900 text-white flex flex-col py-8 px-4">
      <div class="mb-10 flex items-center justify-center">
        <span class="text-xl font-bold">Blogueur</span>
      </div>
      <nav class="flex-1 space-y-2">
        <button
          v-for="item in navItems"
          :key="item.tab"
          @click="setTab(item.tab)"
          class="flex items-center w-full text-left px-4 py-3 rounded hover:bg-purple-800"
          :class="{
            'bg-purple-800 font-semibold': activeTab === item.tab,
            'text-white': activeTab !== item.tab
          }"
        >
          <component :is="item.icon" class="w-5 h-5 mr-3" />
          {{ item.label }}
        </button>
      </nav>
      <button @click="logout" class="mt-10 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full">Se déconnecter</button>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div v-if="profile.prenom || profile.nom" class="text-2xl font-semibold text-gray-800 mb-2">Bonjour {{ profile.prenom || profile.nom }} !</div>
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Tableau de bord</h1>

      <!-- En-tête avec photo de profil et bouton d'édition -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:px-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ profile.nom }}
              </h3>
              <p class="text-sm text-gray-500">{{ profile.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'dashboard'">
        <!-- Statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-purple-600">{{ totalArticles }}</div>
            <div class="text-gray-500">Total des articles</div>
          </div>
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-yellow-600">{{ articlesEnAttente }}</div>
            <div class="text-gray-500">En attente</div>
          </div>
          <div class="bg-white shadow rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-green-600">{{ articlesPublies }}</div>
            <div class="text-gray-500">Publiés</div>
          </div>
        </div>

        <!-- Actions Rapides -->
        <div class="mt-10">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Actions rapides</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button @click="goToCreateArticle" class="border-2 border-purple-300 rounded-lg p-6 text-center hover:bg-purple-50">
              <div class="text-lg font-medium text-purple-700">+ Écrire un article</div>
            </button>
            <button @click="setTab('articles')" class="border-2 border-purple-300 rounded-lg p-6 text-center hover:bg-purple-50">
              <div class="text-lg font-medium text-purple-700">Voir mes articles</div>
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'articles'">
        <ArticleList
          :user-id="userId"
          :refresh-key="refreshKey"
          @edit="editArticle"
          @refresh="onArticleChanged"
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
import ArticleList from '../components/ArticleList.vue'
import ProfileEdit from './ProfileEdit.vue'
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  UserIcon 
} from '@heroicons/vue/24/outline'

const router = useRouter()
const profile = ref({})
const refreshKey = ref(0)
const userId = localStorage.getItem('user_id')
const activeTab = ref('dashboard')

// Navigation items
const navItems = [
  { tab: 'dashboard', label: 'Tableau de bord', icon: ChartBarIcon },
  { tab: 'articles', label: 'Mes articles', icon: DocumentTextIcon },
  { tab: 'profil', label: 'Mon profil', icon: UserIcon }
]

// Statistiques
const totalArticles = ref(0)
const articlesEnAttente = ref(0)
const articlesPublies = ref(0)

const handleImageError = (e) => {
  e.target.src = '/default-avatar.png'
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
}

function logout() {
  localStorage.removeItem('user_role')
  router.push('/login')
}

function goToCreateArticle() {
  router.push('/article/nouveau')
}

function editArticle(article) {
  // This function is no longer used as the new logic handles article creation
}

function onArticleChanged() {
  refreshKey.value++
  fetchStats()
}

const fetchStats = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non authentifié')

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('user_id', user.id)

    if (error) throw error

    totalArticles.value = data.length
    articlesEnAttente.value = data.filter(article => article.brouillon).length
    articlesPublies.value = data.filter(article => !article.brouillon).length
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error.message)
  }
}

onMounted(() => {
  fetchProfile()
  fetchStats()
})
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.hover\:bg-purple-50:hover {
  background-color: rgb(250, 245, 255);
}

.hover\:bg-purple-800:hover {
  background-color: rgb(107, 33, 168);
}

.hover\:bg-red-700:hover {
  background-color: rgb(185, 28, 28);
}
</style> 