import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routers'
import moment from 'moment'
import store from './store'
import axios from '@/plugins/axios'
import tableLoader from '@/components/Loader/tableLoader'
import global_mixin from '@/components/Mixins/global';
import image_mixin from '@/components/Mixins/images';
import rules_mixin from '@/components/Mixins/rules';
import styling_mixin from '@/components/Mixins/styling';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { ValidationProvider } from 'vee-validate';

const options = {
  timeout: 3000,
  showCloseButtonOnHover: true,
};


Vue.use(Toast, options);


Vue.prototype.moment = moment
Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider);

Vue.component('table-loader',tableLoader)
Vue.component('app-confirm', require('@/components/Alert/confirm.vue').default)
Vue.component('app-success', require('@/components/Alert/success.vue').default)

Vue.mixin(global_mixin)
Vue.mixin(styling_mixin)
Vue.mixin(image_mixin)
Vue.mixin(rules_mixin)

// moment.updateLocale('fr', {
//   weekdaysShort : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
// });

new Vue({
  vuetify,
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app')
