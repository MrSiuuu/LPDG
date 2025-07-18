<template>
  <div class="pt-6 sm:pt-10 mt-20 sm:mt-28 max-w-6xl mx-auto px-3 sm:px-4 bg-white dark:bg-gray-900">
    <!-- Galerie d'images dynamique -->
    <div class="flex flex-col md:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
      <LieuGallery 
        :images="galleryImages" 
        :isLoggedIn="isLoggedIn"
        @showLoginModal="showLoginModal = true"
      />
    </div>

    <!-- Titre, note, localisation, actions, likes, badge visité -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
      <div class="w-full lg:w-auto">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{{ lieu.nom }}</h1>
        <div class="flex flex-wrap items-center gap-1 sm:gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-1">
          <span v-if="noteMoyenne" class="flex items-center text-yellow-500 font-semibold">{{ noteMoyenne.toFixed(1) }}</span>
          <span v-if="nombreAvis" class="text-gray-400 dark:text-gray-400">({{ nombreAvis }} avis)</span>
          <span v-if="lieu.ville" class="mx-1 sm:mx-2">•</span>
          <span v-if="lieu.ville" class="text-gray-700 dark:text-gray-200">{{ lieu.ville }}</span>
          <span v-if="lieu.type" class="mx-1 sm:mx-2">•</span>
          <span v-if="lieu.type" :class="{
            'px-2 py-1 rounded text-xs': true,
            'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200': lieu.type === 'restaurant',
            'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200': lieu.type !== 'restaurant'
          }">
            {{ lieu.type === 'restaurant' ? '🍽️ Restaurant' : lieu.type }}
          </span>
          <span v-if="lieu.accessible_mobilite_reduite" class="mx-1 sm:mx-2">•</span>
          <span v-if="lieu.accessible_mobilite_reduite" class="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded text-xs">Accessible PMR</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mt-2">
          <span class="flex items-center text-pink-600 font-bold text-sm sm:text-base"><svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg> {{ likes }}</span>
          <span v-if="isVisited" class="flex items-center text-green-600 font-bold text-sm sm:text-base"><svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/></svg>Déjà visité</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 items-center w-full lg:w-auto">
        <button @click="showShareModal = true" class="flex items-center px-2 sm:px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-medium">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M8.464 8.464l.01.01M15.536 8.464l.01.01M15.536 15.536l.01.01M8.464 15.536l.01.01" />
          </svg>
          <span class="hidden sm:inline">Partager</span>
          <span class="sm:hidden">Part.</span>
        </button>
        <button @click="toggleVisite" class="flex items-center px-2 sm:px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-medium" :class="{ 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 border-green-200 dark:border-green-700': isVisited }">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="hidden sm:inline">{{ isVisited ? 'Déjà visité' : 'Marquer comme visité' }}</span>
          <span class="sm:hidden">{{ isVisited ? 'Visité' : 'Visiter' }}</span>
        </button>
        <button @click="toggleLike" class="flex items-center px-2 sm:px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-medium">
          <svg class="hidden sm:inline w-5 h-5 mr-1" :class="isLiked ? 'text-red-500' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
          </svg>
          <span class="hidden sm:inline">{{ isLiked ? 'Aimé' : 'J\'aime' }}</span>
          <span class="sm:inline-block sm:hidden mr-1">{{ isLiked ? '❤️' : '🤍' }}</span>
        </button>
      </div>
    </div>

    <!-- Disposition Overview + Réservation + réseaux sociaux + ressources -->
    <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-6 sm:mb-8">
      <!-- Colonne gauche : Aperçu -->
      <div class="flex-1 min-w-0 order-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Aperçu</h2>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 text-gray-700 dark:text-gray-200 text-sm">
            <span v-if="lieu.prix" class="flex items-center gap-1"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>Prix : <span class="font-bold">{{ lieu.prix }} GNF</span></span>
            <span v-if="lieu.type" class="flex items-center gap-1"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><rect width="16" height="8" x="2" y="6" rx="2"/></svg>Type : {{ lieu.type }}</span>
            <span v-if="lieu.adresse" class="flex items-center gap-1"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><rect width="12" height="8" x="4" y="8" rx="2"/></svg>Adresse : {{ lieu.adresse }}</span>
            <span v-if="lieu.accessible_mobilite_reduite" class="flex items-center gap-1"><svg class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>Accessibilité PMR</span>
          </div>
          <div class="mb-3 text-gray-800 dark:text-gray-100 text-sm sm:text-base" v-html="displayedDescriptionHtml"></div>
          <ul v-if="equipements && equipements.length" class="list-disc pl-5 mb-3 text-gray-700 dark:text-gray-200 text-sm">
            <li v-for="(eq, i) in equipements" :key="i">{{ eq }}</li>
          </ul>
          <button v-if="isDescriptionTruncated" @click="toggleDescription" class="text-indigo-600 dark:text-indigo-300 underline text-sm mb-2">
            {{ showFullDescription ? 'Afficher moins' : 'Afficher plus' }}
          </button>
          <!-- Ressources -->
          <div v-if="ressources && Array.isArray(ressources) && ressources.length > 0" class="mt-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Ressources</h3>
            <ul class="list-disc pl-5 text-sm">
              <li v-for="(res, i) in ressources" :key="i">
                <a v-if="typeof res === 'string'" href="#" class="text-indigo-600 dark:text-indigo-300 underline">{{ res }}</a>
                <a v-else-if="res && res.url" :href="res.url" class="text-indigo-600 dark:text-indigo-300 underline" target="_blank">{{ res.label || res.name || 'Ressource' }}</a>
                <span v-else class="text-indigo-600 dark:text-indigo-300">{{ res }}</span>
              </li>
            </ul>
          </div>
          <!-- Réseaux sociaux -->
          <div v-if="reseauxSociaux && Object.keys(reseauxSociaux).length" class="mt-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Réseaux sociaux</h3>
            <div class="flex flex-wrap gap-2 sm:gap-3">
              <a v-for="(url, key) in reseauxSociaux" :key="key" :href="url" target="_blank" :class="reseauClass(key)" class="text-sm">
                <svg v-if="key==='facebook'" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
                <svg v-else-if="key==='instagram'" class="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.75 2.25a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0zm6.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                <span class="capitalize">{{ key }}</span>
              </a>
            </div>
          </div>
        </div>
        <!-- Bloc événements -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 class="text-lg font-bold mb-4 text-indigo-700 dark:text-indigo-300">Événements à venir</h2>
          <ul v-if="evenements && evenements.length" class="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm">
            <li v-for="(evt, i) in evenements" :key="i"><span class="font-semibold">{{ evt.titre }}</span> — {{ formatDate(evt.date_debut) }}</li>
          </ul>
          <div v-else class="text-gray-400 dark:text-gray-500">Aucun événement à venir.</div>
        </div>

        <!-- Section Restaurant (affichée seulement si c'est un restaurant) -->
        <div v-if="lieu.type === 'restaurant' && restaurantInfo" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-4">
          <h2 class="text-lg font-bold mb-4 text-orange-700 dark:text-orange-300 flex items-center">
            🍽️ Informations Restaurant
          </h2>
          
          <!-- Type de cuisine -->
          <div v-if="restaurantInfo.type_cuisine" class="mb-3">
            <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 mb-1">
              <svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-semibold">Type de cuisine :</span>
            </div>
            <span class="text-sm text-gray-900 dark:text-white">{{ restaurantInfo.type_cuisine }}</span>
          </div>

          <!-- Services proposés -->
          <div v-if="restaurantInfo.services && restaurantInfo.services.length > 0" class="mb-3">
            <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 mb-2">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-semibold">Services proposés :</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="service in restaurantInfo.services" :key="service" 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200">
                {{ getServiceIcon(service) }} {{ service }}
              </span>
            </div>
          </div>

          <!-- Réseaux sociaux du restaurant -->
          <div v-if="restaurantInfo.site_web || restaurantInfo.whatsapp || restaurantInfo.facebook || restaurantInfo.instagram" class="mb-3">
            <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 mb-2">
              <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span class="font-semibold">Contact & Réseaux :</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <a v-if="restaurantInfo.site_web" :href="restaurantInfo.site_web" target="_blank" 
                 class="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700">
                🌐 Site web
              </a>
              <a v-if="restaurantInfo.whatsapp" :href="`https://wa.me/${restaurantInfo.whatsapp}`" target="_blank"
                 class="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-700">
                📱 WhatsApp
              </a>
              <a v-if="restaurantInfo.facebook" :href="restaurantInfo.facebook" target="_blank"
                 class="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700">
                📘 Facebook
              </a>
              <a v-if="restaurantInfo.instagram" :href="restaurantInfo.instagram" target="_blank"
                 class="inline-flex items-center px-2 py-1 rounded text-xs bg-pink-100 dark:bg-pink-800 text-pink-700 dark:text-pink-200 hover:bg-pink-200 dark:hover:bg-pink-700">
                📷 Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Colonne droite : Carte info rapide améliorée -->
      <div class="w-full lg:w-80 flex-shrink-0 order-2 mb-6 lg:mb-0">
        <div v-if="lieu.prix" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-4 flex flex-col gap-4 border border-gray-100 dark:border-gray-700">
          <!-- Localisation -->
          <div v-if="lieu.ville || lieu.adresse" class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="10" r="3" /></svg>
            <span class="text-xs sm:text-sm">{{ lieu.ville }}<span v-if="lieu.adresse">, {{ lieu.adresse }}</span></span>
          </div>
          <!-- Type de lieu -->
          <div v-if="lieu.type" class="flex items-center gap-2 text-sm text-indigo-700 dark:text-indigo-300 font-semibold">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2" /></svg>
            <span class="text-xs sm:text-sm">{{ lieu.type === 'restaurant' ? '🍽️ Restaurant' : lieu.type }}</span>
          </div>

          <!-- Informations restaurant (si c'est un restaurant) -->
          <div v-if="lieu.type === 'restaurant' && restaurantInfo" class="space-y-2">
            <!-- Type de cuisine -->
            <div v-if="restaurantInfo.type_cuisine" class="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-300 font-medium">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-xs sm:text-sm">{{ restaurantInfo.type_cuisine }}</span>
            </div>
            
            <!-- Services -->
            <div v-if="restaurantInfo.services && restaurantInfo.services.length > 0" class="flex flex-wrap gap-1">
              <span v-for="service in restaurantInfo.services.slice(0, 3)" :key="service" 
                    class="inline-flex items-center px-1 py-0.5 rounded text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200">
                {{ getServiceIcon(service) }}
              </span>
              <span v-if="restaurantInfo.services.length > 3" class="text-xs text-gray-500">+{{ restaurantInfo.services.length - 3 }}</span>
            </div>
          </div>
          <!-- Accessibilité PMR -->
          <div v-if="lieu.accessible_mobilite_reduite" class="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 font-medium">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-7 0h8m-4-4v-4a2 2 0 114 0v4" /><circle cx="12" cy="12" r="10" /></svg>
            <span class="text-xs sm:text-sm">Accessible PMR</span>
          </div>
          <!-- Note moyenne -->
          <div class="flex items-center gap-2 text-sm">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <span class="font-bold text-sm sm:text-base">{{ noteMoyenne ? noteMoyenne.toFixed(1) : '-' }}</span>
            <span class="text-xs text-gray-400">({{ nombreAvis }} avis)</span>
          </div>
          <!-- Likes -->
          <div class="flex items-center gap-2 text-sm">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg>
            <span class="font-bold text-sm sm:text-base">{{ likes }}</span>
          </div>
          <!-- Prix moyen d'accès -->
          <div class="mt-4 sm:mt-6 flex flex-col items-center">
            <span class="text-xs text-gray-400 mb-1">Prix moyen d'accès</span>
            <span class="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400">{{ lieu.prix }} GNF</span>
          </div>
        </div>
        <!-- Bloc contact principal -->
        <div v-if="contactPrincipal" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-4 border-l-4 border-green-500 flex flex-col items-center">
          <!-- Avatar circulaire avec initiale -->
          <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-3 text-xl sm:text-2xl font-bold text-green-700 dark:text-green-300">
            {{ contactPrincipal.nom_contact ? contactPrincipal.nom_contact.charAt(0).toUpperCase() : '?' }}
          </div>
          <div class="text-center w-full">
            <div class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">{{ contactPrincipal.nom_contact }}</div>
            <div v-if="contactPrincipal.fonction" class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">{{ contactPrincipal.fonction }}</div>
            <div class="flex flex-col gap-2 items-center mb-2">
              <div v-if="contactPrincipal.telephone" class="flex items-center gap-2">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span class="font-bold text-gray-900 dark:text-white">{{ contactPrincipal.telephone }}</span>
              </div>
              <div v-if="contactPrincipal.email" class="flex items-center gap-2">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a :href="`mailto:${contactPrincipal.email}`" class="text-blue-600 dark:text-blue-300 hover:underline text-sm sm:text-base">{{ contactPrincipal.email }}</a>
              </div>
            </div>
            <div v-if="contactPrincipal.notes" class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded border mt-2 mb-2">
              {{ contactPrincipal.notes }}
            </div>
            <div v-if="contactPrincipal.telephone" class="flex justify-center mt-4">
              <a :href="`tel:${contactPrincipal.telephone}`" class="w-full md:w-auto px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-semibold flex items-center justify-center shadow">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Appeler
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Avis -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="text-yellow-500 font-bold text-base sm:text-lg">{{ noteMoyenne ? noteMoyenne.toFixed(1) : '-' }}</span>
          <span class="text-gray-400 dark:text-gray-400 text-sm sm:text-base">({{ nombreAvis }} avis)</span>
        </div>
        <button 
          v-if="isLoggedIn"
          @click="showAddAvisModal = true"
          class="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {{ userAvis ? 'Modifier mon avis' : '+ Ajouter un avis' }}
        </button>
      </div>
      <div v-if="avis && avis.length" class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div v-for="a in avis" :key="a.id">
          <div class="flex items-center gap-3 mb-1">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-white text-sm">{{ a.initiales }}</div>
            <div>
              <div class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{{ a.user_nom }}</div>
              <div class="text-xs text-gray-400 dark:text-gray-300">{{ formatDate(a.created_at) }}</div>
            </div>
          </div>
          <div class="text-gray-700 dark:text-gray-200 text-sm">{{ a.commentaire }}</div>
        </div>
      </div>
      <div v-else class="text-gray-400 dark:text-gray-500">Aucun avis pour ce lieu.</div>
      <button class="border px-3 sm:px-4 py-2 rounded text-gray-700 dark:text-gray-200 text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Voir tous les avis</button>
    </div>

    <!-- Modal de partage -->
    <ShareModal 
      :isOpen="showShareModal" 
      :lieu="lieu"
      @close="showShareModal = false" 
    />

    <!-- Modal d'ajout d'avis -->
    <AddAvisModal
      :isOpen="showAddAvisModal"
      :lieuId="route.params.id"
      :existingAvis="userAvis"
      @close="showAddAvisModal = false"
      @avis-added="handleAvisAdded"
      @avis-updated="handleAvisUpdated"
    />

    <!-- Modal d'invitation à la connexion -->
    <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Connexion requise</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Connectez-vous pour interagir avec les lieux (likes, visites)
          </p>
          <div class="flex gap-3 justify-center">
            <button 
              @click="goToLogin" 
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Se connecter
            </button>
            <button 
              @click="goToRegister" 
              class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              S'inscrire
            </button>
            <button 
              @click="showLoginModal = false" 
              class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase'
import LieuGallery from '../components/LieuGallery.vue'
import ShareModal from '../components/ShareModal.vue'
import SignalementModal from '../components/SignalementModal.vue'
import LieuContacts from '../components/LieuContacts.vue'
import LieuEvenements from '../components/LieuEvenements.vue'
import LieuRessources from '../components/LieuRessources.vue'
import LieuVideo from '../components/LieuVideo.vue'
import LieuPartage from '../components/LieuPartage.vue'
import LieuLikes from '../components/LieuLikes.vue'
import AddAvisModal from '../components/AddAvisModal.vue'
import Quill from 'quill'

// Variables réactives
const lieu = ref({})
const loading = ref(true)
const galleryImages = ref([])
const likes = ref(0)
const isVisited = ref(false)
const noteMoyenne = ref(0)
const nombreAvis = ref(0)
const avis = ref([])
const evenements = ref([])
const ressources = ref([])
const reseauxSociaux = ref({})
const equipements = ref([])
const isDescriptionTruncated = ref(false)
const showFullDescription = ref(false)
const isLiked = ref(false)
const showShareModal = ref(false)
const contactPrincipal = ref(null)
const restaurantInfo = ref(null) // Nouvelle variable pour les infos restaurant
const showLoginModal = ref(false) // Nouvelle variable pour la modale de connexion
const isLoggedIn = ref(false) // Variable pour vérifier si l'utilisateur est connecté
const showAddAvisModal = ref(false) // Variable pour la modale d'ajout d'avis
const userAvis = ref(null) // Variable pour stocker l'avis de l'utilisateur connecté

// Route pour récupérer l'ID du lieu
const route = useRoute()
const router = useRouter() // Nouvelle instance de router

// Fonction pour charger le lieu et ses données
const chargerLieu = async () => {
  try {
    const lieuId = route.params.id
    
    // Charger les données du lieu
    const { data: lieuData, error: lieuError } = await supabase
      .from('lieux')
      .select('*')
      .eq('id', lieuId)
      .single()
    
    if (lieuError) throw lieuError
    lieu.value = lieuData

    // Charger les données du restaurant si c'est un restaurant
    if (lieuData.type === 'restaurant') {
      const { data: restaurantData, error: restaurantError } = await supabase
        .from('restaurants')
        .select('*')
        .eq('lieu_id', lieuId)
        .single()
      
      if (!restaurantError && restaurantData) {
        restaurantInfo.value = restaurantData
      }
    }

    // Charger les images du lieu
    const { data: imagesData, error: imagesError } = await supabase
      .from('photos_lieu')
      .select('*')
      .eq('lieu_id', lieuId)
      .order('created_at', { ascending: true })
    
    // Nouvelle logique : image principale toujours en premier, puis images secondaires sans doublon
    let secondaryImages = []
    if (!imagesError && imagesData && imagesData.length > 0) {
      secondaryImages = imagesData.map(img => img.url)
    }
    const mainImage = lieuData.image_principale
    // On évite le doublon si l'image principale est aussi dans les secondaires
    const allImages = mainImage ? [mainImage, ...secondaryImages.filter(url => url !== mainImage)] : secondaryImages
    galleryImages.value = allImages.length > 0 ? allImages : ['/src/assets/pc-gamer-wall.jpg']

    // Charger les likes
    const { data: likesData, error: likesError } = await supabase
      .from('likes_lieu')
      .select('*', { count: 'exact' })
      .eq('lieu_id', lieuId)
    
    if (!likesError) {
      likes.value = likesData?.length || 0
    }

    // Vérifier si l'utilisateur a visité ce lieu
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: visiteData, error: visiteError } = await supabase
        .from('lieux_visites')
        .select('*')
        .eq('lieu_id', lieuId)
        .eq('user_id', user.id)
        .single()
      
      if (!visiteError && visiteData) {
        isVisited.value = true
      }

      // Vérifier si l'utilisateur a aimé ce lieu
      const { data: userLikesData, error: userLikesError } = await supabase
        .from('likes_lieu')
        .select('*')
        .eq('lieu_id', lieuId)
        .eq('user_id', user.id)
      
      if (!userLikesError && userLikesData && userLikesData.length > 0) {
        isLiked.value = true
      }
    }

    // Charger les avis et calculer la note moyenne
    const { data: avisData, error: avisError } = await supabase
      .from('avis')
      .select(`
        *,
        user_profiles:user_id (
          nom,
          prenom
        )
      `)
      .eq('lieu_id', lieuId)
      .order('created_at', { ascending: false })
    
    if (!avisError && avisData) {
      avis.value = avisData.map(avis => ({
        ...avis,
        user_nom: `${avis.user_profiles?.prenom || ''} ${avis.user_profiles?.nom || ''}`.trim(),
        initiales: `${avis.user_profiles?.prenom?.[0] || ''}${avis.user_profiles?.nom?.[0] || ''}`.toUpperCase()
      }))
      nombreAvis.value = avisData.length
      
      // Calculer la note moyenne
      if (avisData.length > 0) {
        const totalNotes = avisData.reduce((sum, avis) => sum + (avis.note || 0), 0)
        noteMoyenne.value = totalNotes / avisData.length
      }
    }

    // Charger les événements
    const { data: evenementsData, error: evenementsError } = await supabase
      .from('evenements_lieu')
      .select('*')
      .eq('lieu_id', lieuId)
      .gte('date_debut', new Date().toISOString())
      .order('date_debut', { ascending: true })
    
    if (!evenementsError && evenementsData) {
      evenements.value = evenementsData
    }

    // Charger les ressources (stockées dans le champ JSONB du lieu)
    if (lieuData.ressources && typeof lieuData.ressources === 'object') {
      ressources.value = lieuData.ressources
    } else {
      ressources.value = []
    }

    // Charger les réseaux sociaux (stockés dans le champ JSONB du lieu)
    if (lieuData.reseaux_sociaux && typeof lieuData.reseaux_sociaux === 'object') {
      reseauxSociaux.value = lieuData.reseaux_sociaux
    } else {
      reseauxSociaux.value = {}
    }

    // Équipements (si stockés dans la description ou un champ séparé)
    if (lieuData.equipements) {
      equipements.value = lieuData.equipements.split(',').map(eq => eq.trim())
    }

    // Vérifier si la description doit être tronquée
    if (lieuData.description) {
      const descriptionText = extractTextFromDescription(lieuData.description)
      if (descriptionText.length > 200) {
      isDescriptionTruncated.value = true
      }
    }

  } catch (error) {
    console.error('Erreur lors du chargement du lieu:', error)
  }
}

// Fonction pour charger les avis et calculer la note moyenne
const chargerAvis = async () => {
  try {
    const lieuId = route.params.id
    
    // Charger les avis
    const { data: avisData, error: avisError } = await supabase
      .from('avis')
      .select(`
        *,
        user_profiles:user_id (
          nom,
          prenom
        )
      `)
      .eq('lieu_id', lieuId)
      .order('created_at', { ascending: false })
    
    if (!avisError && avisData) {
      avis.value = avisData.map(avis => ({
        ...avis,
        user_nom: `${avis.user_profiles?.prenom || ''} ${avis.user_profiles?.nom || ''}`.trim(),
        initiales: `${avis.user_profiles?.prenom?.[0] || ''}${avis.user_profiles?.nom?.[0] || ''}`.toUpperCase()
      }))
      nombreAvis.value = avisData.length
      
      // Calculer la note moyenne
      if (avisData.length > 0) {
        const totalNotes = avisData.reduce((sum, avis) => sum + (avis.note || 0), 0)
        noteMoyenne.value = totalNotes / avisData.length
      } else {
        noteMoyenne.value = 0
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des avis:', error)
  }
}

// Fonction pour charger le contact principal
const chargerContactPrincipal = async () => {
  try {
    const { data, error } = await supabase
      .from('contacts_lieu')
      .select('*')
      .eq('lieu_id', route.params.id)
      .eq('est_principal', true)
      .single()
    if (!error && data) {
      contactPrincipal.value = data
    }
  } catch (e) {
    contactPrincipal.value = null
  }
}

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Fonction pour les classes CSS des réseaux sociaux
const reseauClass = (plateforme) => {
  const classes = {
    facebook: 'text-blue-600 hover:underline flex items-center',
    instagram: 'text-pink-500 hover:underline flex items-center',
    twitter: 'text-blue-400 hover:underline flex items-center',
    youtube: 'text-red-600 hover:underline flex items-center'
  }
  return classes[plateforme] || 'text-gray-600 hover:underline flex items-center'
}

// Fonction pour extraire le texte brut d'une description (HTML ou Delta)
const extractTextFromDescription = (desc) => {
  if (!desc) return ''
  try {
    // Si c'est du JSON (Delta Quill)
    const delta = JSON.parse(desc)
    if (delta && delta.ops) {
      return delta.ops.map(op => typeof op.insert === 'string' ? op.insert : '').join('')
    }
  } catch (e) {
    // Sinon, c'est peut-être du HTML
    const div = document.createElement('div')
    div.innerHTML = desc
    return div.textContent || div.innerText || ''
  }
  return desc
}

// Fonction pour obtenir l'icône des services
const getServiceIcon = (service) => {
  const icons = {
    'sur place': '🍽️',
    'à emporter': '📦',
    'livraison': '🚚',
    'terrasse': '🌳',
    'wifi': '📶',
    'parking': '🚗',
    'réservation': '📞'
  }
  return icons[service] || '✅'
}

// Fonction pour basculer le like
const toggleLike = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      showLoginModal.value = true
      return
    }

    const lieuId = route.params.id

    if (isLiked.value) {
      // Supprimer le like
      const { error: likesError } = await supabase
        .from('likes_lieu')
        .delete()
        .eq('lieu_id', lieuId)
        .eq('user_id', user.id)
      
      if (!likesError) {
        likes.value--
        isLiked.value = false
      }
    } else {
      // Ajouter le like
      const { error: likesError } = await supabase
        .from('likes_lieu')
        .insert([
          {
            lieu_id: lieuId,
            user_id: user.id
          }
        ])
      
      if (!likesError) {
        likes.value++
        isLiked.value = true
      }
    }
  } catch (error) {
    console.error('Erreur lors du like:', error)
  }
}

// Fonction pour basculer la visite
const toggleVisite = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      showLoginModal.value = true
      return
    }

    const lieuId = route.params.id

    if (isVisited.value) {
      // Supprimer la visite
      const { error: visiteError } = await supabase
        .from('lieux_visites')
        .delete()
        .eq('lieu_id', lieuId)
        .eq('user_id', user.id)
      
      if (!visiteError) {
        isVisited.value = false
      }
    } else {
      // Ajouter la visite
      const { error: visiteError } = await supabase
        .from('lieux_visites')
        .insert([
          {
            lieu_id: lieuId,
            user_id: user.id
          }
        ])
      
      if (!visiteError) {
        isVisited.value = true
      }
    }
  } catch (error) {
    console.error('Erreur lors de la visite:', error)
  }
}

// Fonction pour basculer l'affichage de la description
const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

// Fonction pour rediriger vers la page de connexion
const goToLogin = () => {
  router.push('/login')
  showLoginModal.value = false
}

// Fonction pour rediriger vers la page d'inscription
const goToRegister = () => {
  router.push('/register')
  showLoginModal.value = false
}

// Fonction pour vérifier le statut de connexion
const checkLoginStatus = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    isLoggedIn.value = !!user
  } catch (error) {
    console.error('Erreur lors de la vérification du statut de connexion:', error)
    isLoggedIn.value = false
  }
}

// Fonction pour charger l'avis de l'utilisateur connecté
const loadUserAvis = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      userAvis.value = null
      return
    }

    const { data, error } = await supabase
      .from('avis')
      .select('*')
      .eq('lieu_id', route.params.id)
      .eq('user_id', user.id)
      .single()

    if (!error && data) {
      userAvis.value = data
    } else {
      userAvis.value = null
    }
  } catch (error) {
    console.error('Erreur lors du chargement de l\'avis utilisateur:', error)
    userAvis.value = null
  }
}

// Fonction pour gérer l'ajout d'un avis
const handleAvisAdded = async (newAvis) => {
  try {
    // Recharger les avis et la note moyenne
    await chargerAvis()
    await loadUserAvis()
  } catch (error) {
    console.error('Erreur lors de la mise à jour après ajout d\'avis:', error)
  }
}

// Fonction pour gérer la modification d'un avis
const handleAvisUpdated = async (updatedAvis) => {
  try {
    // Recharger les avis et la note moyenne
    await chargerAvis()
    await loadUserAvis()
  } catch (error) {
    console.error('Erreur lors de la mise à jour après modification d\'avis:', error)
  }
}

// Charger les données au montage du composant
onMounted(() => {
  checkLoginStatus()
  chargerLieu()
  chargerContactPrincipal()
  loadUserAvis()
})

const descriptionHtml = computed(() => {
  if (!lieu.value.description) return ''
  let html = ''
  try {
    // Si c'est du JSON (Delta)
    const delta = JSON.parse(lieu.value.description)
    if (delta && delta.ops) {
      const tempQuill = new Quill(document.createElement('div'))
      tempQuill.setContents(delta)
      html = tempQuill.root.innerHTML
    }
  } catch (e) {
    // Sinon, c'est déjà du HTML
    html = lieu.value.description
  }
  // Correction des liens relatifs → absolus
  const div = document.createElement('div')
  div.innerHTML = html
  div.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href')
    if (href && !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('mailto:') && !href.startsWith('#')) {
      a.setAttribute('href', 'https://' + href)
    }
  })
  return div.innerHTML
})

// Description affichée (tronquée ou complète)
const displayedDescriptionHtml = computed(() => {
  if (!lieu.value.description) return ''
  
  let html = descriptionHtml.value
  
  // Si la description doit être tronquée et qu'on n'affiche pas tout
  if (isDescriptionTruncated.value && !showFullDescription.value) {
    const textContent = extractTextFromDescription(lieu.value.description)
    if (textContent.length > 200) {
      // Créer une version tronquée
      const truncatedText = textContent.substring(0, 200) + '...'
      
      // Essayer de créer du HTML tronqué proprement
      try {
        const delta = JSON.parse(lieu.value.description)
        if (delta && delta.ops) {
          // Pour les Delta Quill, on tronque le texte brut
          return `<p>${truncatedText}</p>`
        }
      } catch (e) {
        // Pour le HTML, on tronque le texte
        const div = document.createElement('div')
        div.innerHTML = html
        const text = div.textContent || div.innerText || ''
        if (text.length > 200) {
          return `<p>${text.substring(0, 200)}...</p>`
        }
      }
    }
  }
  
  return html
})

// Forcer target="_blank" sur tous les liens de la description après rendu
watch(descriptionHtml, (html) => {
  setTimeout(() => {
    document.querySelectorAll('.mb-3.text-gray-800 a').forEach(a => {
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener noreferrer')
    })
  }, 0)
})
</script>

<style>
/* Style des liens dans la description Quill */
.ql-editor a, .mb-3.text-gray-800 a {
  color: #2563eb !important; /* bleu indigo-600 */
  text-decoration: underline !important;
}
.dark .ql-editor a, .dark .mb-3.text-gray-800 a {
  color: #60a5fa !important; /* bleu clair pour dark */
}
.ql-editor a:hover, .mb-3.text-gray-800 a:hover {
  color: #1d4ed8 !important;
}
</style>

