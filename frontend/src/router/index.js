import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase'

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
      path: '/dashboard-user',
      name: 'dashboard-user',
      component: () => import('@/views/DashboardUser.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/dashboard-contributeur',
      name: 'dashboard-contributeur',
      component: () => import('@/views/DashboardContributeur.vue'),
      meta: { requiresAuth: true, role: 'contributor' }
    },
    {
      path: '/dashboard-blogueur',
      name: 'dashboard-blogueur',
      component: () => import('@/views/DashboardBlogueur.vue'),
      meta: { requiresAuth: true, role: 'blogger' }
    },
    {
      path: '/adminlpdg',
      name: 'adminlpdg',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/ajouter-lieu',
      name: 'ajouter-lieu',
      component: () => import('@/views/AddLieuView.vue'),
      meta: { requiresAuth: true, role: ['admin', 'contributor'] }
    },
    {
      path: '/lieu/:id',
      name: 'lieu-detail',
      component: () => import('@/views/LieuDetail.vue')
    },
    {
      path: '/articles/:id',
      name: 'article-detail',
      component: () => import('@/views/ArticleDetail.vue')
    },
    {
      path: '/article/nouveau',
      name: 'article-create',
      component: () => import('@/views/ArticleCreate.vue'),
      meta: { requiresAuth: true, role: 'blogger' }
    },
    {
      path: '/carte-guinee',
      name: 'carte-guinee',
      component: () => import('@/views/CarteGuineeView.vue')
    },
    {
      path: '/search',
      name: 'search-results',
      component: () => import('@/views/SearchResults.vue')
    }
  ]
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const role = localStorage.getItem('user_role')
  const isAuthenticated = !!role
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.role) {
    const requiredRoles = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role]
    if (!requiredRoles.includes(role)) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
