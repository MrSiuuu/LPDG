<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Activités récentes
      </h3>
      <button 
        @click="refreshActivities" 
        class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        :disabled="loading"
      >
        <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Chargement des activités...</p>
    </div>

    <div v-else-if="activities.length === 0" class="text-center py-8">
      <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-500 dark:text-gray-400">Aucune activité récente</p>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="activity in activities" 
        :key="activity.id" 
        class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <!-- Icône selon le type d'activité -->
        <div class="flex-shrink-0">
          <div v-if="activity.type === 'nouveau_lieu'" class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>
          <div v-else-if="activity.type === 'nouvel_avis'" class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div v-else-if="activity.type === 'nouveau_like'" class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        <!-- Contenu de l'activité -->
        <div class="flex-1 min-w-0">
          <p class="text-sm text-gray-900 dark:text-gray-100">
            <span class="font-medium">{{ activity.user_nom }}</span>
            <span v-if="activity.type === 'nouveau_lieu'">
              a ajouté un nouveau lieu
            </span>
            <span v-else-if="activity.type === 'nouvel_avis'">
              a laissé un avis sur
            </span>
            <span v-else-if="activity.type === 'nouveau_like'">
              a aimé
            </span>
            <span class="font-medium text-indigo-600 dark:text-indigo-400">
              {{ activity.lieu_nom }}
            </span>
          </p>
          
          <div v-if="activity.commentaire" class="mt-1">
            <p class="text-xs text-gray-500 dark:text-gray-400 italic">
              "{{ activity.commentaire.length > 50 ? activity.commentaire.substring(0, 50) + '...' : activity.commentaire }}"
            </p>
          </div>

          <div class="flex items-center justify-between mt-2">
            <span class="text-xs text-gray-400 dark:text-gray-500">
              {{ formatTimeAgo(activity.created_at) }}
            </span>
            
            <router-link 
              :to="`/lieu/${activity.lieu_id}`"
              class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
            >
              Voir le lieu →
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Bouton "Voir plus" si il y a beaucoup d'activités -->
    <div v-if="activities.length >= 5" class="mt-4 text-center">
      <button 
        @click="loadMoreActivities"
        class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
      >
        Voir plus d'activités
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const activities = ref([])
const loading = ref(false)
const page = ref(1)
const limit = 10

// Charger les activités récentes
const loadActivities = async () => {
  loading.value = true
  try {
    // Récupérer les nouveaux lieux validés (7 derniers jours)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const { data: nouveauxLieux, error: lieuxError } = await supabase
      .from('lieux')
      .select(`
        id,
        nom,
        created_at,
        user_profiles:user_id (
          nom,
          prenom
        )
      `)
      .eq('est_valide', true)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(limit)

    if (lieuxError) throw lieuxError

    // Récupérer les nouveaux avis (7 derniers jours)
    const { data: nouveauxAvis, error: avisError } = await supabase
      .from('avis')
      .select(`
        id,
        commentaire,
        created_at,
        lieux:lieu_id (
          id,
          nom
        ),
        user_profiles:user_id (
          nom,
          prenom
        )
      `)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(limit)

    if (avisError) throw avisError

    // Récupérer les nouveaux likes (7 derniers jours)
    const { data: nouveauxLikes, error: likesError } = await supabase
      .from('likes_lieu')
      .select(`
        id,
        created_at,
        lieux:lieu_id (
          id,
          nom
        ),
        user_profiles:user_id (
          nom,
          prenom
        )
      `)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(limit)

    if (likesError) throw likesError

    // Combiner et formater toutes les activités
    const allActivities = []

    // Ajouter les nouveaux lieux
    if (nouveauxLieux) {
      nouveauxLieux.forEach(lieu => {
        allActivities.push({
          id: `lieu-${lieu.id}`,
          type: 'nouveau_lieu',
          lieu_id: lieu.id,
          lieu_nom: lieu.nom,
          user_nom: `${lieu.user_profiles?.prenom || ''} ${lieu.user_profiles?.nom || ''}`.trim() || 'Un utilisateur',
          created_at: lieu.created_at
        })
      })
    }

    // Ajouter les nouveaux avis
    if (nouveauxAvis) {
      nouveauxAvis.forEach(avis => {
        allActivities.push({
          id: `avis-${avis.id}`,
          type: 'nouvel_avis',
          lieu_id: avis.lieux?.id,
          lieu_nom: avis.lieux?.nom || 'un lieu',
          user_nom: `${avis.user_profiles?.prenom || ''} ${avis.user_profiles?.nom || ''}`.trim() || 'Un utilisateur',
          commentaire: avis.commentaire,
          created_at: avis.created_at
        })
      })
    }

    // Ajouter les nouveaux likes
    if (nouveauxLikes) {
      nouveauxLikes.forEach(like => {
        allActivities.push({
          id: `like-${like.id}`,
          type: 'nouveau_like',
          lieu_id: like.lieux?.id,
          lieu_nom: like.lieux?.nom || 'un lieu',
          user_nom: `${like.user_profiles?.prenom || ''} ${like.user_profiles?.nom || ''}`.trim() || 'Un utilisateur',
          created_at: like.created_at
        })
      })
    }

    // Trier par date de création (plus récent en premier)
    allActivities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    // Limiter le nombre d'activités affichées
    activities.value = allActivities.slice(0, 10)

  } catch (error) {
    console.error('Erreur lors du chargement des activités:', error)
    activities.value = []
  } finally {
    loading.value = false
  }
}

// Formater le temps écoulé
const formatTimeAgo = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) {
    return 'À l\'instant'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`
  }
}

// Rafraîchir les activités
const refreshActivities = () => {
  loadActivities()
}

// Charger plus d'activités
const loadMoreActivities = () => {
  page.value++
  // Ici on pourrait implémenter la pagination si nécessaire
  loadActivities()
}

onMounted(() => {
  loadActivities()
})
</script> 