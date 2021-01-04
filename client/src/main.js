import Vue from 'vue';
import App from './App.vue';
import './icons';
import './toaster';
import './directives';
import './draggable';
import router from './router'
import axios from 'axios';

//Before any request is sent
axios.interceptors.request.use(function (config) {
  config.headers['auth-token'] = sessionStorage.getItem('auth-token');
  return config;
});

document.title = 'Lava Lamp';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
