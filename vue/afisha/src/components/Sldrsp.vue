<template>
  <div class="flex items-center overflow-x-auto snap-x snap-mandatory" style="max-width: 1200px;">
    <div v-for="(img, index) in images" :key="img.url" class="p-2 snap-center">
      <div style="width: 300px;">
        <a :href="links[index].link" target="_blank">
        <img :src="img.url" style="border-radius: 25px; height: 300px; width: 100%;" class="max-h-80 object-cover" />
        </a>  
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
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>