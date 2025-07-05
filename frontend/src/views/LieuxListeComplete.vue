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
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <!-- Type -->
          <div class="flex-1 max-w-xs mx-auto lg:mx-0">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Type</label>
            <select
              v-model="filtres.type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
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
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
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
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 rounded dark:bg-gray-900"
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
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
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

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        <LieuCard
          v-for="lieu in lieuxPagination"
          :key="lieu.id"
          :lieu="lieu"
          class="h-full"
        />
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { supabase } from '../supabase';
import LieuCard from '../components/LieuCard.vue';

// État réactif
const lieux = ref([]);
const loading = ref(true);
const pageCourante = ref(1);
const lieuxParPage = 12;
const showFiltres = ref(false);

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
    
    lieux.value = data || [];
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