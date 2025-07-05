<template>
  <div class="pt-10 mt-28 max-w-6xl mx-auto px-4 bg-white dark:bg-gray-900">

    <!-- Galerie d'images -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <div class="flex-1">
        <img src="/src/assets/pc-gamer-wall.jpg" alt="Image principale" class="w-full h-80 object-cover rounded-xl shadow" />
      </div>
      <div class="flex md:flex-col gap-2 md:w-48 w-full">
        <img src="/src/assets/abstract-digital-grid-black-background.jpg" alt="Miniature 1" class="w-full h-16 md:h-24 object-cover rounded-lg border" />
        <img src="/src/assets/pc-gamer-wall.jpg" alt="Miniature 2" class="w-full h-16 md:h-24 object-cover rounded-lg border" />
        <img src="/src/assets/abstract-digital-grid-black-background.jpg" alt="Miniature 3" class="w-full h-16 md:h-24 object-cover rounded-lg border" />
        <div class="relative">
          <img src="/src/assets/pc-gamer-wall.jpg" alt="Miniature 4" class="w-full h-16 md:h-24 object-cover rounded-lg border" />
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <span class="text-white font-semibold text-sm">Voir toutes les photos</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Titre, note, localisation, actions, likes, badge visité -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">Chutes de la Soumba</h1>
        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-base mb-1">
          <span class="flex items-center text-yellow-500 font-semibold">4.7</span>
          <span class="text-gray-400 dark:text-gray-400">(128 avis)</span>
          <span class="mx-2">•</span>
          <span>Dubréka, Guinée</span>
          <span class="mx-2">•</span>
          <span class="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-2 py-1 rounded text-xs">Nature</span>
          <span class="mx-2">•</span>
          <span class="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded text-xs">Accessible PMR</span>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <span class="flex items-center text-pink-600 font-bold"><svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg> 56</span>
          <span class="flex items-center text-green-600 font-bold"><svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/></svg>Déjà visité</span>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <button class="flex items-center px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M8.464 8.464l.01.01M15.536 8.464l.01.01M15.536 15.536l.01.01M8.464 15.536l.01.01" />
          </svg>
          Partager
        </button>
        <button class="flex items-center px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
          </svg>
          Sauvegarder
        </button>
      </div>
    </div>

    <!-- Disposition Overview + Réservation + réseaux sociaux + ressources -->
    <div class="flex flex-col md:flex-row gap-8 mb-8">
      <!-- Colonne gauche : Aperçu -->
      <div class="flex-1 min-w-0">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
          <h2 class="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Aperçu</h2>
          <div class="flex items-center gap-4 mb-3 text-gray-700 dark:text-gray-200">
            <span class="flex items-center gap-1"><svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>Prix moyen : <span class="font-bold">120 000 GNF</span></span>
            <span class="flex items-center gap-1"><svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><rect width="16" height="8" x="2" y="6" rx="2"/></svg>Type : Nature</span>
            <span class="flex items-center gap-1"><svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><rect width="12" height="8" x="4" y="8" rx="2"/></svg>Adresse : Soumba, Dubréka</span>
            <span class="flex items-center gap-1"><svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>Accessibilité PMR</span>
          </div>
          <div class="mb-3 text-gray-800 dark:text-gray-100">
            Les Chutes de la Soumba sont un site naturel exceptionnel situé à Dubréka, à quelques kilomètres de Conakry. Idéal pour les familles, les groupes d'amis et les amoureux de la nature.
          </div>
          <ul class="list-disc pl-5 mb-3 text-gray-700 dark:text-gray-200 text-sm">
            <li>Parking gratuit</li>
            <li>Restauration sur place</li>
            <li>Guide local disponible</li>
            <li>Zone de pique-nique</li>
          </ul>
          <button class="text-indigo-600 dark:text-indigo-300 underline text-sm mb-2">Afficher plus</button>
          <!-- Ressources -->
          <div class="mt-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Ressources</h3>
            <ul class="list-disc pl-5 text-sm">
              <li><a href="#" class="text-indigo-600 dark:text-indigo-300 underline">Brochure PDF</a></li>
              <li><a href="#" class="text-indigo-600 dark:text-indigo-300 underline">Plan d'accès</a></li>
            </ul>
          </div>
          <!-- Réseaux sociaux -->
          <div class="mt-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Réseaux sociaux</h3>
            <div class="flex gap-3">
              <a href="https://facebook.com/soumba" target="_blank" class="text-blue-600 hover:underline flex items-center"><svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>Facebook</a>
              <a href="https://instagram.com/soumba" target="_blank" class="text-pink-500 hover:underline flex items-center"><svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.75 2.25a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0zm6.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>Instagram</a>
            </div>
          </div>
        </div>
        <!-- Bloc événements -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
          <h2 class="text-lg font-bold mb-4 text-indigo-700 dark:text-indigo-300">Événements à venir</h2>
          <ul class="list-disc pl-5 text-gray-700 dark:text-gray-200 text-sm">
            <li><span class="font-semibold">Festival de la Soumba</span> — 12 août 2024</li>
            <li><span class="font-semibold">Randonnée guidée</span> — 20 septembre 2024</li>
          </ul>
        </div>
      </div>
      <!-- Colonne droite : Réservation, likes, note -->
      <div class="w-full md:w-80 flex-shrink-0">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-28">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl font-bold text-gray-900 dark:text-white">120 000 GNF<span class="text-base font-normal">/nuit</span></span>
            <div class="flex items-center gap-1">
              <span class="text-indigo-600 dark:text-indigo-300 font-bold">4.7</span>
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            </div>
          </div>
          <div class="mb-2">
            <div class="flex justify-between text-gray-700 dark:text-gray-200 text-sm mb-1"><span>Check in</span><span>17/07/2024</span></div>
            <div class="flex justify-between text-gray-700 dark:text-gray-200 text-sm mb-1"><span>Check out</span><span>21/07/2024</span></div>
            <div class="flex justify-between text-gray-700 dark:text-gray-200 text-sm mb-1"><span>Guests</span><span>2 personnes</span></div>
          </div>
          <div class="border-t pt-2 mb-2">
            <div class="flex justify-between text-gray-700 dark:text-gray-200 text-sm"><span>120 000 x 4 nuits</span><span>480 000</span></div>
            <div class="flex justify-between text-gray-700 dark:text-gray-200 text-sm"><span>Remise nouveau visiteur</span><span class="text-green-600 dark:text-green-400">-20 000</span></div>
            <div class="flex justify-between text-gray-700 dark:text-gray-200 text-sm"><span>Frais de service</span><span>12 000</span></div>
          </div>
          <div class="flex justify-between text-gray-900 dark:text-white font-bold text-lg mb-2"><span>Total (GNF)</span><span>472 000</span></div>
          <button class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mb-2">Réserver</button>
          <p class="text-xs text-gray-500 dark:text-gray-300 text-center">Aucun paiement immédiat</p>
        </div>
      </div>
    </div>

    <!-- Avis -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-yellow-500 font-bold text-lg">4.7</span>
        <span class="text-gray-400">(128 avis)</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">AB</div>
            <div>
              <div class="font-semibold">Aminata Bah</div>
              <div class="text-xs text-gray-400">Mars 2024</div>
            </div>
          </div>
          <div class="text-gray-700 dark:text-gray-200 text-sm">Superbe endroit pour se détendre en famille, les cascades sont magnifiques et l'accueil chaleureux.</div>
        </div>
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">MD</div>
            <div>
              <div class="font-semibold">Mamadou Diallo</div>
              <div class="text-xs text-gray-400">Février 2024</div>
            </div>
          </div>
          <div class="text-gray-700 dark:text-gray-200 text-sm">Lieu très propre, facile d'accès, je recommande pour un week-end nature !</div>
        </div>
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">KS</div>
            <div>
              <div class="font-semibold">Kadiatou Sylla</div>
              <div class="text-xs text-gray-400">Janvier 2024</div>
            </div>
          </div>
          <div class="text-gray-700 dark:text-gray-200 text-sm">Magnifique site, parfait pour les photos et les pique-niques.</div>
        </div>
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">FT</div>
            <div>
              <div class="font-semibold">Fodé Touré</div>
              <div class="text-xs text-gray-400">Décembre 2023</div>
            </div>
          </div>
          <div class="text-gray-700 dark:text-gray-200 text-sm">Très bon accueil, site sécurisé, à refaire !</div>
        </div>
      </div>
      <button class="border px-4 py-2 rounded text-gray-700 dark:text-gray-200 text-sm">Voir tous les avis</button>
    </div>

    <!-- Footer -->
    <footer class="mt-12 border-t pt-8 pb-4 text-sm text-gray-500 dark:text-gray-300">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="font-bold mb-2">Support</div>
          <div>Irure in molli</div>
          <div>Officia sit laborum</div>
          <div>Lorem ea quis labor</div>
        </div>
        <div>
          <div class="font-bold mb-2">Communauté</div>
          <div>Nisi velit ut</div>
          <div>Pariatur elit esse</div>
          <div>Laborum aliquip c</div>
        </div>
        <div>
          <div class="font-bold mb-2">À propos</div>
          <div>Aute corr</div>
          <div>Volupta</div>
          <div>Nulla mir</div>
        </div>
        <div>
          <div class="font-bold mb-2">Abonnez-vous à la newsletter</div>
          <div class="flex gap-2 mt-2">
            <input type="email" placeholder="Votre email" class="border rounded px-2 py-1 flex-1" />
            <button class="bg-indigo-600 text-white px-4 py-1 rounded">S'abonner</button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span>© 2024 LPDG, Inc. · Privacy · Terms</span>
        <span class="text-xs">Made with <span class="text-indigo-600 font-bold">LPDG</span></span>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Pas de logique, tout est statique
</script> 