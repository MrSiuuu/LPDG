<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LieuxAccueil from '../components/LieuxAccueil.vue'
import ArticleCard from '../components/ArticleCard.vue'
import HeroVideoPoints from '../components/HeroVideoPoints.vue'
import axios from 'axios'

const router = useRouter()
const role = localStorage.getItem('user_role')
const isAuthenticated = !!role

const articles = ref([])
const loading = ref(true)

const handleLogout = () => {
  localStorage.removeItem('user_role')
  router.push('/login')
}

async function fetchArticles() {
  loading.value = true
  try {
    const { data } = await axios.get('/api/articles')
    articles.value = data
  } catch (e) {
    articles.value = []
  }
  loading.value = false
}

onMounted(fetchArticles)

// --- DARK MODE ---
const isDark = ref(false)

function applyTheme(dark) {
  const html = document.documentElement
  if (dark) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
  isDark.value = dark
}

function toggleDark() {
  applyTheme(!isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  applyTheme(saved === 'dark')
})
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <!-- Hero Section -->
    <div class="bg-white dark:bg-gray-800 transition-colors duration-300 relative animated-grid-bg" style="background-image: url('/grid-bg.svg'); background-size: cover; background-repeat: repeat; background-position: center;">
      <div class="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            <span class="block">Découvrez, partagez et explorez</span>
            <span class="block text-indigo-600 dark:text-indigo-400">les lieux touristiques de Guinée</span>
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Plateforme collaborative pour voyageurs, contributeurs, blogueurs et administrateurs.<br>
            Ajoutez des lieux, partagez vos avis, écrivez des articles, ou gérez la communauté !
          </p>
          <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <router-link
              to="/register"
              class="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              S'inscrire
            </router-link>
            <router-link
              to="/login"
              class="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 md:py-4 md:text-lg md:px-10 border rounded-md"
            >
              Se connecter
            </router-link>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-indigo-50 dark:bg-gray-700 p-4 rounded shadow text-center transition-colors duration-300">
            <h2 class="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Utilisateur</h2>
            <p class="text-sm text-gray-600 dark:text-gray-200">Découvre les lieux, laisse des avis, marque "déjà visité".</p>
          </div>
          <div class="bg-indigo-50 dark:bg-gray-700 p-4 rounded shadow text-center transition-colors duration-300">
            <h2 class="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Contributeur</h2>
            <p class="text-sm text-gray-600 dark:text-gray-200">Ajoute de nouveaux lieux touristiques et enrichis la base.</p>
          </div>
          <div class="bg-indigo-50 dark:bg-gray-700 p-4 rounded shadow text-center transition-colors duration-300">
            <h2 class="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Blogueur</h2>
            <p class="text-sm text-gray-600 dark:text-gray-200">Publie des articles, partage tes expériences et conseils.</p>
          </div>
          <div class="bg-indigo-50 dark:bg-gray-700 p-4 rounded shadow text-center transition-colors duration-300">
            <h2 class="font-bold text-indigo-700 dark:text-indigo-300 mb-2">Administrateur</h2>
            <p class="text-sm text-gray-600 dark:text-gray-200">Valide les lieux, gère les utilisateurs et la communauté.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section vidéo + points clés -->
    <HeroVideoPoints />

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto py-10 px-4">
          <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Bienvenue sur LPDG</h1>
          <div v-if="loading" class="text-center">Chargement...</div>
          <!--
          <div v-else-if="articles.length === 0" class="text-center text-gray-500 dark:text-gray-300">Aucun article trouvé.</div>
          -->
          <!--
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
          </div>
          -->
        </div>
        <LieuxAccueil />
      </div>
    </main>
  </div>
</template>
