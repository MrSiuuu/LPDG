<template>
  <div 
    class="flex items-center justify-center rounded-full text-white font-semibold"
    :class="sizeClasses"
    :style="{ backgroundColor: backgroundColor }"
  >
    {{ initials }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nom: {
    type: String,
    default: ''
  },
  prenom: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg, xl
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

// Générer les initiales
const initials = computed(() => {
  const nomInitial = props.nom ? props.nom.charAt(0).toUpperCase() : ''
  const prenomInitial = props.prenom ? props.prenom.charAt(0).toUpperCase() : ''
  return `${prenomInitial}${nomInitial}` || 'U'
})

// Générer une couleur de fond basée sur le nom (pour avoir une couleur cohérente)
const backgroundColor = computed(() => {
  const colors = [
    '#3B82F6', // bleu
    '#EF4444', // rouge
    '#10B981', // vert
    '#F59E0B', // orange
    '#8B5CF6', // violet
    '#EC4899', // rose
    '#06B6D4', // cyan
    '#84CC16', // lime
    '#F97316', // orange foncé
    '#6366F1'  // indigo
  ]
  
  const name = `${props.prenom}${props.nom}`.toLowerCase()
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
})

// Classes de taille
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl'
  }
  return sizes[props.size]
})
</script> 