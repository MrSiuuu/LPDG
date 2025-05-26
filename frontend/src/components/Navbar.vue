<template>
  <nav class="bg-white border-b border-gray-200 fixed w-full z-20 top-0 left-0">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!-- Titre à gauche -->
      <router-link to="/" class="flex items-center space-x-2">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Logo JobPortal">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">JobPortal</span>
      </router-link>
      <!-- Liens à droite -->
      <div class="flex items-center space-x-4">
        <router-link to="/register-candidat" class="btn btn-ghost normal-case text-base text-gray-800">Créer un compte</router-link>
        <router-link to="/register-entreprise" class="btn btn-ghost normal-case text-base text-gray-800">Recruter</router-link>
        <router-link to="/about" class="btn btn-ghost normal-case text-base text-gray-800">À propos</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Pas de logique JS pour l'instant
</script> 