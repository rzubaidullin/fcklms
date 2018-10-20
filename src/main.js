import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';


Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Toaster, {
  timeout: 5000
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
