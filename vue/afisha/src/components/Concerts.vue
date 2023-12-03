<template>
  <div class="mx-auto" style="max-width: 1000px; background-color: #ffffff;">
    <div class="relative z-10">
      <CitySelector variant="Выставки" />
    </div>

    <div style="padding-left: 10px; padding-top: 7px; font-weight: bold; font-size: 27px;">
      Выставки: {{ selectedCity }}
    </div>
      
    <div class="grid md:grid-cols-2 gap-4 mt-4 gr1 relative z-1">
    <div v-for="item in items" :key="item.id" class="relative mb-4">
        <img :src="item.image" alt="Image" class="rounded-xl max-w-300 max-h-320" />
        <p class="absolute bottom-7  text-lg bg-text">{{ item.caption }}</p>

        <!-- Modified button -->
        <button @click="navigateToImage(item.id)" class="absolute bottom-2 left-3 px-2 py-1 btr text-white rounded-3xl flex items-center">
            <img src="/src/assets/ticket.svg" alt="213"  class="mr-2 "> от {{item.price}}
        </button>
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
      { id: "Иммерсивное Арт-шоу", image: '/src/assets/vystavki/immersive.jpg', caption: 'Иммерсивное Арт-шоу', text:'text example', price: 1500, hour:'17:30' },
        { id: "Deep Inside", image: '/src/assets/vystavki/deep_inside.jpg', caption: 'Deep Inside/GHT', text:'text example', price: 1700, hour:'19:00' },
        { id: "Айвазовский Кандинский Живые полотна", image: '/src/assets/vystavki/aivazovski.jpg', caption: 'Айвазовский Кандинский Живые полотна', text:'text example', price: 1200, hour:'20:30' },
        { id: "Свет", image: '/src/assets/vystavki/svet.jpg', caption: 'Свет', text:'text example', price: 2000, hour:'22:00' },
        { id: "Выставка-реконструкция «Терракотовая армия Бессмертные воины Китая»", image: '/src/assets/vystavki/terrak_army.png', caption: 'Выставка-реконструкция «Терракотовая армия Бессмертные воины Китая»', text:'text example', price: 1750, hour:'23:00' },
        { id: "VR Gallery", image: '/src/assets/vystavki/vr_gallery.jpg', caption: 'VR Gallery', text:'text example', price: 1500, hour:'00:00' },
        { id: "Сальвадор Дали & Пабло Пикассо", image: '/src/assets/vystavki/salvador_dali.jpg', caption: 'Сальвадор Дали & Пабло Пикассо', text:'text example', price: 1200, hour:'1:00' },
        { id: "Николай Рерих", image: '/src/assets/vystavki/nicola_rerich.jpg', caption: 'Николай Рерих', text:'text example', price: 1900, hour:'15:00' },
        { id: "Икигай: искусство жить", image: '/src/assets/vystavki/ikigai.jpg', caption: 'Икигай: искусство жить', text:'text example', price: 1900, hour:'16:00' },
        { id: "Реальный космос", image: '/src/assets/vystavki/real_cosmos.jpeg', caption: 'Реальный космос', text:'text example', price: 1200, hour:'14:00' },
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
.bg-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
  
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

</style>
