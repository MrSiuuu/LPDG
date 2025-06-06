<template>
  <div class="max-w-4xl mx-auto py-10">
    <h2 class="text-2xl font-bold mb-6">{{ isEdit ? 'Modifier un article' : 'Créer un article' }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-8 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Colonne gauche -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Titre</label>
            <input
              v-model="formData.title"
              type="text"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Entrez le titre de l'article"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Description courte</label>
            <textarea
              v-model="formData.metaDescription"
              rows="2"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Une brève description de l'article (utilisée pour le SEO)"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Image principale</label>
            <ImageUploader @upload-complete="handleImageUpload" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Tags</label>
            <div class="mt-1">
              <input
                v-model="tagInput"
                type="text"
                class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ajouter un tag et appuyez sur Entrée"
                @keydown.enter.prevent="addTag"
              >
              <div class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in formData.tags"
                  :key="index"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  #{{ tag }}
                  <button
                    type="button"
                    class="ml-1 text-indigo-600 hover:text-indigo-900"
                    @click="removeTag(index)"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div>
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="formData.isDraft"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <span class="ml-2 text-sm text-gray-700">Enregistrer comme brouillon</span>
            </label>
          </div>
        </div>
        <!-- Colonne droite -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Contenu</label>
            <RichTextEditor v-model="formData.contenu" />
          </div>
        </div>
      </div>
      <div class="mt-5 flex justify-end gap-4">
        <button
          type="button"
          class="btn-secondary"
          @click="handleCancel"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="btn-primary"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Enregistrement...' : (isEdit ? 'Modifier' : 'Ajouter') }}
        </button>
      </div>
      <div v-if="error" class="mt-4 text-sm text-red-600">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import axios from 'axios'
import { supabase } from '../supabase'
import RichTextEditor from './RichTextEditor.vue'
import ImageUploader from './ImageUploader.vue'
import ArticlePreview from './ArticlePreview.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  article: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['created'])

const isSubmitting = ref(false)
const tagInput = ref('')
const showPreview = ref(true)
const error = ref(null)

const formData = reactive({
  title: '',
  contenu: '',
  metaDescription: '',
  imagePrincipale: null,
  tags: [],
  isDraft: true
})

const router = useRouter()

// Initialiser les données du formulaire
onMounted(() => {
  if (props.article) {
    Object.assign(formData, {
      title: props.article.title || '',
      contenu: props.article.contenu || '',
      metaDescription: props.article.metaDescription || '',
      imagePrincipale: props.article.imagePrincipale || null,
      tags: props.article.tags || [],
      isDraft: props.article.isDraft ?? true
    })
  }
})

const isEdit = !!props.article

const handleImageUpload = (image) => {
  formData.imagePrincipale = image.url
}

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
  }
  tagInput.value = ''
}

const removeTag = (index) => {
  formData.tags.splice(index, 1)
}

const handleSubmit = async () => {
  error.value = null
  isSubmitting.value = true
  
  try {
    const { data } = await supabase.auth.getSession()
    const token = data?.session?.access_token
    
    if (!token) {
      throw new Error('Non authentifié')
    }

    const headers = { Authorization: `Bearer ${token}` }

    const articleData = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      updated_at: new Date().toISOString()
    }

    if (isEdit) {
      await axios.put(`/api/articles/${props.article.id}`, articleData, { headers })
    } else {
      articleData.created_at = new Date().toISOString()
      await axios.post('/api/articles', articleData, { headers })
    }

    emit('created')
    router.back()
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement:', err)
    error.value = err.response?.data?.message || err.message || 'Une erreur est survenue lors de l\'enregistrement'
  } finally {
    isSubmitting.value = false
  }
}

function handleCancel() {
  router.back()
}
</script>

<style>
.article-form {
  @apply max-w-4xl mx-auto;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500;
}

.form-textarea {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500;
}

.form-checkbox {
  @apply h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded;
}

.tags-input {
  @apply space-y-2;
}

.tags-list {
  @apply flex flex-wrap gap-2 mt-2;
}

.tag {
  @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800;
}

.tag-remove {
  @apply ml-1 text-blue-600 hover:text-blue-800;
}

.form-actions {
  @apply flex justify-end gap-4;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50;
}

.btn-secondary {
  @apply px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
}

.preview-section {
  @apply mt-8 pt-8 border-t;
}

.preview-title {
  @apply text-lg font-medium text-gray-900 mb-4;
}

.error-message {
  @apply text-red-600 text-sm mt-2;
}
</style> 