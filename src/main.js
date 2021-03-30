import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

import {
  Header,
  Container,
  Tooltip,
  Main,
  Card,
  Radio,
  Input,
  Table,
  TableColumn,
  Option,
  Dialog,
  Select,
} from "element-ui";

Vue.use(Header);
Vue.use(Container);
Vue.use(Tooltip);
Vue.use(Main);
Vue.use(Card);
Vue.use(Radio);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);

Vue.use(codemirror);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
