import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import UserLogin from "@/views/Login/UserLogin";

Vue.use(VueRouter);

//动态加载路由模块
function createModules(arr, list) {
  arr.keys().forEach((key) => {
    list.push(arr(key).default);
  });
}

const routerList = [];
let matches = require.context("./", true, /^\.\/[^/]+\/.+\.js$/);

createModules(matches, routerList);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "UserLogin",
    component: UserLogin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//全局钩子函数，处理用户登录情况不同时的页面跳转
// router.beforeEach((to,from,next)=>{
//   if(to.path==='/login' && Store.state.userRole=='administrator'){
//     next();
//   }
//   else if(to.path==='/administrator' && Store.state.userRole!='administrator'){
//     next({path:'/'});
//   }
//   else if(to.path!=='/administrator' && Store.state.userRole=='administrator'){
//     next({path:'/administrator'});
//   } //权限
//   else if(Store.state.userToken!==null){
//     if(to.path==='/login'){
//       next({path:'/'});
//     }else{
//       next();
//     }
//   }else{
//     if(to.path==='/login'){
//       next();
//     }else{
//       next({
//         path:'/login',
//         query:{
//           redirect:to.path
//         }
//       })
//     }
//   }
// })

export default router;
