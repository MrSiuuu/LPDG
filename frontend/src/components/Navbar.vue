<template>
  <nav class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/50 fixed w-full z-20 top-0 left-0">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Titre à gauche -->
      <router-link to="/" class="flex items-center space-x-2">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Logo LPDG">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">LPDG</span>
      </router-link>
      <!-- Barre de recherche masquée car il y a déjà un filtre sur la page -->
      <!--
      <form @submit.prevent="onSearch" class="hidden md:flex items-center mx-4 w-96 max-w-xs">
        <input v-model="searchQuery" type="text" placeholder="Rechercher un lieu, une ville..." class="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600">Rechercher</button>
      </form>
      -->
      <!-- Liens à droite -->
      <div class="flex items-center space-x-4">
        <template v-if="isAuthenticated">
          <template v-if="role === 'user'">
            <router-link to="/dashboard-user" class="btn btn-ghost normal-case text-base text-indigo-700 hidden md:inline-flex">Mon espace</router-link>
          </template>
          <template v-else-if="role === 'contributor'">
            <router-link to="/dashboard-contributeur" class="btn btn-ghost normal-case text-base text-indigo-700 hidden md:inline-flex">Espace Contributeur</router-link>
          </template>
          <template v-else-if="role === 'blogger'">
            <router-link to="/dashboard-blogueur" class="btn btn-ghost normal-case text-base text-indigo-700 hidden md:inline-flex">Espace Blogueur</router-link>
          </template>
          <template v-else-if="role === 'admin'">
            <router-link to="/adminlpdg" class="btn btn-ghost normal-case text-base text-red-700 hidden md:inline-flex">Admin</router-link>
          </template>
          <button @click="handleLogout" class="ml-4 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hidden md:inline-block">Déconnexion</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost normal-case text-base text-gray-800 dark:text-gray-200 hidden md:inline-flex">Connexion</router-link>
          <router-link to="/register" class="btn btn-ghost normal-case text-base text-gray-800 dark:text-gray-200 hidden md:inline-flex">Inscription</router-link>
        </template>
        <!-- Toggle dark mode desktop -->
        <button
          @click="toggleDark"
          aria-label="Basculer le mode sombre"
          class="w-16 h-8 items-center rounded-full transition-colors duration-300 focus:outline-none border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow hidden md:flex"
        >
          <span class="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                :class="isDark ? 'translate-x-8 bg-white' : 'translate-x-0 bg-white'">
            <span v-if="!isDark" class="text-yellow-500 text-xl">&#9728;</span>
            <span v-else class="text-yellow-400 text-xl">&#9789;</span>
          </span>
        </button>
        <!-- Bouton hamburger pour mobile -->
        <button @click="toggleMenu" class="md:hidden ml-2">
          <svg class="w-6 h-6" :class="hamburgerColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Menu mobile -->
    <div v-if="showMenu" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-white/20 dark:border-gray-700/50">
        <!-- Toggle dark mode mobile -->
        <div class="flex justify-center mb-3">
          <button
            @click="toggleDark"
            aria-label="Basculer le mode sombre"
            class="w-16 h-8 flex items-center rounded-full transition-colors duration-300 focus:outline-none border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow"
          >
            <span class="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                  :class="isDark ? 'translate-x-8 bg-white' : 'translate-x-0 bg-white'">
              <span v-if="!isDark" class="text-yellow-500 text-xl">&#9728;</span>
              <span v-else class="text-yellow-400 text-xl">&#9789;</span>
            </span>
          </button>
        </div>
        
        <!-- Barre de recherche mobile masquée car il y a déjà un filtre sur la page -->
        <!--
        <form @submit.prevent="onSearch" class="px-3 py-2">
          <input v-model="searchQuery" type="text" placeholder="Rechercher un lieu, une ville..." class="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button type="submit" class="w-full mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">Rechercher</button>
        </form>
        -->
        
        <!-- Liens d'authentification mobile -->
        <template v-if="isAuthenticated">
          <template v-if="role === 'user'">
            <router-link to="/dashboard-user" @click="showMenu = false" class="block px-3 py-2 text-base text-indigo-700 dark:text-indigo-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Mon espace</router-link>
          </template>
          <template v-else-if="role === 'contributor'">
            <router-link to="/dashboard-contributeur" @click="showMenu = false" class="block px-3 py-2 text-base text-indigo-700 dark:text-indigo-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Espace Contributeur</router-link>
          </template>
          <template v-else-if="role === 'blogger'">
            <router-link to="/dashboard-blogueur" @click="showMenu = false" class="block px-3 py-2 text-base text-indigo-700 dark:text-indigo-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Espace Blogueur</router-link>
          </template>
          <template v-else-if="role === 'admin'">
            <router-link to="/adminlpdg" @click="showMenu = false" class="block px-3 py-2 text-base text-red-700 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Admin</router-link>
          </template>
          <button @click="handleLogout" class="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Déconnexion</button>
        </template>
        <template v-else>
          <router-link to="/login" @click="showMenu = false" class="block px-3 py-2 text-base text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Connexion</router-link>
          <router-link to="/register" @click="showMenu = false" class="block px-3 py-2 text-base text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">Inscription</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { supabase } from '../supabase'

const router = useRouter()
const role = ref(localStorage.getItem('user_role'))
const isAuthenticated = ref(!!role.value)
const showMenu = ref(false)
const searchQuery = ref('')
const isDark = ref(false)
const hamburgerColor = ref('text-gray-900')

const emit = defineEmits(['search'])

const onSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}

const handleLogout = async () => {
  try {
    // Déconnexion Supabase (invalide le token)
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Erreur lors de la déconnexion Supabase:', error)
    }
    
    // Nettoyer localStorage
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_id')
    
    // Mettre à jour l'état local
    role.value = null
    isAuthenticated.value = false
    
    // Redirection
    router.push('/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    // Même en cas d'erreur, on nettoie localStorage et on redirige
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_id')
    role.value = null
    isAuthenticated.value = false
    router.push('/login')
  }
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

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

function updateHamburgerColor() {
  hamburgerColor.value = document.documentElement.classList.contains('dark') ? 'text-white' : 'text-gray-900'
}

// Écouter les changements d'authentification Supabase
onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event)
    
    if (event === 'SIGNED_IN') {
      // L'utilisateur vient de se connecter
      // On vérifie périodiquement que le rôle est disponible
      const checkRole = () => {
        const userRole = localStorage.getItem('user_role')
        if (userRole) {
          role.value = userRole
          isAuthenticated.value = true
        } else {
          // Si le rôle n'est pas encore là, on réessaie dans 50ms
          setTimeout(checkRole, 50)
        }
      }
      checkRole()
    } else if (event === 'SIGNED_OUT') {
      // L'utilisateur vient de se déconnecter
      // Nettoyer complètement l'état
      localStorage.removeItem('user_role')
      localStorage.removeItem('user_id')
      role.value = null
      isAuthenticated.value = false
    }
  })

  const saved = localStorage.getItem('theme')
  // Mode sombre par défaut, sauf si l'utilisateur a explicitement choisi le mode clair
  if (saved === 'light') {
    applyTheme(false)
  } else {
    // Par défaut, mode sombre
    applyTheme(true)
  }
  updateHamburgerColor()
  const observer = new MutationObserver(updateHamburgerColor)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
</script> 