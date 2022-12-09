import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import { io } from "socket.io-client";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

const options = {};

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io(process.env.VUE_APP_BACKEND_URL, options),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
