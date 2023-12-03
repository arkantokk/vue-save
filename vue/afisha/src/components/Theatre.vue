<template>
    <div class="mx-auto" style="max-width: 1000px; background-color: #ffffff;">
      <div class="relative z-10">
        <CitySelector variant="Театр" />
      </div>
  
      <div style="padding-left: 10px; padding-top: 7px; font-weight: bold; font-size: 27px;">
        Театральные  представления: {{ selectedCity }}
      </div>
        
      <div class="grid md:grid-cols-2 gap-4 mt-4 gr1 relative z-1">
    <div v-for="item in items" :key="item.id" class="mb-4">
        <!-- Container for image and button -->
        <div class="relative">
            <img :src="item.image" alt="Image" class="rounded-xl max-w-300 max-h-320" />
            
            <!-- Button on the image -->
            <button @click="navigateToImage(item.text)" class="absolute bottom-2 left-3 px-2 py-1 btr text-white rounded-3xl flex items-center">
                <img src="/src/assets/ticket.svg" alt="213" class="mr-2">Забронировать от {{item.price}}
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
        { id: 1, image: '/src/assets/theater/gastrolvolanda.jpg', text: 'Гастроль Воланда', price: 1500 },
        { id: 2, image: '/src/assets/theater/idealmuzh.jpg', text: 'Идеальный муж', price: 1700 },
        { id: 3, image: '/src/assets/theater/ishchumuzha.jpg', text: 'Ищу мужа', price: 1200 },
        { id: 4, image: '/src/assets/theater/lubonigolubi.jpg', text: 'Любовь и голуби', price: 2000 },
        { id: 5, image: '/src/assets/theater/mayakov.jpg', text: 'Маяковский', price: 1750 },
        { id: 6, image: '/src/assets/theater/mezhdumirov.jpg', text: 'Между двух миров', price: 1500 },
        { id: 7, image: '/src/assets/theater/nomer13.png', text: 'Номер 13', price: 1200 },
        { id: 8, image: '/src/assets/theater/portretdoriana.jpg', text: 'Портрет Дориана Грея', price: 1900 },
        { id: 9, image: '/src/assets/theater/varsavmelody.jpg', text: 'Варшавская мелодия', price: 1900 },
        { id: 10,image: '/src/assets/theater/nichego_ne_boisya.jpg',  text:'Ничего не бойся, я с тобой', price: 1200 },

  // Add more items with price as needed
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
  