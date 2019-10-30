import Vue from 'vue';
import App from './App.vue';
import store from './store/index.js';
import router from './router.js';

import './components/List';
import './directive/index'

import VueLazyload from 'vue-lazyload';
import error from './assets/error.jpg';
import loading from './assets/loading.gif';

import './css/base.css';

Vue.config.productionTip = false;

import './vant.js';
import 'lib-flexible/flexible.js';

Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: error,
  loading: loading,
  attempt: 1
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
