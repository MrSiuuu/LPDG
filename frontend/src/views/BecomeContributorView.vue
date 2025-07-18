<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <Navbar />
    
    <div class="pt-20 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Hero Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Devenez Contributeur
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Rejoignez notre communauté et partagez votre passion pour la Guinée en contribuant à enrichir notre plateforme de lieux touristiques.
          </p>
        </div>

        <!-- Avantages Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Ajouter des Lieux</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Partagez vos découvertes en ajoutant des lieux touristiques, des sites historiques, des parcs naturels et des destinations emblématiques de la Guinée.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Restaurants & Gastronomie</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Faites découvrir la richesse culinaire guinéenne en ajoutant des restaurants traditionnels, des cafés et des établissements gastronomiques.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Images Magnifiques</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Partagez vos plus belles photos pour faire découvrir la beauté des lieux et donner envie aux visiteurs de les découvrir.
            </p>
          </div>
        </div>

        <!-- Comment Contribuer Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Comment Contribuer ?
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Étapes pour Devenir Contributeur</h3>
              <ol class="space-y-3">
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                  <span class="text-gray-600 dark:text-gray-300">Contactez-nous par email</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                  <span class="text-gray-600 dark:text-gray-300">Nous vous créons un compte contributeur</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                  <span class="text-gray-600 dark:text-gray-300">Vous pouvez commencer à ajouter des lieux</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                  <span class="text-gray-600 dark:text-gray-300">Vos contributions sont validées par notre équipe</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Ce que vous pouvez ajouter</h3>
              <ul class="space-y-2">
                <li class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Sites touristiques et historiques
                </li>
                <li class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Restaurants et cafés traditionnels
                </li>
                <li class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Parcs naturels et réserves
                </li>
                <li class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Marchés et centres artisanaux
                </li>
                <li class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Hôtels et hébergements
                </li>
                <li class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Événements culturels et festivals
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Contactez-nous pour Devenir Contributeur
          </h2>
          
          <div class="max-w-2xl mx-auto text-center">
            <div class="mb-8">
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Intéressé(e) par devenir contributeur ? Contactez-nous directement par email.
              </p>
              
              <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Email de contact :</h3>
                <p class="text-xl font-mono text-indigo-600 dark:text-indigo-400">issa@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script> 