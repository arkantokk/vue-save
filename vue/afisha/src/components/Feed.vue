<template>
  <div class="mx-auto bg-white" style="max-width: 1000px;">
    <div>
      <!-- CitySelector component -->
      <CitySelector />
    </div>
    <div v-for="(image, index) in imagessp" :key="image.url" class="m-4 rounded-xl">
  <!-- Use flex to align image and caption horizontally -->
  <div class="flex items-center">
    <!-- Image -->
    <a v-if="spLinks[index] && spLinks[index].link" :href="spLinks[index].link" target="_blank">
      <img :src="image.url" class="object-cover rounded-xl" style="width: 200px; height: 200px;" alt="Image" />
    </a>
    <img v-else :src="image.url" class="object-cover rounded-xl" style="width: 200px; height: 200px;" alt="Image" />
    <!-- Display the caption and description if they exist -->
    <div v-if="captions[index] || description[index]" class="pl-4 text-gray-600">
      <!-- Use prose class to improve typography -->
      <div class="prose">
        <!-- Caption -->
        <div v-if="captions[index]" class="text-xl font-bold">{{ captions[index] }}</div>
        <!-- Description -->
        <div v-if="description[index]" class="text-sm pt-2 text-gray-800">{{ description[index] }}</div>
      </div>
    </div>
  </div>

      
      
      
    </div>
  </div>

</template>

<script>
import CitySelector from '@/components/CitySelector.vue';

export default {
  name: 'App',
  components: {
    CitySelector,
  },
  computed: {
    imagessp() {
      const imagesspParam = this.$route.query.imagessp;
      return imagesspParam ? JSON.parse(imagesspParam) : [];
    },
    captions() {
      const captionsParam = this.$route.query.captions;
      return captionsParam ? JSON.parse(captionsParam) : [];
    },
    description() {
      const descriptionsParam = this.$route.query.description;
      return descriptionsParam ? JSON.parse(descriptionsParam) : [];
    },
    spLinks() {
      // Default to an empty array if spLinksParam is not present
      const spLinksParam = this.$route.query.spLinks;
      return spLinksParam ? JSON.parse(spLinksParam) : [];
    },
  },
  methods: {
    goBack() {
      // Navigate back to the previous page
      this.$router.go(-1);
    },
  },
};
</script>