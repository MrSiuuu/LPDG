import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/config/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/auth/LoginForm.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/auth/RegisterForm.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-candidat',
      name: 'dashboard-candidat',
      component: () => import('@/views/DashboardCandidat.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard-entreprise',
      name: 'dashboard-entreprise',
      component: () => import('@/views/DashboardEntreprise.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register-candidat',
      name: 'register-candidat',
      component: () => import('@/components/auth/RegisterCandidat.vue')
    },
    {
      path: '/register-entreprise',
      name: 'register-entreprise',
      component: () => import('@/components/auth/RegisterEntreprise.vue')
    }
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (to.meta.requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router
