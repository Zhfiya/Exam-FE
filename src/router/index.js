import Vue from "vue";
import VueRouter from "vue-router";
import UserLogin from "@/views/Login/UserLogin";
import PersonalCenter from "@/views/PersonalCenter/PersonalCenter";
import IndexStudent from "../views/Student/IndexStudent.vue";
import StudentExam from "@/views/Student/MyExam/StudentExam";
import StudentTest from "@/views/Student/MyTest/StudentTest";
import StudentExamList from "@/views/Student/MyExam/ExamList";
import TestIndex from "@/views/Student/MyTest/TestIndex";
import IndexTeacher from "@/views/Teacher/IndexTeacher";
import SetQuestion from "@/views/Teacher/QuestionBank/SetQuestion";
import MarkPaper from "@/views/Teacher/MarkPaper/MarkPaper";

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
    path: "/index-student",
    name: "IndexStudent",
    component: IndexStudent,
  },
  {
    path: "/",
    name: "UserLogin",
    component: UserLogin,
  },
  {
    path: "/personal-center",
    name: "PersonalCenter",
    component: PersonalCenter,
  },
  {
    path: "/student-exam",
    name: "StudentExam",
    component: StudentExam,
  },
  {
    path: "/student-test",
    name: "StudentTest",
    component: StudentTest,
  },
  {
    path: "/student-exam-list",
    name: "StudentExamList",
    component: StudentExamList,
  },
  {
    path: "/test-index",
    name: "TestIndex",
    component: TestIndex,
  },
  {
    path: "/index-teacher",
    name: "IndexTeacher",
    component: IndexTeacher,
  },
  {
    path: "/teacher-set-question",
    name: "SetQuestion",
    component: SetQuestion,
  },
  {
    path: "/teacher-mark-paper",
    name: "MarkPaper",
    component: MarkPaper,
  },
  // ...routerList,
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

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
