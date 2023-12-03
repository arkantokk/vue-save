<!-- ImageViewer.vue -->
<template>
  <div class="mx-auto" style="max-width: 1000px; background-color: #ffffff;">
    <div class="relative z-1">
      <CitySelector variant="Театр" />
    </div>
    <img :src="selectedItem.image" alt="Image" class="rounded-xl max-w-300 max-h-320 mx-auto mt-5 px-1" />
    <p class="text-center mt-5 text-3xl">{{ selectedItem.caption }}</p>
    <div>
      <div class="orga">Описание организатора</div>
      <div class="spect " aria-label="О спектакле">О спектакле</div>
      <p class="mx-1 sm:mx-12 mt-5 text-xl" style="font-size: 17px; line-height: 28px; font-family: Graphik,Helvetica,Arial,sans-serif;">{{ itemDescription }}</p>
    </div>
    <hr class="border-t border-gray-300 shadow-md my-7"/>
    <div class="flex flex-col mt-5 space-y-4 ml-5">
      <div v-for="(address, index) in addressesForCity.slice(0, 3)" :key="index" class="flex items-center">
        <span class="flex-none w-1/2 sm:w-1/4 mr-11">{{ address }}</span>
        <button @click="openModal(nextDates[index])" class="custom-btn font-bold py-2 px-4 rounded">
          <img src="/src/assets/blueticket.svg" alt="213" class="btn-icon mr-2">
           {{ nextDates[index] }} в {{ selectedItem.hour }}
        </button>
      </div>
    </div>
    
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-lg modal-content relative">
        <button @click="closeModal" class="absolute top-2 right-2 p-1">
            <!-- SVG X icon -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 18L18 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <h2 class="text-2xl mb-4">Выберите место в театре</h2>
        <h2 class="text-xl mb-4">Просто перемещайте мышкой либо пальцем </h2>
        <SeatsPicker />
        

    </div>
    
</div>
  </div>
</template>

<script>
import { addressesDatabase } from '@/database/addresses.js';
import CitySelector from '@/components/CitySelector.vue'
import SeatsPicker from '@/components/SeatsPicker.vue';
import { descriptions } from '@/database/descriptions.js'; // Import the descriptions

export default {
  components: {
    CitySelector,
    SeatsPicker
  },
  name: 'ImageViewer',
  data() {
    return {
      showSeatsPicker: false,
      showModal: false,
      nextDates: [],
      randomTheatreAddresses: []
    };
  },
  computed: {
    selectedItem() {
      const imageId = this.$route.params.id;
      return this.items.find(item => item.id == imageId);
    },
    items() {
      return [
        { id: "Гастроль Воланда", image: '/src/assets/theater/gastrolvolanda.jpg', caption: 'Гастроль Воланда', text:'text example', price: 1500, hour:'17:30' },
        { id: "Идеальный муж", image: '/src/assets/theater/idealmuzh.jpg', caption: 'Идеальный муж', text:'text example', price: 1700, hour:'19:00' },
        { id: "Ищу мужа", image: '/src/assets/theater/ishchumuzha.jpg', caption: 'Ищу мужа', text:'text example', price: 1200, hour:'20:30' },
        { id: "Любовь и голуби", image: '/src/assets/theater/lubonigolubi.jpg', caption: 'Любовь и голуби', text:'text example', price: 2000, hour:'22:00' },
        { id: "Маяковский", image: '/src/assets/theater/mayakov.jpg', caption: 'Маяковский', text:'text example', price: 1750, hour:'23:00' },
        { id: "Между двух миров", image: '/src/assets/theater/mezhdumirov.jpg', caption: 'Между двух миров', text:'text example', price: 1500, hour:'00:00' },
        { id: "Номер 13", image: '/src/assets/theater/nomer13.png', caption: 'Номер 13', text:'text example', price: 1200, hour:'1:00' },
        { id: "Портрет Дориана Грея", image: '/src/assets/theater/portretdoriana.jpg', caption: 'Портрет Дориана Грея', text:'text example', price: 1900, hour:'15:00' },
        { id: "Варшавская мелодия", image: '/src/assets/theater/varsavmelody.jpg', caption: 'Варшавская мелодия', text:'text example', price: 1900, hour:'16:00' },
        { id: "Ничего не бойся, я с тобой", image: '/src/assets/theater/nichego_ne_boisya.jpg', caption: 'Ничего не бойся, я с тобой', text:'text example', price: 1200, hour:'14:00' },
      ];
    },
    addressesForCity() {
    const city = this.$route.params.city;
    const addresses = addressesDatabase[city]?.Theatre || [];
    // Return the first three addresses instead of random ones
    return addresses.slice(0, 3);
    },
    itemDescription() {
      return descriptions.theatre[this.selectedItem.id] || "Description not available";
    }
  },
  mounted() {
    this.generateNextThreeDates();
    this.randomTheatreAddresses = this.addressesForCity;
    window.scrollTo(0, 0);
  },
  methods: {
    bookNow() {
      this.$router.push(`${this.$route.path}/booking`);
    },
    toggleSeatsPicker() {
      this.showSeatsPicker = !this.showSeatsPicker;
    },
    openModal(date) {
    this.$router.replace({
    path: this.$route.path,
    query: {
      ...this.$route.query, 
      date: date,
      hour: this.selectedItem.hour,
    }
  });
  this.showModal = true;
},

    closeModal() {

        this.showModal = false;
    },
    generateNextThreeDates() {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 4);  // Start from 5 days after
  const options = { day: 'numeric', month: 'long' }; // Removed time-related options
  for (let i = 0; i < 3; i++) {
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(currentDate);
    this.nextDates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
},


  }
}
</script>



<style scoped>
.orga{
  -webkit-font-smoothing: antialiased;
  font-size: 13px;
  line-height: 18px;
  color: #000;
  margin-left: 13px;
}
.spect{
    font-size: 32px;
    letter-spacing: -.01em;
    line-height: 36px;
    margin-left: 5px;
    display: block;
}
.custom-btn {
    background: transparent;
    border: 1px solid #4781ff;
    color: #4781ff;
    align-items: center;
}

.btn-icon {
    fill: #4781ff; /* SVG color */
    vertical-align: middle;
}

.modal-content {
    width: 80vw;       /* 80% of the viewport width */
    max-width: 800px;  /* Maximum width for the modal */
    max-height: 90vh;  /* Almost full height for larger screens */
    overflow-y: hidden;  /* Hide any overflowed content in Y-axis */
}

/* Adjust styles for smaller screen sizes */
@media (max-width: 768px) {
    .modal-content {
        width: 100vw;     /* Full width for smaller screens */
        height: 100vh;    /* Full height for smaller screens */
        border-radius: 0; /* Remove rounded corners */
        overflow-y: auto; /* In case content overflows, add scrolling */
    }
}
</style>


