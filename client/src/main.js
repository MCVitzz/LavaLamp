import Vue from 'vue';
import App from './App.vue';
import './icons';
import './toaster';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
