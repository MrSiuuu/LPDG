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
            Découvrez, partagez et explorez les merveilleux lieux touristiques de la Guinée. 
            Une plateforme collaborative pour tous les amoureux du voyage.
          </p>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.878-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h6 class="text-lg font-semibold mb-4 text-indigo-400">Services</h6>
          <ul class="space-y-2">
            <li><a href="/lieux" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Découverte de lieux</a></li>
            <li><a href="#" class="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Découverte d'événements</a></li>
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