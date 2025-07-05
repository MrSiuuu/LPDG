<template>
  <div class="flex flex-col md:flex-row gap-4">
    <!-- Image principale -->
    <div class="flex-1">
      <img
        :src="images[0]"
        alt="Image principale du lieu"
        class="w-full h-72 md:h-full object-cover rounded-xl shadow"
      />
    </div>
    <!-- Miniatures -->
    <div class="flex md:flex-col gap-2 md:w-48 w-full">
      <template v-for="(img, idx) in miniatures" :key="idx">
        <div class="relative group">
          <img
            :src="img"
            :alt="'Miniature ' + (idx + 2)"
            class="w-full h-16 md:h-24 object-cover rounded-lg cursor-pointer border border-gray-200"
          />
          <!-- Overlay sur la dernière miniature si plus de 5 images -->
          <div v-if="showOverlay && idx === 3" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <span class="text-white font-semibold text-sm">Voir toutes les photos</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})
// Les 4 miniatures suivantes
const miniatures = computed(() => props.images.slice(1, 5))
const showOverlay = computed(() => props.images.length > 5)
</script>

<style scoped>
/* Responsive pour la galerie */
@media (max-width: 768px) {
  .md\:flex-row {
    flex-direction: column !important;
  }
  .md\:w-48 {
    width: 100% !important;
  }
}
</style> 