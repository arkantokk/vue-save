<template>
  <div class="mx-auto" style="max-width: 1000px; background-color: #ffffff;">
    <div class="relative z-10">
      <CitySelector variant="Стендап" />
    </div>

    <div style="padding-left: 10px; padding-top: 7px; font-weight: bold; font-size: 27px;">
      Стендапы: {{ selectedCity }}
    </div>

<div class="grid md:grid-cols-2 gap-4 mt-4 gr1 relative z-1">
    <div v-for="item in items" :key="item.id" class="mb-4">
        <!-- Container for image and button -->
        <div class="relative">
            <img :src="item.image" alt="Image" class="rounded-xl max-w-300 max-h-320" />
            
            <!-- Button on the image -->
            <button @click="navigateToImage(item.id)" class="absolute bottom-2 left-1 px-2 py-1 btr text-white rounded-3xl flex items-center">
              <img src="/src/assets/srvice.png" alt="213" class="mr-2"> Забронировать
            </button>
        </div>

        <!-- Text below the image and aligned to the left -->
        <p class="text-lg bg-text1 mt-2 text-left w-full">{{ item.text }}</p>
    </div>
</div>



  </div>
</template>

<script>
import CitySelector from '@/components/CitySelector.vue'

export default {
  name: 'App',
  components: {
    CitySelector,
  },
  computed: {
    selectedCity() {
      return this.$route.params.city
    },
  },
  data() {
    return {
      items: [
      { id: "StandUp & Action (Cтендап + Джаз концерт)", image: '/src/assets/standup/standupandaction.jpg', text:"StandUp & Action (Cтендап + Джаз концерт)" },
      { id: "Ольга Малащенко Stand Up", image: '/src/assets/standup/olgamalashchenko.jpg', text:"Ольга Малащенко. Stand Up" },
      { id: "Павел Воля Большой Stand Up", image: '/src/assets/standup/pavelvolya.png', text:"Павел Воля. Большой Stand Up" },
      { id: "Мария Маркова Stand Up", image: '/src/assets/standup/mariamarkova.jpg', text:"Мария Маркова. Stand Up" },
      { id: "Stand-Up + Jazz (два концерта в один вечер)", image: '/src/assets/standup/standupandjuzz.jpg', text:"Stand-Up + Jazz (два концерта в один вечер)" },
      { id: "Иван Абрамов", image: '/src/assets/standup/ivanabramov.jpg', text:"Иван Абрамов" },
        // Add more items as needed
      ],
    }
  },
  methods: {
    navigateToImage(imageId) {
      // Append the image index to the current URL
      this.$router.push(`${this.$route.path}/${imageId}`);
    }
  }
}
</script>

<style scoped>
.btr{
  background-color: rgba(0, 0, 0, 0.705);
}
.bg-text1 {
    color: rgb(0, 0, 0);
    font-size: 24px;
    font-weight: 12px;
    
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
</style>
