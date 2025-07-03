<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-8">
    <div class="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
      <!-- Logo remplacé par le nom du site -->
      <div class="flex justify-center mb-6">
        <span class="text-3xl font-extrabold tracking-wide text-gray-900" style="letter-spacing: 0.05em;">LPDG</span>
      </div>
      <h2 class="text-xl font-bold text-gray-900 mb-2 text-center">Réinitialiser votre mot de passe</h2>
      <p class="text-gray-600 text-center mb-6">Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
      <form @submit.prevent="handleReset" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" placeholder="Votre e-mail" />
        </div>
        <button type="submit" :disabled="loading" class="w-full py-3 px-4 rounded-full text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 font-semibold text-base transition-colors">
          Réinitialiser le mot de passe
        </button>
        <div v-if="message" class="text-green-600 text-center text-sm">{{ message }}</div>
      </form>
      <div class="mt-8 text-center text-gray-700 text-sm">
        Vous n'avez pas de compte ?
        <router-link to="/register" class="font-semibold hover:underline">Créer un compte</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const email = ref('')
const message = ref('')
const loading = ref(false)
let timeoutId = null

const handleReset = async () => {
  message.value = ''
  loading.value = true
  try {
    await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: window.location.origin + '/reset-password'
    })
    message.value = "Si un compte existe pour cet email, un lien de réinitialisation a été envoyé. Vérifiez votre boîte mail (et vos spams)."
    email.value = ''
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => { message.value = '' }, 5000)
  } catch (e) {
    message.value = "Si un compte existe pour cet email, un lien de réinitialisation a été envoyé. Vérifiez votre boîte mail (et vos spams)."
    email.value = ''
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => { message.value = '' }, 5000)
  } finally {
    loading.value = false
  }
}
</script> 