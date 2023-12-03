import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
import router from './router/router';


const app = createApp(App);

app.use(router); // Add the router instance to your Vue application


app.mount('#app');
