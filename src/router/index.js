import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/pageNotFound.vue';
import IndexView from "@/views/index/index.vue";

Vue.use(Router);
const constantRoutes = [
  {
    path: '/',
    component: IndexView
  },
  {
    path: '*',
    component: PageNotFound,
    meta: { requiresAuth: false } // 表示不需要校验登录，默认都是需要校验登录
  }
];

let routes = [...constantRoutes];
const routerContext = require.context('.', false, /\.js$/);
routerContext.keys().forEach((route) => {
  if (route === './index.js') { return; };
  const routerModule = routerContext(route);
  //  兼容 import export 和 require module.require 两种规范
  routes = [...routes, ...(routerModule.default || routerModule)];
});
const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
});

export default router;
