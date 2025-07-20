<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32 relative overflow-hidden">
    <!-- Arrière-plan avec images de la Guinée -->
    <div class="absolute inset-0 z-0 top-16">
      <div class="absolute inset-0 bg-black/30"></div>
      <img 
        :src="currentImage" 
        :alt="'Image de la Guinée - ' + currentImageName"
        class="w-full h-full object-cover object-top transition-opacity duration-500"
        :class="{ 'opacity-100': isImageLoaded, 'opacity-0': !isImageLoaded }"
      />
    </div>

    <!-- Contenu principal avec z-index pour être au-dessus de l'arrière-plan -->
    <div class="max-w-6xl w-full relative z-10">
      <!-- Layout en deux blocs -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <!-- Bloc gauche - Formulaire -->
        <div class="space-y-8">
          <!-- Logo et titre -->
      <div class="text-center lg:text-left">
            <h2 class="text-3xl font-bold text-white drop-shadow-lg">
              Connexion
            </h2>
            <p class="mt-2 text-sm text-gray-200 drop-shadow-md">
              Connectez-vous pour accéder à votre espace personnel
        </p>
      </div>

          <!-- Formulaire avec effet de verre -->
          <div class="bg-transparent backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/10 relative overflow-hidden">
            <!-- Effet de brillance sur le verre -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/1 to-transparent rounded-2xl"></div>
            <!-- Contenu du formulaire -->
            <div class="relative z-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-bold text-white drop-shadow-lg mb-2">
              Adresse email
            </label>
            <input 
              id="email"
              type="email" 
              v-model="email" 
              required
              class="w-full px-3 py-2 border border-white/20 rounded-lg shadow-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 bg-transparent backdrop-blur-sm text-white font-medium transition-all duration-200"
              placeholder="votre@email.com"
            />
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-bold text-white drop-shadow-lg mb-2">
              Mot de passe
            </label>
            <input 
              id="password"
              type="password" 
              v-model="password" 
              required
              class="w-full px-3 py-2 border border-white/20 rounded-lg shadow-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 bg-transparent backdrop-blur-sm text-white font-medium transition-all duration-200"
              placeholder="Votre mot de passe"
            />
          </div>

          <!-- Lien mot de passe oublié -->
          <div class="flex items-center justify-end">
            <router-link 
              to="/forgot-password" 
              class="text-sm text-white hover:text-yellow-300 transition-colors duration-200 font-medium drop-shadow-md"
            >
              Mot de passe oublié ?
            </router-link>
          </div>

          <!-- Bouton de connexion -->
          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-3 px-4 border border-white/20 rounded-lg shadow-lg text-sm font-bold text-white bg-transparent hover:bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 relative overflow-hidden group"
            >
              <!-- Effet de brillance sur le bouton -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span class="relative z-10 drop-shadow-lg">Se connecter</span>
            </button>
              </div>

          <!-- Message d'erreur -->
          <div v-if="confirmationMessage" class="mt-4 p-3 bg-red-500/20 border border-red-400/50 rounded-lg backdrop-blur-sm">
            <p class="text-sm text-white text-center font-medium drop-shadow-md">
              {{ confirmationMessage }}
            </p>
          </div>
        </form>

        <!-- Lien vers l'inscription -->
        <div class="mt-6 text-center">
          <p class="text-sm text-white drop-shadow-md">
            Pas encore de compte ? 
            <router-link 
              to="/register" 
              class="font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-200 drop-shadow-lg"
            >
              Créer un compte
            </router-link>
          </p>
        </div>
            </div>
          </div>
        </div>

        <!-- Bloc droit - Carte de la Guinée -->
        <div class="hidden lg:block pt-24">
          <div class="bg-transparent backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/10 relative overflow-hidden">
            <!-- Effet de brillance sur le verre -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/1 to-transparent rounded-2xl"></div>
            <!-- Contenu de la carte -->
            <div class="relative z-10 h-full flex items-center justify-center">
              <div class="text-center">
                <h3 class="text-2xl font-bold text-white drop-shadow-lg mb-4">
                  Découvrez la Guinée
                </h3>
                <p class="text-white/90 drop-shadow-md mb-6">
                  Explorez les merveilles de notre pays
                </p>
                <!-- Carte de la Guinée en verre avec animation 3D automatique -->
                <div class="w-full h-64 rounded-lg overflow-hidden shadow-2xl perspective-1000">
                  <div class="relative w-full h-full transform-style-preserve-3d animate-float-3d">
                    <img 
                      src="https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/guinell%20galss.png" 
                      alt="Carte de la Guinée en verre" 
                      class="w-full h-full object-contain animate-brightness-pulse"
                    />
                    <!-- Effet de brillance 3D -->
                    <div class="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent animate-brilliance"></div>
                    <!-- Ombre portée 3D -->
                    <div class="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent animate-shadow-3d transform translate-z-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indicateur d'image actuelle -->
      <div class="text-center mt-8">
        <p class="text-xs text-white/70 drop-shadow-sm">
          {{ currentImageName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmationMessage = ref('')

// Images de la Guinée
const images = [
  { src: 'https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/masque-nimba-heaume%20(1).jpg', name: 'Masque Nimba' },
  { src: 'https://pycevqvvryollfkyizla.supabase.co/storage/v1/object/public/images/backgroundlogin/mont-nimba-sable-mining.avif', name: 'Mont Nimba - Sable Mining' }
]

const currentImageIndex = ref(0)
const currentImage = ref(images[0].src)
const currentImageName = ref(images[0].name)
const isImageLoaded = ref(true)

// Rotation automatique des images
let intervalId = null

const nextImage = () => {
  // Précharger la prochaine image
  const nextIndex = (currentImageIndex.value + 1) % images.length
  const nextImageSrc = images[nextIndex].src
  
  // Créer une nouvelle image pour préchargement
  const img = new Image()
  img.onload = () => {
    // Une fois l'image chargée, faire la transition
    isImageLoaded.value = false
    
    setTimeout(() => {
      currentImageIndex.value = nextIndex
      currentImage.value = nextImageSrc
      currentImageName.value = images[nextIndex].name
      
      // Transition plus rapide
      setTimeout(() => {
        isImageLoaded.value = true
      }, 50)
    }, 200)
  }
  img.src = nextImageSrc
}

onMounted(() => {
  // Précharger toutes les images
  images.forEach(img => {
    const preloadImg = new Image()
    preloadImg.src = img.src
  })
  
  // Changer d'image toutes les 5 secondes
  intervalId = setInterval(nextImage, 5000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const handleLogin = async () => {
  confirmationMessage.value = ''
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    confirmationMessage.value = error.message
    return
  }
  // Récupère le profil pour le rôle
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*, roles(label)')
    .eq('id', data.user.id)
    .single()

  if (profileError) {
    confirmationMessage.value = "Erreur lors de la récupération du profil"
    return
  }

  const role = profile.roles.label
  localStorage.setItem('user_role', role)

  // Redirection selon le rôle
  if (role === 'admin') {
    router.push('/adminlpdg')
  } else if (role === 'contributor') {
    router.push('/dashboard-contributeur')
  } else if (role === 'blogger') {
    router.push('/dashboard-blogueur')
  } else {
    router.push('/dashboard-user')
  }
}
</script>

<style scoped>
/* Animations 3D personnalisées */
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.rotate-y-12 {
  transform: rotateY(12deg);
}

.rotate-x-6 {
  transform: rotateX(6deg);
}

.translate-z-4 {
  transform: translateZ(4px);
}

/* Animation de flottement automatique */
.animate-float-3d {
  animation: float3d 4s ease-in-out infinite;
}

@keyframes float3d {
  0%, 100% {
    transform: translateY(0px) rotateY(8deg) rotateX(4deg) scale(1.02);
  }
  25% {
    transform: translateY(-8px) rotateY(12deg) rotateX(6deg) scale(1.05);
  }
  50% {
    transform: translateY(-5px) rotateY(6deg) rotateX(3deg) scale(1.03);
  }
  75% {
    transform: translateY(-12px) rotateY(10deg) rotateX(5deg) scale(1.04);
  }
}

/* Animation de brillance automatique */
.animate-brilliance {
  animation: brilliance 3s ease-in-out infinite;
}

@keyframes brilliance {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

/* Animation d'ombre 3D automatique */
.animate-shadow-3d {
  animation: shadow3d 4s ease-in-out infinite;
}

@keyframes shadow3d {
  0%, 100% {
    opacity: 0.2;
    transform: translateZ(2px);
  }
  50% {
    opacity: 0.6;
    transform: translateZ(6px);
  }
}

/* Animation de pulsation de luminosité */
.animate-brightness-pulse {
  animation: brightnessPulse 5s ease-in-out infinite;
}

@keyframes brightnessPulse {
  0%, 100% {
    filter: brightness(1) contrast(1);
  }
  50% {
    filter: brightness(1.1) contrast(1.1);
  }
}

/* Animation d'entrée */
.transform-style-preserve-3d {
  animation: slideIn 1s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(50px) rotateY(-20deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateY(0deg);
  }
}
</style> 