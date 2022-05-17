import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/pageNotFound.vue';
import IndexView from "@/views/index/index.vue";

Vue.use(Router);
const constantRoutes = [
  {
    path: '*',
    component: PageNotFound
  },
  {
    path: '/',
    component: IndexView
  }
];

let routes = [...constantRoutes];
const routerContext = require.context('./', true, /index\.js$/);
routerContext.keys().forEach((route) => {
  // 如果是根目录的 index.js 不处理
  if (route.startsWith('./index')) {
    return;
  }
  const routerModule = routerContext(route);
  //  兼容 import export 和 require module.require 两种规范
  routes = [...routes, ...(routerModule.default || routerModule)];
});
console.log(routes, 'xxxx');

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
});

export default router;
