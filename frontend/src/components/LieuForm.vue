<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ editingLieu ? 'Modifier le lieu' : 'Ajouter un nouveau lieu' }}
      </h2>
      <p class="text-gray-600 mt-2">
        {{ editingLieu ? 'Modifiez les informations du lieu' : 'Remplissez les informations pour ajouter un nouveau lieu' }}
      </p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Section Informations de base -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Informations de base</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Colonne gauche -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom du lieu *</label>
              <input v-model="form.nom" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Type *</label>
              <select v-model="form.type" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">Sélectionner un type</option>
                <option value="restaurant">Restaurant</option>
                <option value="hotel">Hôtel</option>
                <option value="monument">Monument</option>
                <option value="musee">Musée</option>
                <option value="parc">Parc</option>
                <option value="shopping">Shopping</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Ville *</label>
              <input v-model="form.ville" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Adresse *</label>
              <input v-model="form.adresse" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Prix approximatif (€)</label>
              <input v-model="form.prix" type="number" step="0.01" min="0" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>

            <!-- Coordonnées -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="latitude" class="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  id="latitude"
                  v-model="form.latitude"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="14.7167"
                />
              </div>
              <div>
                <label for="longitude" class="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  id="longitude"
                  v-model="form.longitude"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="-17.4677"
                />
              </div>
            </div>

            <!-- Accessibilité -->
            <div class="flex items-center">
              <input
                id="accessible"
                v-model="form.accessible_mobilite_reduite"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="accessible" class="ml-2 block text-sm text-gray-900">
                Accessible aux personnes à mobilité réduite
              </label>
            </div>
          </div>

          <!-- Colonne droite -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Description *</label>
              <textarea v-model="form.description" rows="4" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Image principale</label>
              <div class="mt-1 flex items-center space-x-4">
                <input type="file" @change="handleMainImageUpload" accept="image/*" class="hidden" ref="mainImageInput">
                <button type="button" @click="$refs.mainImageInput.click()" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Choisir une image
                </button>
                <img v-if="mainImagePreview" :src="mainImagePreview" class="h-20 w-20 object-cover rounded-md">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Galerie d'images</label>
              <div class="mt-1">
                <input type="file" @change="handleGalleryUpload" accept="image/*" multiple class="hidden" ref="galleryInput">
                <button type="button" @click="$refs.galleryInput.click()" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Ajouter des images
                </button>
                <div class="mt-2 grid grid-cols-4 gap-2">
                  <div v-for="(image, index) in galleryPreviews" :key="index" class="relative">
                    <img :src="image" class="h-20 w-20 object-cover rounded-md">
                    <button type="button" @click="removeGalleryImage(index)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Réseaux sociaux -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Réseaux sociaux</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Facebook</label>
            <input v-model="form.reseaux_sociaux.facebook" type="url" placeholder="https://facebook.com/..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Instagram</label>
            <input v-model="form.reseaux_sociaux.instagram" type="url" placeholder="https://instagram.com/..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Twitter/X</label>
            <input v-model="form.reseaux_sociaux.twitter" type="url" placeholder="https://twitter.com/..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input v-model="form.reseaux_sociaux.linkedin" type="url" placeholder="https://linkedin.com/..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">YouTube</label>
            <input v-model="form.reseaux_sociaux.youtube" type="url" placeholder="https://youtube.com/..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Site web</label>
            <input v-model="form.reseaux_sociaux.website" type="url" placeholder="https://..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
        </div>
      </div>

      <!-- Section Vidéos -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Vidéos de présentation</h3>
        <div class="space-y-4">
          <div v-for="(video, index) in form.videos" :key="index" class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Titre de la vidéo</label>
                <input v-model="video.titre" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">URL de la vidéo (YouTube/Vimeo)</label>
                <input v-model="video.url_video" type="url" placeholder="https://youtube.com/watch?v=..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea v-model="video.description" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
              <div class="flex items-end space-x-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700">Type de vidéo</label>
                  <select v-model="video.type_video" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="presentation">Présentation</option>
                    <option value="visite">Visite virtuelle</option>
                    <option value="evenement">Événement</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div class="flex items-center">
                  <input
                    :id="`video-principale-${index}`"
                    v-model="video.est_principale"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label :for="`video-principale-${index}`" class="ml-2 block text-sm text-gray-900">
                    Principale
                  </label>
                </div>
              </div>
            </div>
            <button type="button" @click="removeVideo(index)" class="mt-3 text-red-600 hover:text-red-800 text-sm">
              Supprimer cette vidéo
            </button>
          </div>
          <button type="button" @click="addVideo" class="px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            + Ajouter une vidéo
          </button>
        </div>
      </div>

      <!-- Section Événements -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Événements à venir</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Ce lieu a-t-il des événements à venir ?</label>
          <button type="button" v-if="!showEvenementForm" @click="showEvenementForm = true" class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded mr-2">Oui</button>
          <button type="button" v-if="showEvenementForm" @click="showEvenementForm = false" class="px-3 py-1 bg-gray-100 text-gray-700 rounded">Non</button>
        </div>
        <div v-if="showEvenementForm" class="space-y-4">
          <div v-for="(evenement, index) in form.evenements" :key="index" class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Titre de l'événement</label>
                <input v-model="evenement.titre" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Type d'événement</label>
                <select v-model="evenement.type_evenement" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="general">Général</option>
                  <option value="culturel">Culturel</option>
                  <option value="musical">Musical</option>
                  <option value="gastronomique">Gastronomique</option>
                  <option value="sportif">Sportif</option>
                  <option value="commercial">Commercial</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Date de début</label>
                <input v-model="evenement.date_debut" type="datetime-local" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Date de fin</label>
                <input v-model="evenement.date_fin" type="datetime-local" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Prix (€)</label>
                <input v-model="evenement.prix_evenement" type="number" step="0.01" min="0" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Capacité maximale</label>
                <input v-model="evenement.capacite_max" type="number" min="1" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea v-model="evenement.description" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
            </div>
            <button type="button" @click="removeEvenement(index)" class="mt-3 text-red-600 hover:text-red-800 text-sm">
              Supprimer cet événement
            </button>
          </div>
          <button type="button" @click="addEvenement" class="px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            + Ajouter un événement
          </button>
        </div>
      </div>

      <!-- Section Contacts -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Contacts</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Ce lieu a-t-il un contact sur place ?</label>
          <button type="button" v-if="!showContactForm" @click="showContactForm = true" class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded mr-2">Oui</button>
          <button type="button" v-if="showContactForm" @click="showContactForm = false" class="px-3 py-1 bg-gray-100 text-gray-700 rounded">Non</button>
        </div>
        <div v-if="showContactForm" class="space-y-4">
          <div v-for="(contact, index) in form.contacts" :key="index" class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom du contact</label>
                <input v-model="contact.nom_contact" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fonction</label>
                <input v-model="contact.fonction" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Téléphone (format guinéen)</label>
                <input v-model="contact.telephone" type="tel" placeholder="+224 XXX XXX XXX" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input v-model="contact.email" type="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Type de contact</label>
                <select v-model="contact.type_contact" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="referent">Référent principal</option>
                  <option value="reservation">Réservation</option>
                  <option value="commercial">Commercial</option>
                  <option value="technique">Technique</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div class="flex items-center">
                <input
                  :id="`contact-principal-${index}`"
                  v-model="contact.est_principal"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label :for="`contact-principal-${index}`" class="ml-2 block text-sm text-gray-900">
                  Contact principal
                </label>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Notes</label>
                <textarea v-model="contact.notes" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
            </div>
            <button type="button" @click="removeContact(index)" class="mt-3 text-red-600 hover:text-red-800 text-sm">
              Supprimer ce contact
            </button>
          </div>
          <button type="button" @click="addContact" class="px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            + Ajouter un contact
          </button>
        </div>
      </div>

      <!-- Section Ressources -->
      <div class="border-b border-gray-200 pb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Ressources téléchargeables</h3>
        <div class="space-y-4">
          <div v-for="(ressource, index) in form.ressources" :key="index" class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nom de la ressource</label>
                <input v-model="ressource.nom" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fichier</label>
                <input type="file" @change="handleRessourceUpload($event, index)" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <textarea v-model="ressource.description" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
              </div>
            </div>
            <button type="button" @click="removeRessource(index)" class="mt-3 text-red-600 hover:text-red-800 text-sm">
              Supprimer cette ressource
            </button>
          </div>
          <button type="button" @click="addRessource" class="px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            + Ajouter une ressource
          </button>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex justify-end space-x-4 pt-6">
        <button 
          type="button" 
          @click="cancel" 
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Annuler
        </button>
        <button 
          type="submit" 
          :disabled="loading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enregistrement...
          </span>
          <span v-else>{{ editingLieu ? 'Modifier' : 'Ajouter' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '../supabase'

const props = defineProps({
  editingLieu: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const loading = ref(false)
const form = ref({
  nom: '',
  type: '',
  ville: '',
  description: '',
  prix: null,
  adresse: '',
  latitude: null,
  longitude: null,
  image_principale: '',
  images: [],
  accessible_mobilite_reduite: false,
  reseaux_sociaux: {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    website: ''
  },
  videos: [],
  evenements: [],
  contacts: [],
  ressources: []
})

const mainImagePreview = ref(null)
const galleryPreviews = ref([])
const mainImageFile = ref(null)
const galleryFiles = ref([])
const ressourceFiles = ref([])
const showContactForm = ref(false)
const showEvenementForm = ref(false)

// Définir resetForm avant le watcher
const resetForm = () => {
  form.value = {
    nom: '',
    type: '',
    ville: '',
    description: '',
    prix: null,
    adresse: '',
    latitude: null,
    longitude: null,
    image_principale: '',
    images: [],
    accessible_mobilite_reduite: false,
    reseaux_sociaux: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      website: ''
    },
    videos: [],
    evenements: [],
    contacts: [],
    ressources: []
  }
  mainImagePreview.value = null
  galleryPreviews.value = []
  mainImageFile.value = null
  galleryFiles.value = []
  ressourceFiles.value = []
}

// Réinitialiser le formulaire quand on change de lieu à éditer
watch(() => props.editingLieu, (newValue) => {
  if (newValue) {
    form.value = { 
      ...newValue,
      accessible_mobilite_reduite: newValue.accessible_mobilite_reduite || false,
      reseaux_sociaux: newValue.reseaux_sociaux || {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        youtube: '',
        website: ''
      },
      videos: newValue.videos || [],
      evenements: newValue.evenements || [],
      contacts: newValue.contacts || [],
      ressources: newValue.ressources || []
    }
    mainImagePreview.value = newValue.image_principale
    galleryPreviews.value = newValue.images || []
    showContactForm.value = (newValue.contacts && newValue.contacts.length > 0)
    showEvenementForm.value = (newValue.evenements && newValue.evenements.length > 0)
  } else {
    resetForm()
    showContactForm.value = false
    showEvenementForm.value = false
  }
}, { immediate: true })

// Fonctions pour les images
const handleMainImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    mainImageFile.value = file
    mainImagePreview.value = URL.createObjectURL(file)
  }
}

const handleGalleryUpload = (event) => {
  const files = Array.from(event.target.files)
  galleryFiles.value.push(...files)
  files.forEach(file => {
    galleryPreviews.value.push(URL.createObjectURL(file))
  })
}

const removeGalleryImage = (index) => {
  galleryPreviews.value.splice(index, 1)
  galleryFiles.value.splice(index, 1)
}

// Fonctions pour les vidéos
const addVideo = () => {
  form.value.videos.push({
    titre: '',
    description: '',
    url_video: '',
    type_video: 'presentation',
    est_principale: false
  })
}

const removeVideo = (index) => {
  form.value.videos.splice(index, 1)
}

// Fonctions pour les événements
const addEvenement = () => {
  form.value.evenements.push({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    type_evenement: 'general',
    prix_evenement: null,
    capacite_max: null
  })
}

const removeEvenement = (index) => {
  form.value.evenements.splice(index, 1)
}

// Fonctions pour les contacts
const addContact = () => {
  form.value.contacts.push({
    nom_contact: '',
    fonction: '',
    telephone: '',
    email: '',
    type_contact: 'referent',
    est_principal: false,
    notes: ''
  })
}

const removeContact = (index) => {
  form.value.contacts.splice(index, 1)
}

// Fonctions pour les ressources
const addRessource = () => {
  form.value.ressources.push({
    nom: '',
    description: '',
    url: '',
    taille: ''
  })
}

const removeRessource = (index) => {
  form.value.ressources.splice(index, 1)
  ressourceFiles.value.splice(index, 1)
}

const handleRessourceUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    ressourceFiles.value[index] = file
    form.value.ressources[index].taille = formatFileSize(file.size)
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Upload des fichiers
const uploadImages = async () => {
  const uploadedUrls = []

  // Upload image principale
  if (mainImageFile.value) {
    const fileExt = mainImageFile.value.name.split('.').pop()
    const fileName = `lieux/${Date.now()}_main.${fileExt}`
    const { data, error } = await supabase.storage.from('images').upload(fileName, mainImageFile.value)
    if (!error) {
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
      form.value.image_principale = publicUrlData.publicUrl
    }
  }

  // Upload images de la galerie
  for (const file of galleryFiles.value) {
    const fileExt = file.name.split('.').pop()
    const fileName = `lieux/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`
    const { data, error } = await supabase.storage.from('images').upload(fileName, file)
    if (!error) {
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
      uploadedUrls.push(publicUrlData.publicUrl)
    }
  }

  form.value.images = uploadedUrls
}

const uploadRessources = async () => {
  for (let i = 0; i < ressourceFiles.value.length; i++) {
    const file = ressourceFiles.value[i]
    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `ressources/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      const { data, error } = await supabase.storage.from('images').upload(fileName, file)
      if (!error) {
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName)
        form.value.ressources[i].url = publicUrlData.publicUrl
      }
    }
  }
}

const submitForm = async () => {
  loading.value = true
  try {
    await uploadImages()
    await uploadRessources()
    emit('submit', form.value)
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
  } finally {
    loading.value = false
  }
}

const cancel = () => {
  resetForm()
  emit('cancel')
}
</script> 