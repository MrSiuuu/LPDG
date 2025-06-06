<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="lieu.image_principale" :alt="lieu.nom" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800">{{ lieu.nom }}</h3>
      <p class="text-sm text-gray-600">{{ lieu.ville }}</p>
      <p class="mt-2 text-gray-700">{{ lieu.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-sm text-gray-500">{{ lieu.type }}</span>
        <span v-if="lieu.prix" class="text-sm font-medium text-indigo-600">{{ lieu.prix }}€</span>
      </div>
      <div class="mt-4">
        <router-link :to="'/lieu/' + lieu.id"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          Voir plus
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  lieu: {
    type: Object,
    required: true
  }
});
</script> 