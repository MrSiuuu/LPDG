<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { ref, onMounted } from 'vue'

const route = useRoute()

const hideNavbar = route.path.startsWith('/dashboard-candidat') ||
                  route.path.startsWith('/dashboard-entreprise') ||
                  route.path.startsWith('/dashboard-admin')

const hideFooter = route.path.startsWith('/dashboard-candidat') ||
                  route.path.startsWith('/dashboard-entreprise') ||
                  route.path.startsWith('/dashboard-admin')

// --- DARK MODE GLOBAL ---
const isDark = ref(false)

function applyTheme(dark) {
  const html = document.documentElement
  if (dark) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
  isDark.value = dark
}

function toggleDark() {
  applyTheme(!isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  applyTheme(saved === 'dark')
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
    <Navbar v-if="!hideNavbar" />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer v-if="!hideFooter" />
  </div>
</template>
