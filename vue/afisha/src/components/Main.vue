<script>
import CitySelector from '@/components/CitySelector.vue'
import ImageCarousel from '@/components/Crsl.vue'
import Sldr from '@/components/Sldr.vue'
import Sldrsp from '@/components/Sldrsp.vue'
import Feed from '@/components/Feed.vue'

export default {
  name: 'App',
  components: {
    Feed,
    ImageCarousel,
    CitySelector,
    Sldr,
    Sldrsp,
  },
  computed: {
    selectedCity() {
      return this.$route.params.city ? this.$route.params.city : 'Москва';
    }
  },
  data() {
    const selCity = this.$route.query.city || '';
    return {
      images: [
        // Add your image URLs here
        { url: "/src/assets/theater/gastrolvolanda.jpg" },
        { url: "/src/assets/theater/mayakov.jpg" },
        { url: "/src/assets/standup/mariamarkova.jpg" },
        { url: "/src/assets/theater/nomer13.png" },
        { url: "/src/assets/standup/pavelvolya.png" },
      ],
      captions: [
        // Add your captions here (in the same order as images)
        "Гастроль Воланда",
        "Маяковский",
        "Мария Маркова",
        "Номер 13",
        "Павел Воля",
      ],
      description: [
        "Мне думается, что спектакль этот не совсем про Мастера и Маргариту, не совсем про Иешуа и Понтия Пилата. Я бы даже сказал, что он совсем не про них.",
        "Команда лучших профессионалов современного театра с помощью новейших технологий, зрелищной сценографии, костюмов.",
        `15 декабря на площадке «Москва» состоится сольный стендап-концерт Марии Марковой.
        Мария Маркова - актриса, комик, участница передачи «Женский стендап» на ТНТ`,
        `Феерическая комедия. «Номер 13» вот уже третий десяток лет с успехом шествует по
театральным подмосткам всего мира. Пьеса вошла в золотой фонд
Британского театра, как одна из лучших английских комедий ХХ века.
Действие происходит в отеле...`,
        `Павел Воля едет в тур с Большим Stand Up! 
    Павел Воля – самый известный, дерзкий и правдивый комик России, едет в тур с абсолютно новой программой!`,

      ],
      imglinks:[
        "${this.$route.params.referral}/${this.$route.params.city}/theatre/Гастроль Воланда",
        "/theatre/2",
        "/theatre/3",
        "/theatre/4",
        "/theatre/5"
      ],
      imagessp: [
        // Add your image URLs here
        { url: "/src/assets/sp1.png" },
        { url: "/src/assets/sp2.png" },
        { url: "/src/assets/sp3.png" },
        { url: "/src/assets/sp4.png" },
      ],
      spLinks: [
        { link: "https://t.me/AfishaRu_Robot" },
        { link: "https://t.me/afisha/7375" },
        { link: "https://www.afisha.ru/subscription/?form=subscribe&utm_source=travel&utm_medium=content&utm_campaign=af_email_no" },
        { link: "https://t.me/afisha/7375" },
      ],
      selCity,
    };
  },
};
</script>

<template>
 
  <div class="mx-auto" style="max-width: 1000px; background-color: #ffffff; ">
  <div>
    <CitySelector />
  </div>
  <div style="padding-left: 10px; padding-top: 7px; font-weight: bold; font-size: 27px;">
      Все развлечения: {{ selectedCity }} 
    </div>
 
  

  <div>
    <div style="padding-left: 15px; padding-top: 25px; display: flex; align-items: center;">
  <p style="font-weight: bold; font-size: 24px; margin-right: 10px;">Подборки «Афиши»</p>
  <div style="display: flex; justify-content: flex-end; align-items: center; background-color: #ffffff; padding: 5px;">
    <router-link :to="{ name: 'Feed', query: { imagessp: JSON.stringify(images), description: JSON.stringify(description) } }">
      <button @click="openFeed" class="rounded-lg bg-white border border-gray-300 px-4 py-2 flex items-center">
        Все
        <svg viewBox="0 0 24 24" class="w-3 h-3 ml-2">
          <path fill="#000000" d="M9.41,8.59L13.83,13L9.41,17.41L10.83,18.83L16.83,12.83L10.83,6.83L9.41,8.25V8.59Z" />
        </svg>
      </button>
    </router-link>
  </div>
</div>

<Sldr :images="images" :captions="captions"  />
</div>

<div>
  <div>
    <div style="padding-left: 15px; padding-top: 25px; display: flex; align-items: center;">
  <p class="" style="font-weight: bold; font-size: 24px; margin-right: 10px;"> Специальные предложения</p>
  <div style="display: flex; justify-content: flex-end; align-items: center; background-color: #ffffff;  padding: 5px;">
    <router-link :to="{ name: 'Feed', query: { imagessp: JSON.stringify(imagessp), spLinks: JSON.stringify(spLinks) } }">
  <button @click="openFeed" class="rounded-lg bg-white border border-gray-300 px-4 py-2 flex items-center">
    Все
    <svg viewBox="0 0 24 24" class="w-3 h-3 ml-2">
      <path fill="#000000" d="M9.41,8.59L13.83,13L9.41,17.41L10.83,18.83L16.83,12.83L10.83,6.83L9.41,8.25V8.59Z" />
    </svg>
  </button>
</router-link>
</div>
</div>
  <Sldrsp :images="imagessp" :links="spLinks" />
</div>
</div>


</div>
</template>

<style>
.carousel-wrapper {
  position: absolute;
 
  z-index: -1;
}
</style>