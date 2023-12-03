import { createRouter, createWebHistory } from 'vue-router';
import CitySelector from '../components/CitySelector.vue';
import Main from '../components/Main.vue';
import Feed from '../components/Feed.vue';
import Restaurants from '../components/Restaurants.vue';
import Concerts from '../components/Concerts.vue';
import Standup from '../components/Standup.vue';
import Tlayout from '../components/Tlayout.vue';
import Theatre from '../components/Theatre.vue';
import Stlayout from '../components/Stlayout.vue';
import StseatPicker from '../components/StseatPicker.vue';
import Clayout from '../components/Clayout.vue';
import Payment from '../components/Payment.vue';
import Stseats from '../components/Stseats.vue'
import Tgbot from '../components/Tgbot.vue'
const routes = [
  {
    path: '/:referral/:city/%D0%A0%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D1%8B',
    name: 'Restaurants',
    component: Restaurants,
    props: {variant: 'restaurants'}
  },
  {
    path: '/:referral/:city/%D0%A1%D1%82%D0%B5%D0%BD%D0%B4%D0%B0%D0%BF',
    name: 'Standup',
    component: Standup,
    props: true,
  }, 
  {
    path: '/:referral/:city/%D0%A1%D1%82%D0%B5%D0%BD%D0%B4%D0%B0%D0%BF/:id',
    name: 'StandupLayout',
    component: Stlayout,
    props: true,
  },
  {
    path: '/:referral/:city/%D0%A2%D0%B5%D0%B0%D1%82%D1%80',
    name: 'Theatre',
    component: Theatre,
    props: true
  },
  {
    path: '/:referral/:city/%D0%A2%D0%B5%D0%B0%D1%82%D1%80/:id',
    name: 'Tlayout',
    component: Tlayout,
    props: true
  },
  {
    path: '/:referral/:city/%D0%92%D1%8B%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B8',
    name: 'Concerts',
    component: Concerts,
    props: true
  },
  {
    path: '/:referral/:city/%D0%92%D1%8B%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B8/:id',
    name: 'Clayout',
    component: Clayout,
    props: true
  },
  {
    path: '/stseats',
    name: 'StseatPicker',
    component: StseatPicker,
    props: true
  },
  {
    path: '/:referral/:city/:variant/:id/payment',
    name: 'Payment',
    component: Payment,
    props: true,
  },
  {
    path: '/:referral',
    name: 'refmain',
    component: Main,
    props: true
  },
  {
    path: '/:referral/:city/:variant',
    name: 'Main',
    component: Main,
    props: true
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    props: true, // Allow passing props via route
  },
  {
    path: '/:referral/tg',
    name: 'Tgbot',
    component: Tgbot,
    props: true, // Allow passing props via route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;