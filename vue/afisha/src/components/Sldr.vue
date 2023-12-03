<template>
  <div class="flex items-center overflow-x-auto snap-x snap-mandatory" style="max-width: 1200px;">
    <div v-for="(img, index) in shuffledImages" :key="img.url" class="p-2 snap-center">
      <div style="width: 270px;">
        <img :src="img.url" style="border-radius: 25px; height: 200px; width: 100%;" class="max-h-80 object-cover" />
        <p class="text-left  text-3xl mt-2 " style="width: 100%; margin-left: 20px; ">{{ shuffledCaptions[index] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sldr",
  props: {
    images: {
      type: Array,
      required: true,
    },
    captions: {
      type: Array,
      required: true,
    },

  },
  data() {
    return {
      shuffledImages: [], // Store shuffled images
      shuffledCaptions: [], // Store shuffled captions
    };
  },
  computed: {
    selectedCity() {
      // Extract the selected city from the URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("city") || "";
    },
  },
  watch: {
    // Watch for changes in selectedCity
    selectedCity: {
      handler(newCity) {
        // Shuffle images and captions
        this.shuffleImages();
      },
      immediate: true, // Trigger the watcher immediately on component creation
    },
  },
  methods: {
    // Shuffle images and captions
    shuffleImages() {
      const shuffledIndices = Array.from({ length: this.images.length }, (_, i) => i);
      for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
      }

      this.shuffledImages = shuffledIndices.map(index => this.images[index]);
      this.shuffledCaptions = shuffledIndices.map(index => this.captions[index]);
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
