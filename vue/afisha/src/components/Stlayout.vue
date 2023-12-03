<template>
  <div class="mx-auto bg-white max-w-[1000px]">
    <div class="relative z-1">
      <CitySelector variant="Стендап" />
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

    
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded-lg modal-content relative">
        <button @click="closeModal" class="absolute top-2 right-2 p-1">
            <!-- SVG X icon -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 18L18 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <h2 class="text-2xl mb-4">Выберите место в standup-баре</h2>
        <h2 class="text-xl mb-4">Просто перемещайте мышкой либо пальцем </h2>
        <StseatPicker />
        <div class="absolute bottom-0 left-0 mb-4 ml-4 flex flex-wrap items-center space-x-1 pb-2 space-y-1">
   
          

</div>

    </div>
    
</div>

  </div>
</template>

<script>
import CitySelector from '@/components/CitySelector.vue'
import { addressesDatabase } from '@/database/addresses.js';
import { descriptions } from '@/database/descriptions.js';
import StseatPicker from '@/components/StseatPicker.vue';
export default {
  components: {
    CitySelector,
    StseatPicker
  },
  name: 'ImageViewer',
  data() {
    return {
      currentDate: new Date(),
      showModal: false,
      nextDates: [],
      dateFromQuery: null,
      
    };
  },
  computed: {
    selectedItem() {
      const imageId = this.$route.params.id;
      return this.items.find(item => item.id == imageId);
    },
    items() {
      return [
        { id: "StandUp & Action (Cтендап + Джаз концерт)", image: '/src/assets/standup/standupandaction.jpg', hour:'17:30' },
        { id: "Ольга Малащенко Stand Up", image: '/src/assets/standup/olgamalashchenko.jpg', hour:'18:30' },
        { id: "Павел Воля Большой Stand Up", image: '/src/assets/standup/pavelvolya.png', hour:'20:00' },
        { id: "Мария Маркова Stand Up", image: '/src/assets/standup/mariamarkova.jpg', hour:'21:30' },
        { id: "Stand-Up + Jazz (два концерта в один вечер)", image: '/src/assets/standup/standupandjuzz.jpg', hour:'23:00' },
        { id: "Иван Абрамов", image: '/src/assets/standup/ivanabramov.jpg', hour:'00:30' },
      ];
    },
    addressesForCity() {
    const city = this.$route.params.city;
    let addresses = addressesDatabase[city]?.Standup || [];
    // Sort the addresses alphabetically
    addresses = addresses.sort();
    return addresses.slice(0, 3);
  },
    itemDescription() {
      return descriptions.standup[this.selectedItem.id] || "Description not available";
    },
    selectedPersons() {
        return this.seats;
    },
    totalPrice() {
   return this.getPriceForSeats(this.seats);
    },  
  },
  mounted() {
    this.generateNextThreeDates();
    window.scrollTo(0, 0);
  },
  methods: {
    generateNextThreeDates() {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2); // Start from 5 days after
      const options = { day: 'numeric', month: 'long' };
      for (let i = 0; i < 3; i++) {
        const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(currentDate);
        this.nextDates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    },
    transmitToPayment(date) {
    this.dateFromQuery = date;
    this.generateURL();
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

  },

}
</script>

<style scoped>
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
