<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()

const hideNavbar = route.path.startsWith('/dashboard-candidat') ||
                  route.path.startsWith('/dashboard-entreprise') ||
                  route.path.startsWith('/dashboard-admin')

const hideFooter = route.path.startsWith('/dashboard-candidat') ||
                  route.path.startsWith('/dashboard-entreprise') ||
                  route.path.startsWith('/dashboard-admin')
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar v-if="!hideNavbar" />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer v-if="!hideFooter" />
  </div>
</template>
