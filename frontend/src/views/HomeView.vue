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
const typedText = ref('')
const isTyping = ref(false)
const currentStep = ref(0)
const currentImage = ref(0)

const textSteps = [
  'Découvre les <span class="text-indigo-300 font-semibold">coins</span> cachés, des <span class="text-indigo-300 font-semibold">traditions</span> vivantes et des <span class="text-indigo-300 font-semibold">paysages</span> à couper le souffle.'
]

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

// Texte simple sans animation
const typeWriter = async () => {
  isTyping.value = true
  typedText.value = textSteps[0]
  isTyping.value = false
}

onMounted(() => {
  fetchArticles()
  // Démarrer l'animation après un délai
  setTimeout(typeWriter, 1000)
  
  // Auto-rotation du carrousel
  setInterval(() => {
    currentImage.value = currentImage.value === 0 ? 1 : 0
  }, 3000)
})

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
  // Mode sombre par défaut, sauf si l'utilisateur a explicitement choisi le mode clair
  if (saved === 'light') {
    applyTheme(false)
  } else {
    // Par défaut, mode sombre
    applyTheme(true)
  }
})
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <!-- Hero Section -->
    <div class="relative min-h-screen flex items-center justify-center" style="background-image: url('https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/mont-nimba-sable-mining%20(1).jpeg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <!-- Overlay sombre pour améliorer la lisibilité -->
      <div class="absolute inset-0 bg-black/40"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span class="block">La <span class="text-indigo-300">Guinée</span> comme vous ne l'avez jamais vue</span>
          </h1>
                      <p class="mt-3 max-w-md mx-auto text-base text-white/90 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl" v-html="typedText">
            </p>
          <div class="mt-8 flex justify-center">
            <router-link
              to="/lieux"
              class="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse"
            >
              Découvrir les lieux
            </router-link>
          </div>
        </div>
        <div class="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Îles de Loos -->
          <div class="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
            <img 
              src="https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/ile%20de%20loos%20guinee.jpg" 
              alt="Îles de Loos" 
              class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
              <h3 class="font-bold text-lg mb-1">Îles de Loos</h3>
              <p class="text-sm opacity-90">Détente paradisiaque à 30 min de Conakry</p>
            </div>
          </div>

          <!-- Mosquée Fayçal -->
          <div class="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
            <img 
              src="https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/IMG_20230321_141447_62.jpg" 
              alt="Mosquée Fayçal" 
              class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
              <h3 class="font-bold text-lg mb-1">Mosquée Fayçal</h3>
              <p class="text-sm opacity-90">Le plus grand lieu de culte de l'Afrique de l'Ouest</p>
            </div>
          </div>

          <!-- Cascades de la Soumba -->
          <div class="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
            <img 
              src="https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/soumab%20cascade.jpg" 
              alt="Cascades de la Soumba" 
              class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
              <h3 class="font-bold text-lg mb-1">Cascades de la Soumba</h3>
              <p class="text-sm opacity-90">Nature sauvage et rafraîchissante</p>
            </div>
          </div>

          <!-- Mamaya de kanakan et konia soli - Carrousel -->
          <div class="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/soli%20guinee%20(1).jpeg" 
                alt="Soli Guinée" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                :class="{ 'opacity-100': currentImage === 0, 'opacity-0': currentImage === 1 }"
              />
              <img 
                src="https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/mamaya%20guinee%20(1).jpeg" 
                alt="Mamaya Guinée" 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                :class="{ 'opacity-100': currentImage === 1, 'opacity-0': currentImage === 0 }"
              />
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
              <h3 class="font-bold text-lg mb-1">Mamaya de kanakan et konia soli</h3>
              <p class="text-sm opacity-90">Traditions et couleurs inoubliables</p>
            </div>
            <!-- Indicateurs de carrousel -->
            <div class="absolute top-2 right-2 flex space-x-1 z-30">
              <button 
                @click="currentImage = 0" 
                class="w-2 h-2 rounded-full transition-colors duration-300"
                :class="currentImage === 0 ? 'bg-white' : 'bg-white/50'"
              ></button>
              <button 
                @click="currentImage = 1" 
                class="w-2 h-2 rounded-full transition-colors duration-300"
                :class="currentImage === 1 ? 'bg-white' : 'bg-white/50'"
              ></button>
            </div>
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
