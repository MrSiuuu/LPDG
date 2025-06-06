<template>
  <div class="image-uploader">
    <div 
      class="upload-area"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        class="hidden"
        @change="handleFileSelect"
      >
      <div class="upload-content">
        <i class="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
        <p class="mt-2 text-gray-600">Glissez-déposez vos images ici ou cliquez pour sélectionner</p>
      </div>
    </div>
    
    <div v-if="uploadedImages.length > 0" class="image-preview-grid">
      <div v-for="(image, index) in uploadedImages" :key="index" class="image-preview-item">
        <img :src="image.url" :alt="image.name" class="preview-image">
        <div class="image-actions">
          <button @click="copyImageUrl(image.url)" class="action-button">
            <i class="fas fa-copy"></i>
          </button>
          <button @click="removeImage(index)" class="action-button text-red-500">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const emit = defineEmits(['upload-complete'])
const fileInput = ref(null)
const uploadedImages = ref([])

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = async (event) => {
  const files = event.target.files
  await uploadFiles(files)
}

const handleDrop = async (event) => {
  const files = event.dataTransfer.files
  await uploadFiles(files)
}

const uploadFiles = async (files) => {
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `article-images/${fileName}`

      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath)

      uploadedImages.value.push({
        name: file.name,
        url: publicUrl
      })

      emit('upload-complete', {
        name: file.name,
        url: publicUrl
      })
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
    }
  }
}

const copyImageUrl = (url) => {
  navigator.clipboard.writeText(url)
}

const removeImage = (index) => {
  uploadedImages.value.splice(index, 1)
}
</script>

<style>
.image-uploader {
  @apply w-full;
}

.upload-area {
  @apply border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors;
}

.upload-content {
  @apply flex flex-col items-center;
}

.image-preview-grid {
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4;
}

.image-preview-item {
  @apply relative rounded-lg overflow-hidden border;
}

.preview-image {
  @apply w-full h-32 object-cover;
}

.image-actions {
  @apply absolute top-2 right-2 flex gap-2;
}

.action-button {
  @apply p-1 rounded-full bg-white shadow hover:bg-gray-100 transition-colors;
}

.hidden {
  display: none;
}
</style> 