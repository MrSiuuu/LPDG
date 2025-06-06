<template>
  <nav class="bg-white border-b border-gray-200 fixed w-full z-20 top-0 left-0">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Titre à gauche -->
      <router-link to="/" class="flex items-center space-x-2">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Logo LPDG">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">LPDG - Annuaire Touristique</span>
      </router-link>
      <!-- Liens à droite -->
      <div class="flex items-center space-x-4">
        <template v-if="isAuthenticated">
          <span class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            Connecté en tant que <b>{{ role }}</b>
          </span>
          <template v-if="role === 'user'">
            <router-link to="/dashboard-user" class="btn btn-ghost normal-case text-base text-indigo-700">Mon espace</router-link>
          </template>
          <template v-else-if="role === 'contributor'">
            <router-link to="/dashboard-contributeur" class="btn btn-ghost normal-case text-base text-indigo-700">Espace Contributeur</router-link>
          </template>
          <template v-else-if="role === 'blogger'">
            <router-link to="/dashboard-blogueur" class="btn btn-ghost normal-case text-base text-indigo-700">Espace Blogueur</router-link>
          </template>
          <template v-else-if="role === 'admin'">
            <router-link to="/adminlpdg" class="btn btn-ghost normal-case text-base text-red-700">Admin</router-link>
          </template>
          <button @click="handleLogout" class="ml-4 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Déconnexion</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost normal-case text-base text-gray-800">Connexion</router-link>
          <router-link to="/register" class="btn btn-ghost normal-case text-base text-gray-800">Inscription</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { supabase } from '../supabase'

const router = useRouter()
const role = ref(localStorage.getItem('user_role'))
const isAuthenticated = ref(!!role.value)

const handleLogout = () => {
  localStorage.removeItem('user_role')
  role.value = null
  isAuthenticated.value = false
  router.push('/login')
}

// Met à jour automatiquement le rôle si le localStorage change (connexion/déconnexion)
watchEffect(() => {
  role.value = localStorage.getItem('user_role')
  isAuthenticated.value = !!role.value
})
</script> 