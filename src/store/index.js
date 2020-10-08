import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userStatus: null,
    userId: null
  },
  mutations: {
    setStatus(state, payload) {
      state.userStatus = payload;
    },
    setId(state, payload) {
      state.userId = payload;
    }
  },
  actions: {},
  modules: {}
});
