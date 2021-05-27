import Vue from 'vue'
import App from './components/App.vue'
import './assets/styles/index.css';
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
