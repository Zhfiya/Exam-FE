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
  Tabs,
  TabPane,
  Button,
  Divider,
  Collapse,
  CollapseItem,
  Message,
  MessageBox,
  DatePicker,
  Slider,
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
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(DatePicker);
Vue.use(Slider);

Vue.use(codemirror);

Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

// 定义localStorage储存的方法
Storage.prototype.setExpire = (key, value, expire) => {
  const object = {
    data: value,
    time: Date.now(), //当前时间戳
    expire: expire, // 过期时间
  };
  localStorage.setItem(key, JSON.stringify(object));
};
// 定义localStorage获取的方法,通过判断是否过期起到清楚作用
Storage.prototype.getExpire = (key) => {
  let val = localStorage.getItem(key);
  if (!val) {
    return val;
  }
  val = JSON.parse(val);
  if (Date.now() - val.time > val.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return val.data;
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
