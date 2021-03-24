import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  Header,
  Container,
  Tooltip,
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
  Aside,
  Main,
} from "element-ui";

Vue.use(Header);
Vue.use(Container);
Vue.use(Tooltip);
Vue.use(Menu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Aside);
Vue.use(Main);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
