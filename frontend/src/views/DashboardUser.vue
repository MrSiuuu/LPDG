<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- En-tête avec photo de profil et bouton d'édition -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                :src="profile.photo || 'https://via.placeholder.com/150'"
                alt="Avatar"
                class="h-16 w-16 rounded-full"
              />
              <div class="ml-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {{ profile.nom }}
                </h3>
                <p class="text-sm text-gray-500">{{ profile.email }}</p>
              </div>
            </div>
            <button
              @click="showEditModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Modifier le profil
            </button>
          </div>
        </div>
      </div>

      <!-- Contenu du dashboard -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium text-gray-900">Tableau de bord</h2>
          <!-- Ajoutez ici le contenu spécifique du dashboard -->
        </div>
      </div>
    </div>

    <!-- Modal d'édition -->
    <EditProfileModal
      :is-open="showEditModal"
      :profile="profile"
      @close="showEditModal = false"
      @update="handleProfileUpdate"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import EditProfileModal from '../components/modals/EditProfileModal.vue'

const router = useRouter()
const profile = ref({})
const showEditModal = ref(false)

const fetchProfile = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non authentifié')

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*, roles(label)')
      .eq('id', user.id)
      .single()

    if (error) throw error
    profile.value = data
  } catch (error) {
    console.error('Erreur lors du chargement du profil:', error.message)
    router.push('/login')
  }
}

const handleProfileUpdate = (updatedProfile) => {
  profile.value = { ...profile.value, ...updatedProfile }
}

onMounted(() => {
  fetchProfile()
})
</script> 