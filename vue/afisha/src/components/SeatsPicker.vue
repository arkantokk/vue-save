<template>
    <div class="flex flex-col items-center   overflow-x-hidden rounded-3xl shadow-xl " style="background-color: #f2f2f2 ;">
      <div class="relative w-800 border-0 h-96 overflow-hidden" ref="container" style=" ">
        <div v-if="hasTotalPriceParam" class="absolute bottom-0 left-0 mb-4 ml-4">
           <button @click="generateURL" class="custom-btn px-4 py-2 rounded" style="height: 35px; width: 220px;">
             <img src="/src/assets/blueticket.svg" alt="213" class="btn-icon mr-2" style="width:30px; height: 30px;">
           <div style="font-size: 30px;">Оплатить</div>
         </button>
        </div>
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
          <Seats />
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
   
    <div class="flex justify-between pt-2">
    <!-- Button with right arrow SVG -->
    <button @click="scrollRight" class="order-2" >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.883 12L14.356 18.235L15 19L24 11.479L15 4L14.355 4.764L21.884 11H0V12H21.883Z" fill="black"/>
      </svg>
    </button>
    
    <!-- Button with left arrow SVG -->
    <button @click="scrollLeft" class="order-1">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_27_30)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.117 11.9998L9.644 5.76475L9 4.99975L0 12.5208L9 19.9998L9.645 19.2358L2.11599 12.9998H24V11.9998H2.117Z" fill="black"/>
        </g>
        <defs>
          <clipPath id="clip0_27_30">
            <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24 23.9998)"/>
          </clipPath>
        </defs>
      </svg>
    </button>
  </div>
  <div class="flex overflow-x-auto no-scrollbar space-x-2 pl-2 py-3" ref="scrollContainer">
<!-- Price Group 1: 750₽ -->
<div
  @click="togglePriceGroup('#A753A8')"
  class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
  :class="{ 'border-blue': selectedPriceGroup === '#A753A8' }"
>
  <span class="w-4 h-4 rounded-full" style="background-color: #A753A8;"></span>
  <span class="ml-3 text-gray-700 text-lg">750₽</span>
</div>

<!-- Price Group 2: 1000₽ -->
<div
  @click="togglePriceGroup('#6DD7DF')"
  class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
  :class="{ 'border-blue': selectedPriceGroup === '#6DD7DF' }"
>
  <span class="w-4 h-4 rounded-full" style="background-color: #6DD7DF;"></span>
  <span class="ml-3 text-gray-700 text-lg">1000₽</span>
</div>

<!-- Price Group 3: 1200₽ -->
<div
  @click="togglePriceGroup('#84C28E')"
  class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
  :class="{ 'border-blue': selectedPriceGroup === '#84C28E' }"
>
  <span class="w-4 h-4 rounded-full" style="background-color: #84C28E;"></span>
  <span class="ml-3 text-gray-700 text-lg">1200₽</span>
</div>

<!-- Price Group 4: 1500₽ -->
<div
  @click="togglePriceGroup('#FF9500')"
  class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
  :class="{ 'border-blue': selectedPriceGroup === '#FF9500' }"
>
  <span class="w-4 h-4 rounded-full" style="background-color: #FF9500;"></span>
  <span class="ml-3 text-gray-700 text-lg">1500₽</span>
</div>

<!-- Price Group 5: 2500₽ -->
<div
  @click="togglePriceGroup('#D9207A')"
  class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
  :class="{ 'border-blue': selectedPriceGroup === '#D9207A' }"
>
  <span class="w-4 h-4 rounded-full" style="background-color: #D9207A;"></span>
  <span class="ml-3 text-gray-700 text-lg">2500₽</span>
</div>

<!-- Price Group 6: 3200₽ -->
<div
  @click="togglePriceGroup('#8C12CA')"
  class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
  :class="{ 'border-blue': selectedPriceGroup === '#8C12CA' }"
>
  <span class="w-4 h-4 rounded-full" style="background-color: #8C12CA;"></span>
  <span class="ml-3 text-gray-700 text-lg">3200₽</span>
</div>

<!-- Price Group 7: 5000₽ -->
<div
  @click="togglePriceGroup('#14B5FF')"
  class="flex items-center justify-center px-4 py-2 rounded-3xl bg-white shadow-md min-w-max cursor-pointer"
  :class="{ 'border-blue': selectedPriceGroup === '#14B5FF' }"
>
  <span class="w-4 h-4 rounded-full" style="background-color: #14B5FF;"></span>
  <span class="ml-3 text-gray-700 text-lg">5000₽</span>
</div>
</div>





  </template>
  
  

<script>
import Seats from "@/components/Seats.vue";

export default {
  components: {
    Seats,
  },
  data() {
  return {
    targetScale: 0.3, // Initialize targetScale to 0.3 instead of 0
    scale: 0.3,
    position: { x: 0, y: -260 },
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
    scrollRight() {
      const container = this.$refs.scrollContainer;
      container.scrollBy({ left: 300, behavior: 'smooth' });
    },
    scrollLeft() {
      const container = this.$refs.scrollContainer;
      container.scrollBy({ left: -300, behavior: 'smooth' });
    },
    generateURL() {
    const selectedSeatsParam = this.$route.query.seats;
    const selectedRowsParam = this.$route.query.rows;
    const totalPriceParam = this.$route.query.totalprice;
    const dateFromQuery = this.$route.query.date;
    const hourFromQuery = this.$route.query.hour;
    this.$router.push({
        path: `${this.$route.path}/payment`,
        query: {
            seats: selectedSeatsParam,
            rows: selectedRowsParam,
            totalprice: totalPriceParam,
            date: dateFromQuery,
            hour: hourFromQuery,
        }
    });
    },
    centerSVG() {
      const containerWidth = this.$refs.container.offsetWidth;
      const containerHeight = this.$refs.container.offsetHeight;

      const svgWidth = 1874;
      const svgHeight = 842;

  
    },
    zoom(amount) {
      const newScale = this.targetScale + amount;
      if (newScale < 0.3) {
        this.targetScale = 0.3;
      } else if (newScale > 1.5) {
        this.targetScale = 1.5;
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
    },
};
</script>

<style>
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
