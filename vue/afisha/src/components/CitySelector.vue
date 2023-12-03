<template>
  <div class="container">
    <div class="container flex items-center">
      <img src="/src/assets/afisha.png" alt="Afisha" class="ml-1 mt-4 lg:pl-1 lgo">
      <div class="flex justify-end flex-grow">
        <button
          class="bg-transparent text-black py-2 rounded-lg border-none mr-4 mt-4 flex items-center"
          @click="showModal = true"
        >
          {{ selectedCity }}
          <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="ml-2">
            <path d="M12 16l8.485-8.485L22 9.171l-10 10-10-10 1.515-1.656L12 16z"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="showModal" class=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <!-- Modal content -->
      <div class="bg-white p-4 rounded-3xl max-h-63 overflow-y-auto absolute z-50 ">
        <div class="flex items-center border rounded-3xl pl-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_16_27)">
<path d="M23.7875 22.7761L17.9551 16.9437C19.5196 15.145 20.4669 12.7982 20.4669 10.2333C20.4669 4.58714 15.8744 0 10.2336 0C4.5875 0 0.000366211 4.59246 0.000366211 10.2333C0.000366211 15.8741 4.59283 20.4665 10.2336 20.4665C12.7986 20.4665 15.1454 19.5193 16.944 17.9548L22.7764 23.7871C22.9148 23.9255 23.101 24 23.282 24C23.4629 24 23.6491 23.9308 23.7875 23.7871C24.0642 23.5104 24.0642 23.0528 23.7875 22.7761ZM1.43185 10.2333C1.43185 5.38004 5.38041 1.43681 10.2283 1.43681C15.0815 1.43681 19.0247 5.38537 19.0247 10.2333C19.0247 15.0812 15.0815 19.035 10.2283 19.035C5.38041 19.035 1.43185 15.0865 1.43185 10.2333Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_16_27">
<rect width="24" height="24" fill="white"/>
</clipPath>
      </defs>
      </svg>
         <input type="text" v-model="search" placeholder="Выберите город..." class="py-2 pl-2 pr-4 border-none outline-none">
        </div>
        <div class="h-48 overflow-y-auto hide-scrollbar">
          <div class="flex">
            <ul class="w-1/2 max-h-full">
              <li v-for="(city, index) in leftColumn" :key="index" class="cursor-pointer hover:bg-gray-100 p-2" @click="selectCity(city)">
                {{ city }}
              </li>
            </ul>
            <div class="border-l mx-4"></div>
            <ul class="w-1/2 max-h-full">
              <li v-for="(city, index) in rightColumn" :key="index" class="cursor-pointer hover:bg-gray-100 p-2" @click="selectCity(city)" :class="{ active: city === selectedCity }">
                {{ city }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto whitespace-nowrap">
      <nav class="p-4">
        <div class="flex space-x-4">
          <div v-for="option in options" :key="option" class="cursor-pointer px-3 py-2 hover:bg-gray-300 rounded-2xl" @click="selectVariant(option)" :class="{ 'bg-gray-300': option === selectedVariant }">
            {{ option }}
          </div>
        </div>
      </nav>
    </div>
    <div style="padding-top: 25px; padding-bottom: 25px;">
      <div class="bg-container">
        <div class="bg-text">
          Афиша - ваш культурный отдых
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs, watch  } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  props: {
    variant: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    
    const options = ref(["Все", "Стендап", "Театр", "Выставки"]);
    const showModal = ref(false);
    const cities = ref([
      "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", "Нижний Новгород",
      "Челябинск", "Самара", "Омск", "Ростов-на-Дону", "Уфа", "Красноярск", "Воронеж",
    ]);
    const search = ref("");
    const selectedCity = ref("");
    const selectedVariant = ref(options.value[0]); // default to the first option

    // Function to update the selected variant based on the prop
    const updateSelectedVariant = (newVariant) => {
      if (options.value.includes(newVariant)) {
        selectedVariant.value = options.value[options.value.indexOf(newVariant)];
      }
    };
    const filterCities = () => {
      const filtered = cities.value.filter(city => city.toLowerCase().includes(search.value.toLowerCase()));
      return {
        left: filtered.slice(0, Math.ceil(filtered.length / 2)),
        right: filtered.slice(Math.ceil(filtered.length / 2))
      };
    };

    const leftColumn = computed(() => filterCities().left);
    const rightColumn = computed(() => filterCities().right);

    const selectCity = (city) => {
      selectedCity.value = city;
      showModal.value = false;
      updateRoute();
    };

    const selectVariant = (variant) => {
      selectedVariant.value = variant;
      updateRoute();
    };

    const updateRoute = () => {
      const encodedCity = encodeURIComponent(selectedCity.value);
      const encodedVariant = encodeURIComponent(selectedVariant.value);
      router.push(`/${route.params.referral}/${encodedCity}/${encodedVariant}`);
    };

    const redirectToReferral = () => {
      router.push(`/${route.params.referral}`);
    };

    onMounted(() => {
      selectedCity.value = route.params.city || "Москва";
      updateSelectedVariant(props.variant);
    });

    watch(() => props.variant, (newVariant) => {
      updateSelectedVariant(newVariant);
    });

    return {
      options,
      showModal,
      cities,
      search,
      selectedVariant,
      leftColumn,
      rightColumn,
      selectCity,
      selectVariant,
      selectedCity,
    };
  },
});
</script>

<style>
.border-l {
  border-left: 1px solid #ccc;
}

.bg-container {
  background-image: url("../assets/bg1.png");
  background-size: cover;
  background-position: center;
  height: 100px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: darkcyan;
}

.bg-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.modal-menu {
  z-index: 9999;
}

.hide-scrollbar {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}
</style>
