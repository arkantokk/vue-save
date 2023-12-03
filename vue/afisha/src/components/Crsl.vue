<template>
    <div class="flex justify-center items-center z-0 relative">
      <div class="relative" style="max-width: 700px; max-height: 280px;">
        <div class="overflow-hidden rounded-3xl">
          <div
            class="w-full flex transition-transform ease-custom duration-300 transform rounded-full"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(image, index) in images"
              :key="index"
              class="relative w-full h-full flex-shrink-0"
              
            >
              <img :src="image.url" :alt="image.alt"  style="max-height: 280px; max-width: 700px; height: 280px; " class="w-full rounded-3xl" />
            </div>
            <div class="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center rounded-3xl p-2" style="position: absolute; bottom: 0;">{{ sliderCaption }}</div>
          </div>
        </div>
        <button
          @click="prevImage"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="nextImage"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    props: {
      images: {
        type: Array,
        required: true,
      },
      sliderCaption: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        currentIndex: 0,
      };
    },
    methods: {
      prevImage() {
        if (this.currentIndex === 0) {
          this.currentIndex = this.images.length - 1;
        } else {
          this.currentIndex--;
        }
      },
      nextImage() {
        if (this.currentIndex === this.images.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Define a custom easing function */
  .ease-custom {
    transition-timing-function: cubic-bezier(0.4, 0.6, 0.2, 1);
  }

  </style>
  