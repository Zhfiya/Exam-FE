import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin],
});

function createModules(arr) {
  arr.keys().forEach((key) => {
    store.registerModule(key.replace(/\.\/|\/(.*)\.js/g, ""), arr(key).default);
  });
}

let modulesContext = require.context("./", true, /^\.\/[^/]+\/.+\.js$/);
createModules(modulesContext);

export default store;
