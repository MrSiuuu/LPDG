<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-8">
    <div class="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
      <h2 class="text-xl font-bold text-gray-900 mb-6 text-center">Réinitialiser le mot de passe</h2>
      <form @submit.prevent="handleUpdate" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Nouveau mot de passe</label>
          <input v-model="password" type="password" required minlength="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900" placeholder="Nouveau mot de passe" />
        </div>
        <button type="submit" :disabled="loading" class="w-full py-3 px-4 rounded-full text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 font-semibold text-base transition-colors">
          Réinitialiser le mot de passe
        </button>
        <div v-if="message" class="text-green-600 text-center text-sm">{{ message }}</div>
        <div v-if="error" class="text-red-600 text-center text-sm">{{ error }}</div>
      </form>
      <div class="mt-8 text-center">
        <router-link to="/login" class="text-gray-800 hover:underline">Retour à la connexion</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

const password = ref('')
const message = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
let timeoutId = null

const handleUpdate = async () => {
  message.value = ''
  error.value = ''
  loading.value = true
  try {
    const { error: err } = await supabase.auth.updateUser({ password: password.value })
    if (err) {
      if (err.message && err.message.toLowerCase().includes('short')) {
        error.value = 'Le mot de passe est trop court (6 caractères minimum).'
      } else if (err.message && err.message.toLowerCase().includes('same as the old password')) {
        error.value = 'Le nouveau mot de passe doit être différent de l’ancien.'
      } else {
        error.value = 'Une erreur est survenue lors de la réinitialisation du mot de passe.'
      }
    } else {
      message.value = 'Votre mot de passe a été réinitialisé avec succès.'
      password.value = ''
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        message.value = ''
        router.push('/login')
      }, 5000)
    }
  } catch (e) {
    error.value = 'Une erreur est survenue lors de la réinitialisation du mot de passe.'
  } finally {
    loading.value = false
  }
}
</script> 