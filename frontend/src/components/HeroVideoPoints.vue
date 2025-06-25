<template>
  <section class="w-full py-12 px-2 md:px-8 flex flex-col lg:flex-row items-center justify-center gap-8">
    <!-- Vidéo à gauche -->
    <div class="w-full lg:w-1/2 flex justify-center">
      <div class="rounded-3xl overflow-hidden shadow-lg w-full max-w-xl aspect-video bg-black">
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/ScMzIvxBSi4"
          title="Vidéo de présentation"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <!-- Points clés à droite -->
    <div class="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="(point, i) in points" :key="i" class="flex flex-col items-center text-center">
        <div class="bg-indigo-900 text-white rounded-xl p-4 mb-4 flex items-center justify-center shadow-lg">
          <span v-html="point.icon" class="w-8 h-8"></span>
        </div>
        <h3 class="text-xl font-bold text-indigo-900 mb-2">{{ point.title }}</h3>
        <p class="text-gray-600">{{ point.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const points = [
  {
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'/></svg>`,
    title: "Communauté active",
    desc: "Des voyageurs et contributeurs partagent leurs expériences et conseils sur toute la Guinée."
  },
  {
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z'/></svg>`,
    title: "Guides & contacts locaux",
    desc: "Trouvez facilement des contacts, guides et référents pour chaque lieu touristique."
  },
  {
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 12c2.28 0 4.14-1.86 4.14-4.14S14.28 3.72 12 3.72 7.86 5.58 7.86 7.86 9.72 12 12 12zm0 0c-2.28 0-4.14 1.86-4.14 4.14S9.72 20.28 12 20.28s4.14-1.86 4.14-4.14S14.28 12 12 12z'/></svg>`,
    title: "Découverte authentique",
    desc: "Explorez des lieux uniques, des événements, des ressources et des vidéos immersives."
  },
  {
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.6c.969 0 1.371 1.24.588 1.81l-5.347 3.89a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.347-3.89a1 1 0 00-1.176 0l-5.347 3.89c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.347-3.89c-.783-.57-.38-1.81.588-1.81h6.6a1 1 0 00.95-.69l2.036-6.29z'/></svg>`,
    title: "Avis & accessibilité",
    desc: "Consultez les notes, avis, accessibilité PMR et infos pratiques pour chaque site."
  }
]
</script>

<style scoped>
section {
  background: white;
  border-radius: 2rem;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.07);
}
</style> 