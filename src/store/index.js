import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: ['super'],
  },
  mutations: {},
  actions: {
    SOCKET_messageToClient(ctx, data) {
      ctx.state.messages.unshift(data);
    },
  },
  getters: {
    messages : state => state.messages,
  },
  modules: {},
});
