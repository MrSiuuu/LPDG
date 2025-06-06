<template>
  <div class="rich-text-editor">
    <div v-if="isEditorReady" class="editor-menu">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <i class="fas fa-bold"></i>
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
        <i class="fas fa-italic"></i>
      </button>
      <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
        <i class="fas fa-underline"></i>
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        <i class="fas fa-list-ul"></i>
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        <i class="fas fa-list-ol"></i>
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        <i class="fas fa-quote-right"></i>
      </button>
      <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        <i class="fas fa-align-left"></i>
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        <i class="fas fa-align-center"></i>
      </button>
      <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        <i class="fas fa-align-right"></i>
      </button>
      <button @click="addImage">
        <i class="fas fa-image"></i>
      </button>
      <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
        <i class="fas fa-link"></i>
      </button>
    </div>
    <editor-content v-if="isEditorReady" :editor="editor" class="editor-content" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { onBeforeUnmount, watch, ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const editor = ref(null)
const isEditorReady = ref(false)

const initEditor = () => {
  if (editor.value) return

  editor.value = useEditor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline'
        }
      }),
      Placeholder.configure({
        placeholder: 'Commencez à écrire votre article...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    },
    onCreate: () => {
      isEditorReady.value = true
    }
  })
}

watch(() => props.modelValue, (newValue) => {
  if (editor.value && !editor.value.isDestroyed && isEditorReady.value) {
    const isSame = newValue === editor.value.getHTML()
    if (!isSame) {
      editor.value.commands.setContent(newValue, false)
    }
  }
}, { immediate: true })

const addImage = async () => {
  const url = window.prompt('URL de l\'image')
  if (url) {
    try {
      // Vérifier si l'URL est valide
      const response = await fetch(url, { method: 'HEAD' })
      if (!response.ok) {
        throw new Error('URL d\'image invalide')
      }
      
      // Vérifier le type de contenu
      const contentType = response.headers.get('content-type')
      if (!contentType?.startsWith('image/')) {
        throw new Error('L\'URL ne pointe pas vers une image valide')
      }

      editor.value.chain().focus().setImage({ src: url }).run()
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'image:', error)
      alert(error.message || 'Erreur lors de l\'ajout de l\'image')
    }
  }
}

const setLink = () => {
  if (!editor.value || !isEditorReady.value) return
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  if (url === null) {
    return
  }

  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  if (editor.value && !editor.value.isDestroyed) {
    editor.value.destroy()
    editor.value = null
    isEditorReady.value = false
  }
})
</script>

<style>
.rich-text-editor {
  @apply border rounded-lg overflow-hidden;
}

.editor-menu {
  @apply flex flex-wrap gap-1 p-2 bg-gray-100 border-b;
}

.editor-menu button {
  @apply px-2 py-1 rounded hover:bg-gray-200;
}

.editor-menu button.is-active {
  @apply bg-gray-300;
}

.editor-content {
  @apply p-4 min-h-[200px] prose max-w-none;
}

.editor-content:focus {
  @apply outline-none;
}

.editor-content p {
  @apply my-2;
}

.editor-content h1 {
  @apply text-3xl font-bold my-4;
}

.editor-content h2 {
  @apply text-2xl font-bold my-3;
}

.editor-content ul {
  @apply list-disc pl-5 my-2;
}

.editor-content ol {
  @apply list-decimal pl-5 my-2;
}

.editor-content blockquote {
  @apply border-l-4 border-gray-300 pl-4 my-2 italic;
}
</style> 