<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="nom" class="sr-only">Nom complet</label>
            <input
              id="nom"
              v-model="nom"
              name="nom"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nom complet"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            S'inscrire
          </button>
        </div>
      </form>
      <div v-if="confirmationMessage" class="mt-4 text-green-600 text-center">
        {{ confirmationMessage }}
      </div>
      <div v-if="errorMessage" class="mt-4 text-red-600 text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const nom = ref('')
const email = ref('')
const password = ref('')
const confirmationMessage = ref('')
const errorMessage = ref('')

const handleRegister = async () => {
  confirmationMessage.value = ''
  errorMessage.value = ''
  try {
    const { data } = await axios.post('/api/auth/signup', {
      nom: nom.value,
      email: email.value,
      password: password.value,
      role: 'user'
    })
    confirmationMessage.value = data.message || 'Compte créé avec succès. Vérifie ta boîte mail.'
    nom.value = ''
    email.value = ''
    password.value = ''
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Erreur lors de la création du compte.'
  }
}
</script> 