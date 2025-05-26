<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()

const hideNavbar = route.path.startsWith('/dashboard-candidat') ||
                  route.path.startsWith('/dashboard-entreprise') ||
                  route.path.startsWith('/dashboard-admin')
</script>

<template>
  <div>
    <Navbar v-if="!hideNavbar" />
    <RouterView />
  </div>
</template>
