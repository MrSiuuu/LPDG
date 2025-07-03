<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse w-full">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">
          Connecte-toi pour accéder à ton espace personnel et profiter de toutes les fonctionnalités du site.
        </p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <form @submit.prevent="handleLogin">
            <fieldset class="fieldset">
              <label class="label">Email</label>
              <input type="email" v-model="email" class="input input-bordered w-full" placeholder="Email" required />
              <label class="label">Password</label>
              <input type="password" v-model="password" class="input input-bordered w-full" placeholder="Password" required />
              <div class="mt-2">
                <router-link class="link link-hover" to="/forgot-password">Mot de passe oublié ?</router-link>
              </div>
              <button type="submit" class="btn btn-neutral hover:btn-primary mt-4 w-full">Se connecter</button>
            </fieldset>
            <div v-if="confirmationMessage" class="mt-4 text-red-600 text-center">
              {{ confirmationMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmationMessage = ref('')

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