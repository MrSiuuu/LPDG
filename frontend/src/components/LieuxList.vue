<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LieuCard v-for="lieu in lieux" :key="lieu.id" :lieu="lieu" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LieuCard from './LieuCard.vue';

const lieux = ref([]);

const fetchLieux = async () => {
  try {
    const response = await fetch('/api/lieux');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des lieux');
    }
    lieux.value = await response.json();
  } catch (error) {
    console.error('Erreur:', error);
  }
};

onMounted(() => {
  fetchLieux();
});
</script> 