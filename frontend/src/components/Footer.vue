<template>
  <footer class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo et description -->
        <div class="lg:col-span-1">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold">LPDG</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300">Lieux Touristiques de Guinée</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-200 text-sm leading-relaxed">
            La <span class="text-indigo-600 dark:text-indigo-400 font-semibold">Guinée</span> comme vous ne l'avez jamais vue. Une plateforme collaborative pour tous les amoureux du voyage.
          </p>
          <div class="flex space-x-4 mt-4">
            <!-- Facebook -->
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <!-- Instagram -->
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <!-- TikTok -->
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.7-1.35 3.8-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h6 class="text-lg font-semibold mb-4 text-indigo-400">Services</h6>
          <ul class="space-y-2">
            <li><a href="/lieux" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Découverte de lieux</a></li>
            <li><a href="/devenir-contributeur" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Devenir contributeur</a></li>
          </ul>
        </div>

        <!-- À propos -->
        <div>
          <h6 class="text-lg font-semibold mb-4 text-indigo-400">À propos</h6>
          <ul class="space-y-2">
            <li><router-link to="/about" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Qui sommes-nous</router-link></li>
            <li><router-link to="/team" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">L'équipe</router-link></li>
            <li><router-link to="/career" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Carrières</router-link></li>
            <li><router-link to="/contact" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Contact</router-link></li>
          </ul>
        </div>

        <!-- Légal -->
        <div>
          <h6 class="text-lg font-semibold mb-4 text-indigo-400">Légal</h6>
          <ul class="space-y-2">
            <li><router-link to="/legal/terms" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Conditions d'utilisation</router-link></li>
            <li><router-link to="/legal/privacy" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Politique de confidentialité</router-link></li>
            <li><router-link to="/legal/mentions" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Mentions légales</router-link></li>
          </ul>
        </div>
      </div>

      <!-- Ligne de séparation -->
      <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-600 dark:text-gray-300 text-sm mb-4 md:mb-0">
            © {{ new Date().getFullYear() }} LPDG - Lieux Touristiques de Guinée. Tous droits réservés.
          </div>
          <div class="flex space-x-6 justify-center md:justify-end w-full">
            <span class="text-gray-900 dark:text-white text-base font-bold tracking-wide">BTK</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Pas de logique particulière nécessaire pour ce footer
</script>

<style scoped>
/* Styles spécifiques au footer si nécessaire */
</style> 