<template>
  <div class="flex flex-col md:flex-row gap-4">
    <!-- Image principale (cliquable) -->
    <div class="flex-1 cursor-pointer" @click="openLightbox(0)">
      <img
        :src="images[0]"
        alt="Image principale du lieu"
        class="w-full h-72 md:h-full object-cover rounded-xl shadow transition duration-200 hover:scale-105"
      />
    </div>
    <!-- Miniatures -->
    <div class="flex md:flex-col gap-2 md:w-48 w-full">
      <template v-for="(img, idx) in miniatures" :key="idx">
        <div class="relative group cursor-pointer" @click="openLightbox(idx + 1)">
          <img
            :src="img"
            :alt="'Miniature ' + (idx + 2)"
            class="w-full h-16 md:h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700 transition duration-200 hover:scale-105"
          />
          <!-- Overlay sur la dernière miniature si plus de 5 images -->
          <div v-if="showOverlay && idx === 3" class="absolute inset-0 bg-black/60 dark:bg-white/20 flex items-center justify-center rounded-lg">
            <span class="text-white dark:text-gray-900 font-semibold text-sm pointer-events-none">Voir toutes les photos</span>
          </div>
        </div>
      </template>
    </div>
    <!-- Lightbox -->
    <transition name="fade">
      <div v-if="lightboxOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-black/90 backdrop-blur-sm" @click.self="closeLightbox" tabindex="-1">
        <button class="absolute top-4 right-4 text-white dark:text-gray-200 text-3xl font-bold focus:outline-none" @click="closeLightbox" aria-label="Fermer">&times;</button>
        <button v-if="currentIndex > 0" class="absolute left-4 md:left-12 text-white dark:text-gray-200 text-4xl font-bold focus:outline-none" @click.stop="prevImage" aria-label="Précédent">&#8592;</button>
        <img :src="images[currentIndex]" :alt="'Photo ' + (currentIndex + 1)" class="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg border-4 border-white dark:border-gray-800 transition duration-200" />
        <button v-if="currentIndex < images.length - 1" class="absolute right-4 md:right-12 text-white dark:text-gray-200 text-4xl font-bold focus:outline-none" @click.stop="nextImage" aria-label="Suivant">&#8594;</button>
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          <span v-for="(img, i) in images" :key="i" class="w-3 h-3 rounded-full border border-white dark:border-gray-400" :class="i === currentIndex ? 'bg-white dark:bg-gray-200' : 'bg-gray-400 dark:bg-gray-700'" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})
// Les 4 miniatures suivantes
const miniatures = computed(() => props.images.slice(1, 5))
const showOverlay = computed(() => props.images.length > 5)

// Lightbox state
const lightboxOpen = ref(false)
const currentIndex = ref(0)

function openLightbox(idx) {
  currentIndex.value = idx
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}
function prevImage() {
  if (currentIndex.value > 0) currentIndex.value--
}
function nextImage() {
  if (currentIndex.value < props.images.length - 1) currentIndex.value++
}
// Fermer la lightbox sur Échap
function handleKey(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}
onMounted(() => {
  window.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 