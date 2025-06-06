<template>
  <div class="article-preview">
    <div class="preview-header">
      <h2 class="preview-title">{{ title }}</h2>
      <div class="preview-meta">
        <span class="preview-date">{{ formattedDate }}</span>
        <span class="preview-status" :class="statusClass">{{ statusText }}</span>
      </div>
    </div>

    <div v-if="imagePrincipale" class="preview-image-container">
      <img :src="imagePrincipale" :alt="title" class="preview-image">
    </div>

    <div class="preview-content" v-html="contenu"></div>

    <div class="preview-footer">
      <div class="preview-tags">
        <span v-for="tag in tags" :key="tag" class="preview-tag">
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  contenu: {
    type: String,
    required: true
  },
  imagePrincipale: {
    type: String,
    default: null
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'draft'
  },
  tags: {
    type: Array,
    default: () => []
  }
})

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const statusText = computed(() => {
  return props.status === 'draft' ? 'Brouillon' : 'Publié'
})

const statusClass = computed(() => {
  return {
    'bg-yellow-100 text-yellow-800': props.status === 'draft',
    'bg-green-100 text-green-800': props.status === 'published'
  }
})
</script>

<style>
.article-preview {
  @apply bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto;
}

.preview-header {
  @apply mb-6;
}

.preview-title {
  @apply text-3xl font-bold text-gray-900 mb-2;
}

.preview-meta {
  @apply flex items-center gap-4 text-sm text-gray-600;
}

.preview-status {
  @apply px-2 py-1 rounded-full text-xs font-medium;
}

.preview-image-container {
  @apply mb-6 rounded-lg overflow-hidden;
}

.preview-image {
  @apply w-full h-64 object-cover;
}

.preview-content {
  @apply prose prose-lg max-w-none;
}

.preview-content img {
  @apply rounded-lg my-4;
}

.preview-content h1 {
  @apply text-3xl font-bold mt-8 mb-4;
}

.preview-content h2 {
  @apply text-2xl font-bold mt-6 mb-3;
}

.preview-content p {
  @apply my-4 text-gray-700 leading-relaxed;
}

.preview-content blockquote {
  @apply border-l-4 border-gray-300 pl-4 my-4 italic;
}

.preview-content ul, .preview-content ol {
  @apply my-4 pl-6;
}

.preview-content li {
  @apply my-1;
}

.preview-footer {
  @apply mt-8 pt-4 border-t;
}

.preview-tags {
  @apply flex flex-wrap gap-2;
}

.preview-tag {
  @apply px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm;
}
</style> 