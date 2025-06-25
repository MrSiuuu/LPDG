<template>
  <div v-if="videos.length > 0" class="bg-white rounded-lg shadow p-6 mt-8">
    <h2 class="text-xl font-bold mb-4 text-indigo-700 flex items-center">
      <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Vidéos de présentation
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="video in videos" :key="video.id" class="bg-gray-50 rounded-lg p-4">
        <div class="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
          <iframe 
            v-if="getVideoEmbedUrl(video.url_video)"
            :src="getVideoEmbedUrl(video.url_video)"
            class="w-full h-full rounded-lg"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div v-else class="text-gray-500 text-center">
            <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p>Vidéo non disponible</p>
          </div>
        </div>
        
        <h3 class="font-semibold text-gray-800 mb-1">{{ video.titre }}</h3>
        <p v-if="video.description" class="text-sm text-gray-600 mb-2">{{ video.description }}</p>
        
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span v-if="video.duree_secondes" class="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            {{ formatDuration(video.duree_secondes) }}
          </span>
          <span class="bg-gray-100 px-2 py-1 rounded capitalize">
            {{ video.type_video }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const props = defineProps({
  lieuId: {
    type: Number,
    required: true
  }
})

const videos = ref([])
const loading = ref(false)

function getVideoEmbedUrl(url) {
  if (!url) return null
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null
  }
  
  return null
}

function formatDuration(seconds) {
  if (!seconds) return ''
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

async function fetchVideos() {
  loading.value = true
  try {
    const { data } = await supabase
      .from('videos_lieu')
      .select('*')
      .eq('lieu_id', props.lieuId)
      .order('est_principale', { ascending: false })
      .order('created_at', { ascending: false })
    
    videos.value = data || []
  } catch (error) {
    console.error('Erreur lors du chargement des vidéos:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchVideos()
})
</script> 