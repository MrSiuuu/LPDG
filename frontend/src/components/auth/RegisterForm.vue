<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-8 mt-12">
    <div class="bg-white w-full max-w-5xl flex items-stretch shadow-xl rounded-2xl overflow-hidden">
      <!-- Panneau gauche -->
      <div class="hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-slate-900 to-slate-700 px-10 py-12 w-2/5 min-h-full">
        <div class="flex flex-col items-center text-center gap-8 w-full">
          <div>
            <h4 class="text-white text-2xl font-semibold mb-2 flex items-center justify-center">🌍 Découvrez la Guinée autrement</h4>
            <p class="text-white text-opacity-90 text-base leading-relaxed">Créez un compte pour explorer, sauvegarder et partager vos lieux préférés à travers toute la Guinée.</p>
          </div>
          <div class="mt-12">
            <span class="text-white text-lg italic opacity-80">"La Guinée comme vous ne l'avez jamais vue"</span>
          </div>
        </div>
      </div>
      <!-- Formulaire -->
      <form class="flex-1 flex flex-col justify-center py-12 px-6 sm:px-16" @submit.prevent="handleRegister">
        <div class="mb-8">
          <h3 class="text-slate-800 text-2xl font-bold mb-2">Créer un compte</h3>
        </div>
        <div class="space-y-6">
          <div>
            <label class="text-slate-800 text-sm font-medium mb-2 block">Nom</label>
            <div class="relative flex items-center">
              <input v-model="nom" name="name" type="text" required class="text-slate-800 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500" placeholder="Entrez votre nom" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
              </svg>
            </div>
          </div>
          <div>
            <label class="text-slate-800 text-sm font-medium mb-2 block">Adresse e-mail</label>
            <div class="relative flex items-center">
              <input v-model="email" name="email" type="email" required class="text-slate-800 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500" placeholder="Entrez votre e-mail" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs>
                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                </g>
              </svg>
            </div>
          </div>
          <div>
            <label class="text-slate-800 text-sm font-medium mb-2 block">Mot de passe</label>
            <div class="relative flex items-center">
              <input v-model="password" name="password" type="password" required class="text-slate-800 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500" placeholder="Entrez votre mot de passe" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-center">
            <input id="terms" v-model="acceptTerms" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
            <label for="terms" class="ml-3 block text-sm text-slate-600">
              J'accepte les <a href="#" class="text-blue-600 font-medium hover:underline ml-1">Conditions d'utilisation</a>
            </label>
          </div>
        </div>
        <div class="mt-8">
          <button type="submit" :disabled="!acceptTerms || loading" class="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none cursor-pointer disabled:opacity-50">
            Créer un compte
          </button>
        </div>
        <div v-if="confirmationMessage" class="text-green-600 text-center mt-4">{{ confirmationMessage }}</div>
        <div v-if="errorMessage" class="text-red-600 text-center mt-4">{{ errorMessage }}</div>
        <p class="text-slate-600 text-sm mt-6 text-center">Vous avez déjà un compte ? <router-link to="/login" class="text-blue-600 font-medium hover:underline ml-1">Se connecter</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const nom = ref('')
const email = ref('')
const password = ref('')
const acceptTerms = ref(false)
const confirmationMessage = ref('')
const errorMessage = ref('')
const loading = ref(false)
const router = useRouter()

const handleRegister = async () => {
  confirmationMessage.value = ''
  errorMessage.value = ''
  if (!acceptTerms.value) {
    errorMessage.value = 'Vous devez accepter les conditions.'
    return
  }
  loading.value = true
  try {
    const { data } = await axios.post('/api/auth/signup', {
      nom: nom.value,
      email: email.value,
      password: password.value,
      role: 'user'
    })
    confirmationMessage.value = data.message || 'Compte créé avec succès. Vérifiez votre boîte mail.'
    nom.value = ''
    email.value = ''
    password.value = ''
    acceptTerms.value = false
    // Optionnel : rediriger après quelques secondes
    // setTimeout(() => router.push('/login'), 2000)
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Erreur lors de la création du compte.'
  } finally {
    loading.value = false
  }
}
</script> 