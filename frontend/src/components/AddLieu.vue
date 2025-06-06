<template>
  <div class="max-w-2xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Ajouter un lieu touristique</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nom</label>
        <input v-model="form.nom" type="text" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Type</label>
        <select v-model="form.type" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          <option value="monument">Monument</option>
          <option value="musee">Musée</option>
          <option value="parc">Parc</option>
          <option value="restaurant">Restaurant</option>
          <option value="hotel">Hôtel</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Ville</label>
        <input v-model="form.ville" type="text" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea v-model="form.description" rows="4" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Prix (optionnel)</label>
        <input v-model="form.prix" type="number" step="0.01"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Adresse</label>
        <input v-model="form.adresse" type="text" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Latitude</label>
          <input v-model="form.latitude" type="number" step="any"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Longitude</label>
          <input v-model="form.longitude" type="number" step="any"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Image principale</label>
        <input type="file" @change="handleImageUpload" accept="image/*"
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
      </div>

      <button type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Ajouter le lieu
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

const router = useRouter();
const form = ref({
  nom: '',
  type: '',
  ville: '',
  description: '',
  prix: null,
  adresse: '',
  latitude: null,
  longitude: null,
  image_principale: '' // Doit être une URL, pas un fichier
});

let imageFile = null;

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile = file;
  }
};

const submitForm = async () => {
  try {
    // Recherche du token dans le localStorage (clé sb-...-auth-token)
    let token = null;
    for (const key in localStorage) {
      if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
        const session = JSON.parse(localStorage.getItem(key));
        token = session?.access_token;
        break;
      }
    }

    if (!token) {
      throw new Error("Utilisateur non authentifié ou token manquant.");
    }

    // 1. Upload de l'image si présente
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `lieux/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('images').upload(fileName, imageFile);
      if (error) throw new Error('Erreur lors de l\'upload de l\'image');
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
      form.value.image_principale = publicUrlData.publicUrl;
      console.log('URL image assignée :', publicUrlData.publicUrl);
    }

    // 2. Envoi du formulaire avec l'URL de l'image
    console.log('Formulaire envoyé :', form.value);
    const response = await fetch('/api/lieux', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du lieu');
    }

    const data = await response.json();
    router.push('/'); // Redirection vers la page d'accueil
  } catch (error) {
    console.error('Erreur:', error);
    // Ici, vous pourriez ajouter une notification d'erreur
  }
};
</script> 