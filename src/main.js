import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Header, Container, Tooltip, Main, Card, Radio } from "element-ui";

Vue.use(Header);
Vue.use(Container);
Vue.use(Tooltip);
Vue.use(Main);
Vue.use(Card);
Vue.use(Radio);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
