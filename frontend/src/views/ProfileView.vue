<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white shadow rounded-lg">
        <!-- En-tête du profil -->
        <div class="px-4 py-5 sm:px-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                :src="profile.avatar_url || 'https://via.placeholder.com/150'"
                alt="Avatar"
                class="h-16 w-16 rounded-full"
              />
            </div>
            <div class="ml-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ profile.full_name }}
              </h3>
              <p class="text-sm text-gray-500">{{ profile.email }}</p>
              <p class="text-sm text-gray-500">Rôle: {{ profile.role }}</p>
            </div>
          </div>
        </div>

        <!-- Informations du profil -->
        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Titre</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ profile.title || 'Non spécifié' }}</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ profile.phone || 'Non spécifié' }}</dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Bio</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ profile.bio || 'Non spécifié' }}</dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">CV</dt>
              <dd class="mt-1 text-sm text-gray-900">
                <a
                  v-if="profile.cv_url"
                  :href="profile.cv_url"
                  target="_blank"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Voir le CV
                </a>
                <span v-else>Non téléchargé</span>
              </dd>
            </div>
          </dl>
        </div>

        <!-- Boutons d'action -->
        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div class="flex justify-end space-x-3">
            <button
              @click="editProfile"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Modifier le profil
            </button>
            <button
              @click="handleLogout"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/config/api'

const router = useRouter()
const profile = ref({})

const fetchProfile = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Non authentifié')

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    profile.value = data
  } catch (error) {
    console.error('Erreur lors du chargement du profil:', error.message)
    router.push('/login')
  }
}

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error.message)
  }
}

const editProfile = () => {
  router.push('/profile/edit')
}

onMounted(() => {
  fetchProfile()
})
</script> 