import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routers'
import moment from 'moment'
import store from './store'
import axios from '@/plugins/axios'

Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app')
