<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Qui sommes-nous ?</h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez l'histoire et la mission de LPDG, votre plateforme de référence pour explorer les merveilles touristiques de la Guinée.
          </p>
        </div>
      </div>
    </div>

    <!-- Notre histoire -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Notre Histoire</h2>
          <div class="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              LPDG (Lieux Touristiques de Guinée) est né d'une passion partagée pour le tourisme et d'un constat simple : 
              la Guinée regorge de merveilleux lieux touristiques qui méritent d'être découverts et partagés.
            </p>
            <p>
              Fondée en 2024, notre plateforme a pour ambition de devenir la référence pour tous ceux qui souhaitent 
              explorer les richesses culturelles, naturelles et historiques de la Guinée.
            </p>
            <p>
              Nous croyons au pouvoir du partage et de la collaboration pour faire rayonner le tourisme guinéen 
              et contribuer au développement économique de notre pays.
            </p>
          </div>
        </div>
        <div class="bg-purple-600 dark:bg-purple-700 rounded-xl p-8 text-white shadow-lg">
          <div class="text-center">
            <div class="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4">Notre Vision</h3>
            <p class="text-purple-100 dark:text-purple-200">
              Faire de la Guinée une destination touristique de premier plan en Afrique de l'Ouest, 
              en mettant en valeur ses atouts naturels et culturels uniques.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Notre mission -->
    <div class="bg-white dark:bg-gray-800 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Notre Mission</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nous nous engageons à promouvoir et valoriser le patrimoine touristique guinéen
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Découvrir</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Révéler les trésors cachés et les lieux incontournables de la Guinée
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Partager</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Créer une communauté active de passionnés et de voyageurs
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Développer</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Contribuer au développement du tourisme local et durable
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Nos valeurs -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nos Valeurs</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Les principes qui guident nos actions au quotidien
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Authenticité</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Nous privilégions les expériences authentiques et les rencontres vraies
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Durabilité</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Nous promouvons un tourisme responsable et respectueux de l'environnement
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Inclusion</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Nous rendons le tourisme accessible à tous, sans discrimination
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Nous utilisons la technologie pour enrichir l'expérience touristique
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pas de logique particulière nécessaire
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
