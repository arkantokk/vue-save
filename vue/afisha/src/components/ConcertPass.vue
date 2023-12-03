<template>
    <div class="flex flex-col items-center   overflow-x-hidden rounded-3xl shadow-xl " style="background-color: #f2f2f2 ;">
      <div class="relative w-800 border-0 h-96 overflow-hidden" ref="container" style=" ">
        

  <div class="mx-3 mt-12 w-full border rounded-xl flex justify-between">

  <div class="flex flex-col p-4">
    <div class="qrey">Обычный</div>
    <div class="price">{{this.price}} ₽</div>
  </div>


  <div class="rounded-3xl  my-auto flex items-center p-4 mr-6 border h-1/6 border-black space-x-10 text-3xl">
    <button @click="decrementTickets" class="w-7 h-7" :style="tickets === 0 ? 'cursor: not-allowed;' : ''" ><svg width="1.125rem" height="0.125rem" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="_3G--w"><path clip-rule="evenodd" fill-rule="evenodd" d="M17.8 1c0 .4-.4.8-.8.8H1A.8.8 0 0 1 1 .1h16c.4 0 .8.4.8.8Z" :class="tickets > 0 ? 'btn-active' : 'btn-disabled'"></path></svg></button>
    <div class="mx-2">{{tickets}}</div>
    <button @click="incrementTickets" class="w-7 h-7"><svg width="1rem" height="1rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="_2Uh6a"><path clip-rule="evenodd" fill-rule="evenodd" d="M9 1a1 1 0 0 0-2 0v6H1a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0V9h6a1 1 0 0 0 0-2H9V1Z" class="_27NBa"></path></svg></button>
  </div>
</div>


        <div v-if="totalPrice > 0" class="mt-4 absolute bottom-0 left-0 mb-4 ml-4">
          <div style="text-gray-700 text-lg">Полная цена: {{ totalPrice }}₽</div>
  <button @click="generateURL" class="custom-btn px-4 py-2 rounded" style="height: 35px; width: 220px;">
    <img src="/src/assets/blueticket.svg" alt="213" class="btn-icon mr-2" style="width:30px; height: 30px;">
    <div style="font-size: 30px;"> Оплатить </div>
  </button>
  
</div>

      </div>
    </div>
   






  </template>
  
  

<script>


export default {
  components: {

  },
  data() {
  return {
    tickets: 0,
  };
},
  mounted() {
    this.tickets = 0;
    if (this.$route.query.totalprice !== undefined || this.$route.query.totalprice == 0) {
      this.removeTotalPriceFromQuery();
    };
    if (this.$route.query.tickets !== undefined) {
      this.removeTicketsFromQuery();
    };
    
  },
  computed: {
    hasTotalPriceParam(){
      if(this.$route.query.totalprice !== undefined){
      return true; 
      }
    },
    price() {
      const priceFromQuery = parseFloat(this.$route.query.price);
      return !isNaN(priceFromQuery) ? priceFromQuery : 0;
    },
    totalPrice() {

      return this.price * this.tickets;
    },
  },
  methods: {
    incrementTickets() {
      this.tickets++;
      this.updateQuery();
    },
    decrementTickets() {
      if (this.tickets > 0) {
        this.tickets--;
        this.updateQuery();
      }
    },
    removeTotalPriceFromQuery() {
      const query = { ...this.$route.query };
      delete query.totalprice; // Remove the totalPrice query parameter
      this.$router.replace({ query });
    },
    removeTicketsFromQuery() {
      const query = { ...this.$route.query };
      delete query.tickets; // Remove the totalPrice query parameter
      this.$router.replace({ query });
    },

    generateURL() {
    const ticketsParam = this.$route.query.tickets;
    const totalPriceParam = this.$route.query.totalprice;
    const dateFromQuery = this.$route.query.date;
    const hourFromQuery = this.$route.query.hour;
    this.$router.push({
        path: `${this.$route.path}/payment`,
        query: {
            tickets: ticketsParam,
            totalprice: totalPriceParam,
            date: dateFromQuery,
            hour: hourFromQuery,
        }
    });
    },


   
  togglePriceGroup(color) {
      if (this.selectedPriceGroup === color) {
        this.selectedPriceGroup = null;
      } else {
        this.selectedPriceGroup = color;
      }
      this.updateQuery();
    },
    updateQuery() {
      let query = {
        ...this.$route.query,
        tickets: this.tickets,
        totalprice: this.totalPrice,
      };
      this.$router.replace({ query });
    },
    },
};
</script>

<style scoped>
.btn-active {
  fill: black; 
}

.btn-disabled{
    fill: rgb(131, 131, 131);
}
._27NBa {
    fill: rgb(0, 0, 0);
}

.price{
    font-family: Suisse Intl,sans-serif;
    font-size: 1.625rem;
    font-weight: 500;
    letter-spacing: .01rem;
    line-height: 1.75rem;
    color: var(--color-text-black);
}

.qrey{
    font-family: Suisse Intl,sans-serif;
    font-size: .9375rem;
    font-weight: 400;
    letter-spacing: .005rem;
    line-height: 1.25rem;
    color: var(--color-text-black);

}
.border-blue {
  border: 1px solid blue; /* Adjust the border size and color as needed */
}


.custom-btn {
  background: transparent;
  border: 1px solid #4781ff;
  color: #4781ff;
  display: flex;
  align-items: center;

}

.btn-icon {
  fill: #4781ff; /* SVG color */
  vertical-align: middle; /* Aligns the SVG with the text */
}
.w-800 {
  width: 800px;
  max-width: 100%;
}
.h-400 {
  height: 400px;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
