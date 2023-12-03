<template>
    <div class="flex flex-col items-center   overflow-x-hidden rounded-3xl shadow-xl " style="background-color: #f2f2f2 ;">
      <div class="relative w-800  border-0  h-96 overflow-hidden" ref="container" style="">
        
        <!-- Buttons positioned to the left and vertically centered -->
        <div class="absolute top-1/3 right-0 pr-1 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
          <button @click="zoom(0.1)" class="w-10 h-10 bg-white text-gray rounded-full text-4xl">+</button>
          <button @click="zoom(-0.1)" class="w-10 h-10 bg-white text-gray rounded-full text-4xl">-</button>
        </div>
        
        <div 
          :style="{ transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})` }" 
          @mousedown="dragStart" 
          @mousemove="drag" 
          @mouseup="dragEnd" 
          @mouseleave="dragEnd"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
          @wheel="handleScroll"
        > 
          <Stseats />
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
    <div class="flex flex-row justify-start items-center space-x-2 pt-2"> 
    <div
      @click="togglePriceGroup('#4D74FF')"
      class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
      :class="{ 'border-blue': selectedPriceGroup === '#4D74FF' }"
    >
      <span class="w-4 h-4 rounded-full" style="background-color: #4D74FF;"></span>
      <span class="ml-3 text-gray-700 text-lg">890₽</span>
    </div>
            
    <div
      @click="togglePriceGroup('#EF8FD8')"
      class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
      :class="{ 'border-blue': selectedPriceGroup === '#EF8FD8' }"
    >
      <span class="w-4 h-4 rounded-full" style="background-color: #EF8FD8;"></span>
      <span class="ml-3 text-gray-700 text-lg">2290₽</span>
    </div>   

    <div
      @click="togglePriceGroup('#F2CC43')"
      class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
      :class="{ 'border-blue': selectedPriceGroup === '#F2CC43' }"
    >
      <span class="w-4 h-4 rounded-full" style="background-color: #F2CC43;"></span>
      <span class="ml-3 text-gray-700 text-lg">5900₽</span>
    </div>
  </div>

    
  </template>
  
  

<script>
import Stseats from "@/components/Stseats.vue";

export default {
  components: {
    Stseats,
  },
  data() {
    return {
      targetScale: 0.7, 
      scale: 0.7, 
      position: { x: 0, y: 0 },
      dragging: false,
      start: { x: 0, y: 0 },
      startDistance: null,
      selectedPriceGroup: this.$route.query.priceGroup || null,
    };
  },
  mounted() {
    this.centerSVG();
    if (this.$route.query.totalprice !== undefined) {
      this.removeTotalPriceFromQuery();
    };
  },
  computed: {
    hasTotalPriceParam(){
      if(this.$route.query.totalprice !== undefined){
      return true; 
      }
    },
    totalPrice() {
    // Parse the float value from the query parameter or default to 0
    const totalPriceCheck = parseFloat(this.$route.query.totalprice);
    return !isNaN(totalPriceCheck) ? totalPriceCheck : 0;
  },
  },
  methods: {
    removeTotalPriceFromQuery() {
      const query = { ...this.$route.query };
      delete query.totalprice; // Remove the totalPrice query parameter
      this.$router.replace({ query });
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
        priceGroup: this.selectedPriceGroup || undefined
      };
      this.$router.replace({ query });
    },
    generateURL() {
    const totalPriceParam = this.$route.query.totalprice;
    const dateFromQuery = this.$route.query.date;
    const hourFromQuery = this.$route.query.hour;
    const tableFromQuery = this.$route.query.table;
    this.$router.push({
        path: `${this.$route.path}/payment`,
        query: {
            totalprice: totalPriceParam,
            date: dateFromQuery,
            hour: hourFromQuery,
            table: tableFromQuery,
        }
    });
    },
    centerSVG() {
      const containerWidth = this.$refs.container.offsetWidth;
      const containerHeight = this.$refs.container.offsetHeight;

      const svgWidth = 866;
      const svgHeight = 207;

  
    },
    zoom(amount) {
      const newScale = this.targetScale + amount;
      if (newScale < 0.5) {
        this.targetScale = 0.5; // Minimum scale limit
      } else if (newScale > 5.0) {
        this.targetScale = 5.0; // Maximum scale limit
      } else {
        this.targetScale = newScale;
      }
      this.smoothZoom();
    },
    smoothZoom() {
      if (Math.abs(this.scale - this.targetScale) > 0.01) {
        this.scale += (this.targetScale - this.scale) * 0.1;
        requestAnimationFrame(this.smoothZoom);
      } else {
        this.scale = this.targetScale;
      }
    },
    dragStart(event) {
      this.dragging = true;
      this.start = {
        x: event.clientX - this.position.x,
        y: event.clientY - this.position.y,
      };
    },
    drag(event) {
      if (this.dragging) {
        this.position.x = event.clientX - this.start.x;
        this.position.y = event.clientY - this.start.y;
      }
    },
    dragEnd() {
      this.dragging = false;
    },
    touchStart(event) {
    if (event.touches.length === 2) {
      const xDiff = event.touches[0].clientX - event.touches[1].clientX;
      const yDiff = event.touches[0].clientY - event.touches[1].clientY;
      this.startDistance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      event.preventDefault();  // Only prevent default when starting a pinch-zoom.
    } else {
      this.dragging = true;
      this.start = {
        x: event.touches[0].clientX - this.position.x,
        y: event.touches[0].clientY - this.position.y,
      };
    }
  },
  touchMove(event) {
    if (event.touches.length === 2 && this.startDistance) {
      const xDiff = event.touches[0].clientX - event.touches[1].clientX;
      const yDiff = event.touches[0].clientY - event.touches[1].clientY;
      const newDistance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      const scaleChange = newDistance / this.startDistance;
      this.scale = this.targetScale * scaleChange;
      event.preventDefault();  // Only prevent default when pinch-zooming.
    } else if (this.dragging) {
      this.position.x = event.touches[0].clientX - this.start.x;
      this.position.y = event.touches[0].clientY - this.start.y;
      event.preventDefault();  // Only prevent default when dragging.
    }
  },
  touchEnd() {
    if (this.startDistance) {
      this.targetScale = this.scale;
      this.startDistance = null;
    }
    this.dragging = false;
  },
  handleScroll(event) {
    // You can access the scroll delta with event.deltaY
    // For example, you might want to zoom in or out
    this.zoom(event.deltaY * -0.0005); // Adjust the multiplier as needed

    // Prevent the default scroll behavior to stop the page from scrolling
    event.preventDefault();
  },
    },
};
</script>

<style>
.border-blue {
  border: 1px solid blue; /* Adjust the border size and color as needed */
}
.w-800 {
  width: 800px;
  max-width: 100%;
}
.h-400 {
  height: 400px;
}
</style>
