import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import LuckDraw from 'vue-luck-draw'
import 'lib-flexible'

// import http from '@/request/http.js'
// import api from '@/request/api.js'

// Vue.prototype.$ap1 = api;
// Vue.prototype.$axios = http;
Vue.use(LuckDraw)
Vue.use(VueAxios,axios);
Vue.use(MintUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
