<template>
  <div class="pt-20 max-w-5xl mx-auto py-10 px-4 bg-white min-h-screen">
    <button @click="$router.back()" class="mb-6 text-indigo-600 hover:underline flex items-center">
      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Retour
    </button>

    <!-- Images / Carrousel -->
    <div class="mb-8">
      <img v-if="lieu.image_principale" :src="lieu.image_principale" class="w-full h-96 object-cover rounded-lg shadow mb-4 border bg-white" alt="Image principale" />
      <div v-if="lieu.images && lieu.images.length" class="flex gap-2 flex-wrap bg-white p-4 rounded-lg">
        <img v-for="img in lieu.images" :key="img" :src="img" class="w-28 h-28 object-cover rounded border hover:scale-105 transition bg-white" />
      </div>
    </div>

    <!-- Infos principales -->
    <div class="bg-white rounded-lg shadow p-8 space-y-4">
      <div class="flex justify-between items-start gap-2 flex-wrap">
        <div class="flex-1">
          <h1 v-if="lieu.nom" class="text-3xl font-bold text-gray-900 mb-2">{{ lieu.nom }}</h1>
          <p v-if="lieu.ville" class="text-lg text-gray-600 mb-3">{{ lieu.ville }}</p>
          
          <!-- Note moyenne avec étoiles -->
          <div v-if="noteMoyenne > 0" class="flex items-center gap-2 mb-3">
            <div class="flex items-center">
              <span v-for="i in 5" :key="i" class="text-2xl" :class="i <= noteMoyenne ? 'text-yellow-400' : 'text-gray-300'">
                ★
              </span>
            </div>
            <span class="text-gray-600 font-medium">{{ noteMoyenne.toFixed(1) }}</span>
            <span class="text-gray-500">({{ nombreAvis }} avis)</span>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <LieuLikes :lieuId="lieuId" />
          <button
            v-if="lieuId"
            @click="handleToggleVisite"
            :class="[
              'btn btn-xs',
              hasVisited ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-700 border-gray-300',
              'rounded-full px-3 py-1 border transition-all duration-200'
            ]"
          >
            <span v-if="hasVisited">Déjà visité ✅</span>
            <span v-else>Déjà visité ?</span>
          </button>
          <!-- Bouton Signaler -->
          <button
            v-if="lieuId && user"
            @click="showSignalementModal = true"
            class="btn btn-xs bg-red-100 text-red-700 border-red-300 rounded-full px-3 py-1 border transition-all duration-200 hover:bg-red-200"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Signaler
          </button>
          <!-- Bouton Signaler pour utilisateurs non connectés -->
          <button
            v-if="lieuId && !user"
            @click="showLoginModal = true"
            class="btn btn-xs bg-gray-100 text-gray-600 border-gray-300 rounded-full px-3 py-1 border transition-all duration-200 hover:bg-gray-200"
            title="Connectez-vous pour signaler ce lieu"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Signaler
          </button>
        </div>
      </div>
      
      <div class="text-gray-700 space-y-3">
        <p v-if="lieu.adresse"><strong class="text-indigo-700">Adresse :</strong> {{ lieu.adresse }}</p>
        <p v-if="lieu.type"><strong class="text-indigo-700">Type :</strong> {{ lieu.type }}</p>
        <p v-if="lieu.prix"><strong class="text-indigo-700">Prix :</strong> {{ lieu.prix }} €</p>
        
        <!-- Accessibilité -->
        <div v-if="lieu.accessible_mobilite_reduite" class="flex items-center gap-2 text-green-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">Accessible aux personnes à mobilité réduite</span>
        </div>
        
        <div v-if="lieu.description">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">Description :</h2>
          <p class="text-gray-800 whitespace-pre-line">{{ lieu.description }}</p>
        </div>
      </div>
    </div>

    <!-- Vidéos de présentation -->
    <LieuVideo v-if="lieuId" :lieuId="lieuId" />

    <!-- Événements à venir -->
    <LieuEvenements v-if="lieuId" :lieuId="lieuId" />

    <!-- Liens & Ressources -->
    <LieuRessources :lieu="lieu" />

    <!-- Contact rapide -->
    <LieuContacts v-if="lieuId" :lieuId="lieuId" />

    <!-- Partage sur les réseaux sociaux -->
    <LieuPartage :lieu="lieu" />

    <!-- Avis -->
    <div class="bg-white rounded-lg shadow p-6 mt-8">
      <h2 class="text-xl font-bold mb-4 text-indigo-700">Avis des visiteurs</h2>
      
      <!-- Formulaire d'avis pour utilisateurs connectés -->
      <form v-if="user" @submit.prevent="submitAvis" class="mb-6 flex flex-col gap-3 bg-gray-50 p-4 rounded">
        <div class="flex items-center gap-2">
          <label class="font-semibold">Note :</label>
          <select v-model="newAvis.note" required class="border rounded px-2 py-1">
            <option disabled value="">Choisir</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} ⭐</option>
          </select>
        </div>
        <textarea v-model="newAvis.commentaire" required rows="2" placeholder="Votre commentaire..." class="border rounded px-2 py-1"></textarea>
        <button type="submit" class="self-end bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Envoyer</button>
      </form>
      
      <!-- Message d'invitation à la connexion pour les avis -->
      <div v-else class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-blue-500">🔐</span>
          <span class="text-sm font-medium text-blue-800">Connexion requise</span>
        </div>
        <p class="text-sm text-blue-600 mb-3">Connectez-vous pour laisser un avis sur ce lieu</p>
        <div class="flex gap-2">
          <button 
            @click="goToLogin" 
            class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Se connecter
          </button>
          <button 
            @click="goToRegister" 
            class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
          >
            S'inscrire
          </button>
        </div>
      </div>

      <div v-if="loadingAvis" class="text-gray-500">Chargement des avis...</div>
      <div v-else-if="avis.length === 0" class="text-gray-400">Aucun avis pour ce lieu.</div>
      <div v-else class="space-y-4">
        <div v-for="a in avis" :key="a.id" class="border-b pb-2">
          <div class="flex items-center gap-2">
            <span class="font-bold text-indigo-700">{{ a.user_nom || 'Utilisateur' }}</span>
            <span class="text-yellow-500">{{ '★'.repeat(a.note) }}</span>
            <span class="text-xs text-gray-400">{{ formatDate(a.created_at) }}</span>
          </div>
          <div class="text-gray-700">{{ a.commentaire }}</div>
        </div>
      </div>
    </div>

    <!-- Modal de signalement -->
    <SignalementModal 
      :show="showSignalementModal" 
      :lieuId="lieuId"
      @close="showSignalementModal = false"
      @signalement-created="onSignalementCreated"
    />
    
    <!-- Modal d'invitation à la connexion -->
    <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <span class="text-2xl">🔐</span>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Connexion requise</h3>
          <p class="text-sm text-gray-600 mb-6">
            Connectez-vous pour interagir avec ce lieu (visites, avis, signalements)
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
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase'
import LieuLikes from '../components/LieuLikes.vue'
import SignalementModal from '../components/SignalementModal.vue'
import LieuVideo from '../components/LieuVideo.vue'
import LieuEvenements from '../components/LieuEvenements.vue'
import LieuContacts from '../components/LieuContacts.vue'
import LieuRessources from '../components/LieuRessources.vue'
import LieuPartage from '../components/LieuPartage.vue'
import api from '../utils/api'

const route = useRoute()
const router = useRouter()
const lieu = ref({})
const hasVisited = ref(false)
const avis = ref([])
const loadingAvis = ref(false)
const newAvis = ref({ note: '', commentaire: '' })
const showSignalementModal = ref(false)
const showLoginModal = ref(false)
const user = ref(null)

// Récupérer l'ID du lieu depuis la route et le convertir en nombre
const lieuId = computed(() => {
  const id = Number(route.params.id)
  return isNaN(id) ? null : id
})

// Calcul de la note moyenne et nombre d'avis
const noteMoyenne = computed(() => {
  if (avis.value.length === 0) return 0
  const total = avis.value.reduce((sum, avis) => sum + avis.note, 0)
  return total / avis.value.length
})

const nombreAvis = computed(() => avis.value.length)

async function fetchUser() {
  try {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser
  } catch (e) {
    user.value = null
  }
}

async function fetchHasVisited() {
  if (!lieuId.value) return
  try {
    const { data } = await api.get(`/api/lieux/${lieuId.value}/has-visited`)
    hasVisited.value = data?.hasVisited || false
  } catch (e) {
    // Si erreur 401 (non connecté), on considère que l'utilisateur n'a pas visité
    // Pas de redirection automatique
    hasVisited.value = false
  }
}

async function toggleVisite() {
  if (!lieuId.value) return
  try {
    if (!hasVisited.value) {
      await api.post(`/api/lieux/${lieuId.value}/visite`, {})
      hasVisited.value = true
    } else {
      await api.delete(`/api/lieux/${lieuId.value}/visite`)
      hasVisited.value = false
    }
  } catch (e) {
    // gestion d'erreur
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-FR')
}

async function fetchAvis() {
  loadingAvis.value = true
  try {
    const { data } = await supabase
      .from('avis')
      .select('*, user_profiles(nom)')
      .eq('lieu_id', lieuId.value)
      .order('created_at', { ascending: false })
    avis.value = (data || []).map(a => ({ ...a, user_nom: a.user_profiles?.nom }))
  } finally {
    loadingAvis.value = false
  }
}

async function submitAvis() {
  if (!newAvis.value.note || !newAvis.value.commentaire || !lieuId.value) return
  try {
    await api.post(`/api/lieux/${lieuId.value}/avis`, newAvis.value)
    newAvis.value.note = ''
    newAvis.value.commentaire = ''
    await fetchAvis()
  } catch (e) {}
}

function onSignalementCreated() {
  // Optionnel : afficher un message de confirmation ou rafraîchir les données
  console.log('Signalement créé avec succès')
}

async function handleToggleVisite() {
  if (!lieuId.value) return
  
  if (!user.value) {
    showLoginModal.value = true
    return
  }
  
  await toggleVisite()
}

function goToLogin() {
  showLoginModal.value = false
  router.push('/login')
}

function goToRegister() {
  showLoginModal.value = false
  router.push('/register')
}

onMounted(async () => {
  await fetchUser()
  
  if (!lieuId.value) {
    console.error('ID de lieu invalide:', route.params.id)
    return
  }
  
  const { data } = await supabase
    .from('lieux')
    .select('*')
    .eq('id', lieuId.value)
    .single()

  if (data && typeof data.images === 'string') {
    try { data.images = JSON.parse(data.images) } catch {}
  }

  if (!data.images) data.images = []
  lieu.value = data || {}
  await fetchHasVisited()
  await fetchAvis()
})
</script>
