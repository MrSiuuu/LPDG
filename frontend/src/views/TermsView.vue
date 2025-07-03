<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Conditions d'Utilisation</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Dernière mise à jour : {{ new Date().toLocaleDateString('fr-FR') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contenu -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div class="prose prose-lg max-w-none">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">1. Acceptation des Conditions</h2>
          <p class="text-gray-600 mb-6">
            En accédant et en utilisant la plateforme LPDG (Lieux Touristiques de Guinée), 
            vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas 
            ces conditions, veuillez ne pas utiliser notre service.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">2. Description du Service</h2>
          <p class="text-gray-600 mb-6">
            LPDG est une plateforme collaborative dédiée à la promotion et à la découverte 
            des lieux touristiques de la Guinée. Notre service permet aux utilisateurs de :
          </p>
          <ul class="list-disc pl-6 text-gray-600 mb-6">
            <li>Découvrir des lieux touristiques en Guinée</li>
            <li>Ajouter et partager des informations sur des lieux</li>
            <li>Publier des articles et témoignages</li>
            <li>Partager des avis et commentaires</li>
            <li>Interagir avec la communauté</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">3. Inscription et Compte Utilisateur</h2>
          <p class="text-gray-600 mb-4">
            Pour utiliser certaines fonctionnalités, vous devez créer un compte. Vous vous engagez à :
          </p>
          <ul class="list-disc pl-6 text-gray-600 mb-6">
            <li>Fournir des informations exactes et à jour</li>
            <li>Protéger la confidentialité de vos identifiants</li>
            <li>Être responsable de toutes les activités sous votre compte</li>
            <li>Notifier immédiatement toute utilisation non autorisée</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">4. Règles de Conduite</h2>
          <p class="text-gray-600 mb-4">
            En utilisant LPDG, vous vous engagez à ne pas :
          </p>
          <ul class="list-disc pl-6 text-gray-600 mb-6">
            <li>Publier du contenu illégal, diffamatoire ou offensant</li>
            <li>Violer les droits de propriété intellectuelle</li>
            <li>Spammer ou harceler d'autres utilisateurs</li>
            <li>Utiliser le service à des fins commerciales non autorisées</li>
            <li>Tenter de compromettre la sécurité de la plateforme</li>
            <li>Publier des informations fausses sur les lieux touristiques</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">5. Contenu Utilisateur</h2>
          <p class="text-gray-600 mb-4">
            En publiant du contenu sur LPDG, vous :
          </p>
          <ul class="list-disc pl-6 text-gray-600 mb-6">
            <li>Conservez vos droits sur votre contenu</li>
            <li>Accordez à LPDG une licence non exclusive pour utiliser votre contenu</li>
            <li>Vous assurez que vous avez les droits nécessaires pour partager ce contenu</li>
            <li>Acceptez que votre contenu puisse être modéré par notre équipe</li>
          </ul>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">6. Propriété Intellectuelle</h2>
          <p class="text-gray-600 mb-6">
            LPDG et son contenu original sont protégés par les droits d'auteur, marques déposées 
            et autres lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, 
            distribuer ou créer des œuvres dérivées sans autorisation.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">7. Limitation de Responsabilité</h2>
          <p class="text-gray-600 mb-6">
            LPDG fournit le service "en l'état" sans garanties. Nous ne sommes pas responsables 
            des dommages indirects, accessoires ou consécutifs résultant de l'utilisation du service.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">8. Modifications du Service</h2>
          <p class="text-gray-600 mb-6">
            Nous nous réservons le droit de modifier ou d'interrompre le service à tout moment. 
            Les modifications importantes seront notifiées aux utilisateurs.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">9. Résiliation</h2>
          <p class="text-gray-600 mb-6">
            Nous pouvons suspendre ou résilier votre compte en cas de violation de ces conditions. 
            Vous pouvez également supprimer votre compte à tout moment.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">10. Droit Applicable</h2>
          <p class="text-gray-600 mb-6">
            Ces conditions sont régies par les lois de la République de Guinée. 
            Tout litige sera résolu par les tribunaux compétents de Conakry.
          </p>

          <h2 class="text-2xl font-bold text-gray-900 mb-6">11. Contact</h2>
          <p class="text-gray-600 mb-6">
            Pour toute question concernant ces conditions, contactez-nous à : 
            <a href="mailto:issakouyate1012@gmail.com" class="text-indigo-600 hover:text-indigo-800">
              issakouyate1012@gmail.com
            </a>
          </p>

          <div class="bg-gray-50 rounded-lg p-6 mt-8">
            <p class="text-sm text-gray-600">
              <strong>Note :</strong> Ces conditions d'utilisation peuvent être mises à jour 
              périodiquement. Il est de votre responsabilité de les consulter régulièrement.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pas de logique particulière nécessaire
</script> 