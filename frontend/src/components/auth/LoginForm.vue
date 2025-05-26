<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion à votre compte
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            Se connecter
          </button>
        </div>
      </form>
      <div v-if="confirmationMessage" class="mt-4 text-red-600 text-center">
        {{ confirmationMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/config/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmationMessage = ref('')

const handleLogin = async () => {
  confirmationMessage.value = ''
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error

    // 1. Récupérer l'utilisateur courant
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    // 2. Vérifier si le profil existe déjà
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // 3. Si le profil n'existe pas, le créer avec le bon rôle
    if (profileError && profileError.code === 'PGRST116') {
      // Déduire le rôle selon la page d'où vient l'utilisateur (stocké dans localStorage)
      let role = localStorage.getItem('register_role') || 'candidate'
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, email: user.email, role, full_name: user.email.split('@')[0] }])
      if (insertError) {
        confirmationMessage.value = "Erreur création profil : " + insertError.message
        console.error('Erreur création profil:', insertError)
        throw insertError
      }
      profile = { role }
    } else if (profileError) {
      confirmationMessage.value = "Erreur profil : " + profileError.message
      console.error('Erreur profil:', profileError)
      throw profileError
    }

    // 4. Rediriger selon le rôle
    if (profile.role === 'candidate') {
      router.push('/dashboard-candidat')
    } else if (profile.role === 'company_admin') {
      router.push('/dashboard-entreprise')
    } else if (profile.role === 'super_admin') {
      router.push('/dashboard-admin')
    } else {
      router.push('/profile')
    }
  } catch (error) {
    confirmationMessage.value = "Erreur de connexion : " + error.message
    console.error('Erreur de connexion:', error.message)
  }
}
</script> 