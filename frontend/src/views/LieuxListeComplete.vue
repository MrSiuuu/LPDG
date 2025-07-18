<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6 pt-16 mt-5">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 mt-5">Découvrez tous les lieux</h1>
        <h2 class="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 mt-4">Explorez notre collection complète de lieux touristiques en Guinée</h2>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Bouton Filtres (mobile) -->
      <div class="md:hidden mb-4">
        <button
          @click="toggleFiltres"
          class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <span class="font-medium text-gray-700 dark:text-gray-200">Filtres</span>
          <svg 
            class="w-5 h-5 text-gray-500 dark:text-gray-300 transition-transform duration-200"
            :class="{ 'rotate-180': showFiltres }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <!-- Filtres -->
      <div 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-all duration-300"
        :class="{ 
          'hidden md:block': !showFiltres,
          'block': showFiltres 
        }"
      >
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Filtres</h2>
        
        <!-- Filtres principaux -->
        <div class="w-full flex flex-col items-stretch gap-4 lg:flex-row lg:justify-center lg:items-end lg:gap-8">
          <!-- Recherche -->
          <div class="flex-1 max-w-xs mx-auto lg:mx-0">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Recherche</label>
            <input
              v-model="filtres.recherche"
              type="text"
              placeholder="Nom du lieu..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <!-- Type -->
          <div class="flex-1 max-w-xs mx-auto lg:mx-0">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Type</label>
            <select
              v-model="filtres.type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value="">Tous les types</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hôtel</option>
              <option value="musee">Musée</option>
              <option value="parc">Parc</option>
              <option value="plage">Plage</option>
              <option value="montagne">Montagne</option>
              <option value="site-historique">Site historique</option>
              <option value="centre-culturel">Centre culturel</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <!-- Ville -->
          <div class="flex-1 max-w-xs mx-auto lg:mx-0">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Ville</label>
            <select
              v-model="filtres.ville"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value="">Toutes les villes</option>
              <option v-for="ville in villesUniques" :key="ville" :value="ville">
                {{ ville }}
              </option>
            </select>
          </div>
        </div>

        <!-- Filtres supplémentaires -->
        <div class="grid grid-cols-1 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 lg:grid-cols-2 lg:gap-8 lg:mt-8 lg:pt-8">
          <!-- Accessibilité -->
          <div class="flex items-center lg:justify-start">
            <input
              v-model="filtres.accessible"
              type="checkbox"
              id="accessible"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
            />
            <label for="accessible" class="ml-2 text-sm text-gray-700 dark:text-gray-200">
              Accessible aux personnes à mobilité réduite
            </label>
          </div>

          <!-- Tri -->
          <div class="lg:flex lg:justify-end">
            <div class="w-full max-w-xs ml-auto">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Trier par</label>
              <select
                v-model="filtres.tri"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              >
                <option value="recent">Plus récents</option>
                <option value="ancien">Plus anciens</option>
                <option value="nom">Nom A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="reinitialiserFiltres"
            class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Réinitialiser les filtres
          </button>
          
          <div class="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-right w-full sm:w-auto">
            {{ lieuxFiltres.length }} lieu{{ lieuxFiltres.length > 1 ? 'x' : '' }} trouvé{{ lieuxFiltres.length > 1 ? 's' : '' }}
          </div>
        </div>
      </div>

      <!-- Liste des lieux -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="lieuxFiltres.length === 0" class="text-center py-12">
        <div class="text-gray-500 dark:text-gray-300">
          <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">Aucun lieu trouvé</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Essayez de modifier vos critères de recherche.
          </p>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="lieu in lieuxPagination"
          :key="lieu.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Image avec badges -->
          <div class="relative">
            <img 
              :src="lieu.image_principale || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyMC45MTMgMTUwIDIzNy41IDEzMy40MTMgMjM3LjUgMTEyLjVDMjM3LjUgOTEuNTg3IDIyMC45MTMgNzUgMjAwIDc1QzE3OS4wODcgNzUgMTYyLjUgOTEuNTg3IDE2Mi41IDExMi41QzE2Mi41IDEzMy40MTMgMTc5LjA4NyAxNTAgMjAwIDE1MFoiIGZpbGw9IiNEMTQ3RjAiLz4KPHN2ZyB4PSIxNzUiIHk9IjEyNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo='"
              :alt="lieu.nom"
              class="w-full h-64 object-cover"
            />
            
            <!-- Badge de type -->
            <span class="absolute top-2 left-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
              {{ lieu.type }}
            </span>
            
            <!-- Badge d'accessibilité -->
            <span v-if="lieu.accessible_mobilite_reduite" class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 21H5V3H13V9H19V21Z"/>
              </svg>
              PMR
            </span>
            
            <!-- Bouton like -->
            <button 
              @click.stop="toggleLike(lieu.id)"
              class="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              :class="{ 'text-red-500': lieu.hasLiked, 'text-gray-400': !lieu.hasLiked }"
            >
              <HeartFilledIcon v-if="lieu.hasLiked" class="w-5 h-5" />
              <HeartIcon v-else class="w-5 h-5" />
            </button>
          </div>
          
          <!-- Contenu de la carte -->
          <div class="p-4">
            <!-- Titre et ville -->
            <div class="flex justify-between items-start mb-2">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">{{ lieu.nom }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <MapPinIcon class="w-4 h-4 mr-1" />
                  {{ lieu.ville }}
                </p>
              </div>
            </div>
            
            <!-- Prix - COMMENTÉ TEMPORAIREMENT -->
            <!-- <div v-if="lieu.prix" class="py-2">
              <p class="text-lg font-bold text-green-600 dark:text-green-400">{{ lieu.prix }} GNF</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Prix approximatif</p>
            </div> -->
            
            <!-- Note moyenne -->
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400">
                <StarSolidIcon v-for="i in 5" :key="i" class="w-4 h-4" :class="{ 'text-gray-300': i > (lieu.note_moyenne || 0) }" />
              </div>
              <span class="text-gray-600 dark:text-gray-300 text-sm ml-2">({{ lieu.note_moyenne || 0 }}/5)</span>
            </div>
            
            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{{ resumeDescription(lieu.description) }}</p>
            
            <!-- Informations supplémentaires -->
            <div class="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Ouvert</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span>{{ lieu.adresse ? lieu.adresse.substring(0, 20) + '...' : 'Adresse non disponible' }}</span>
              </div>
            </div>
            
            <!-- Boutons d'action -->
            <div class="flex space-x-2">
              <router-link
                :to="`/lieu/${lieu.id}`"
                class="flex-1 bg-indigo-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-indigo-600 transition-colors duration-200 text-center"
              >
                Voir détails
              </router-link>
              <button 
                @click.stop="toggleVisite(lieu.id)"
                class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
                :class="{ 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100': lieu.hasVisited }"
              >
                <CheckSolidIcon v-if="lieu.hasVisited" class="w-4 h-4" />
                <CheckIcon v-else class="w-4 h-4" />
                {{ lieu.hasVisited ? 'Visité' : 'Visiter' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="lieuxFiltres.length > 0" class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            @click="pagePrecedente"
            :disabled="pageCourante === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          
          <span class="px-3 py-2 text-sm text-gray-700 dark:text-gray-200">
            Page {{ pageCourante }} sur {{ pagesTotales }}
          </span>
          
          <button
            @click="pageSuivante"
            :disabled="pageCourante >= pagesTotales"
            class="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </nav>
      </div>
    </div>
    
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
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';
import { 
  HeartIcon, 
  MapPinIcon,
  ClockIcon,
  CheckIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import { 
  HeartIcon as HeartFilledIcon,
  CheckIcon as CheckSolidIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/vue/24/solid'

const router = useRouter();

// État réactif
const lieux = ref([]);
const loading = ref(true);
const pageCourante = ref(1);
const lieuxParPage = 12;
const showFiltres = ref(false);
const showLoginModal = ref(false);

// Filtres
const filtres = ref({
  recherche: '',
  type: '',
  ville: '',
  accessible: false,
  tri: 'recent'
});

// Récupération des lieux
const fetchLieux = async () => {
  try {
    loading.value = true;
    
    let query = supabase
      .from('lieux')
      .select(`
        *,
        user_profiles (nom),
        photos_lieu (url)
      `);

    // Filtre par type
    if (filtres.value.type) {
      query = query.eq('type', filtres.value.type);
    }

    // Filtre par ville
    if (filtres.value.ville) {
      query = query.eq('ville', filtres.value.ville);
    }

    // Filtre par accessibilité
    if (filtres.value.accessible) {
      query = query.eq('accessible_mobilite_reduite', true);
    }

    // Recherche par nom
    if (filtres.value.recherche) {
      query = query.ilike('nom', `%${filtres.value.recherche}%`);
    }

    // Tri
    if (filtres.value.tri) {
      switch (filtres.value.tri) {
        case 'recent':
          query = query.order('created_at', { ascending: false });
          break;
        case 'ancien':
          query = query.order('created_at', { ascending: true });
          break;
        case 'nom':
          query = query.order('nom', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Enrichir les lieux avec les likes, visites et notes moyennes
    const lieuxEnrichis = await Promise.all((data || []).map(async (lieu) => {
      try {
        // Récupérer les likes
        const { data: likesData } = await supabase
          .from('likes_lieu')
          .select('*', { count: 'exact' })
          .eq('lieu_id', lieu.id);
        
        // Récupérer les visites
        const { data: visitesData } = await supabase
          .from('lieux_visites')
          .select('*', { count: 'exact' })
          .eq('lieu_id', lieu.id);
        
        // Récupérer les avis pour calculer la note moyenne
        const { data: avisData } = await supabase
          .from('avis')
          .select('note')
          .eq('lieu_id', lieu.id);
        
        // Calculer la note moyenne
        let noteMoyenne = 0;
        if (avisData && avisData.length > 0) {
          const totalNotes = avisData.reduce((sum, avis) => sum + (avis.note || 0), 0);
          noteMoyenne = totalNotes / avisData.length;
        }
        
        // Vérifier si l'utilisateur connecté a liké/visité
        const { data: { user } } = await supabase.auth.getUser();
        let hasLiked = false;
        let hasVisited = false;
        
        if (user) {
          const { data: userLikesData } = await supabase
            .from('likes_lieu')
            .select('*')
            .eq('lieu_id', lieu.id)
            .eq('user_id', user.id);
          
          const { data: userVisitesData } = await supabase
            .from('lieux_visites')
            .select('*')
            .eq('lieu_id', lieu.id)
            .eq('user_id', user.id);
          
          hasLiked = userLikesData && userLikesData.length > 0;
          hasVisited = userVisitesData && userVisitesData.length > 0;
        }
        
        return {
          ...lieu,
          likes: likesData?.length || 0,
          visites: visitesData?.length || 0,
          note_moyenne: noteMoyenne,
          hasLiked,
          hasVisited
        };
      } catch (error) {
        console.error(`Erreur lors de l'enrichissement du lieu ${lieu.id}:`, error);
        return {
          ...lieu,
          likes: 0,
          visites: 0,
          note_moyenne: 0,
          hasLiked: false,
          hasVisited: false
        };
      }
    }));
    
    lieux.value = lieuxEnrichis;
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    loading.value = false;
  }
};

// Villes uniques pour le filtre
const villesUniques = computed(() => {
  const villes = [...new Set(lieux.value.map(lieu => lieu.ville))];
  return villes.sort();
});

// Filtrage des lieux
const lieuxFiltres = computed(() => {
  let resultat = [...lieux.value];

  // Filtre par recherche (nom)
  if (filtres.value.recherche) {
    resultat = resultat.filter(lieu =>
      lieu.nom.toLowerCase().includes(filtres.value.recherche.toLowerCase())
    );
  }

  // Filtre par type
  if (filtres.value.type) {
    resultat = resultat.filter(lieu => lieu.type === filtres.value.type);
  }

  // Filtre par ville
  if (filtres.value.ville) {
    resultat = resultat.filter(lieu => lieu.ville === filtres.value.ville);
  }

  // Filtre par prix
  if (filtres.value.prix) {
    resultat = resultat.filter(lieu => {
      const prix = lieu.prix || 0;
      switch (filtres.value.prix) {
        case 'gratuit':
          return prix === 0;
        case 'economique':
          return prix > 0 && prix <= 50;
        case 'moyen':
          return prix > 50 && prix <= 150;
        case 'elevé':
          return prix > 150;
        default:
          return true;
      }
    });
  }

  // Filtre par accessibilité
  if (filtres.value.accessible) {
    resultat = resultat.filter(lieu => lieu.accessible_mobilite_reduite);
  }

  // Filtre par validation
  if (filtres.value.validesSeulement) {
    resultat = resultat.filter(lieu => lieu.est_valide);
  }

  // Tri
  resultat.sort((a, b) => {
    switch (filtres.value.tri) {
      case 'recent':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'ancien':
        return new Date(a.created_at) - new Date(b.created_at);
      case 'nom':
        return a.nom.localeCompare(b.nom);
      case 'prix-croissant':
        return (a.prix || 0) - (b.prix || 0);
      case 'prix-decroissant':
        return (b.prix || 0) - (a.prix || 0);
      default:
        return 0;
    }
  });

  return resultat;
});

// Pagination
const pagesTotales = computed(() => {
  return Math.ceil(lieuxFiltres.value.length / lieuxParPage);
});

const lieuxPagination = computed(() => {
  const debut = (pageCourante.value - 1) * lieuxParPage;
  const fin = debut + lieuxParPage;
  return lieuxFiltres.value.slice(debut, fin);
});

// Méthodes
const reinitialiserFiltres = () => {
  filtres.value = {
    recherche: '',
    type: '',
    ville: '',
    accessible: false,
    tri: 'recent'
  };
  pageCourante.value = 1;
};

const pagePrecedente = () => {
  if (pageCourante.value > 1) {
    pageCourante.value--;
  }
};

const pageSuivante = () => {
  if (pageCourante.value < pagesTotales.value) {
    pageCourante.value++;
  }
};

const toggleFiltres = () => {
  showFiltres.value = !showFiltres.value;
};

// Fonctions pour les likes et visites
const toggleLike = async (lieuId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      showLoginModal.value = true;
      return;
    }

    // Trouver le lieu dans la liste
    const lieuIndex = lieux.value.findIndex(l => l.id === lieuId);
    if (lieuIndex === -1) return;

    if (lieux.value[lieuIndex].hasLiked) {
      // Supprimer le like
      const { error: likesError } = await supabase
        .from('likes_lieu')
        .delete()
        .eq('lieu_id', lieuId)
        .eq('user_id', user.id)
      
      if (!likesError) {
        lieux.value[lieuIndex].hasLiked = false;
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
        lieux.value[lieuIndex].hasLiked = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors du like:', error);
  }
};

const toggleVisite = async (lieuId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      showLoginModal.value = true;
      return;
    }

    // Trouver le lieu dans la liste
    const lieuIndex = lieux.value.findIndex(l => l.id === lieuId);
    if (lieuIndex === -1) return;

    if (lieux.value[lieuIndex].hasVisited) {
      // Supprimer la visite
      const { error: visiteError } = await supabase
        .from('visites_lieu')
        .delete()
        .eq('lieu_id', lieuId)
        .eq('user_id', user.id)
      
      if (!visiteError) {
        lieux.value[lieuIndex].hasVisited = false;
      }
    } else {
      // Ajouter la visite
      const { error: visiteError } = await supabase
        .from('visites_lieu')
        .insert([
          {
            lieu_id: lieuId,
            user_id: user.id
          }
        ])
      
      if (!visiteError) {
        lieux.value[lieuIndex].hasVisited = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la visite:', error);
  }
};

// Fonction pour résumer la description
function extractTextFromDescription(desc) {
  if (!desc) return '';
  try {
    // Si c'est du JSON (Delta Quill)
    const delta = JSON.parse(desc);
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

function resumeDescription(desc) {
  const txt = extractTextFromDescription(desc).replace(/\s+/g, ' ').trim()
  return txt.length > 90 ? txt.substring(0, 90) + '...' : txt
}

// Fonctions pour le modal de connexion
function goToLogin() {
  showLoginModal.value = false
  router.push('/login')
}

function goToRegister() {
  showLoginModal.value = false
  router.push('/register')
}

// Watchers
watch(filtres, () => {
  pageCourante.value = 1;
  fetchLieux();
}, { deep: true });

// Initialisation
onMounted(() => {
  fetchLieux();
});
</script> 