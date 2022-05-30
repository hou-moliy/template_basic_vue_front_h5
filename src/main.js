import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Router from 'vue-router';
import store from './store';
import "./plugins";
import "./permission";
import Directives from './directives';
import 'lib-flexible/flexible';
import 'normalize.css/normalize.css';
Vue.use(Directives);
//  cancelToken中的cancel函数
Vue.$httpRequestList = [];
Vue.prototype.$staticImgs = process.env.VUE_APP_STATIC_IMGS || '/resource';
Vue.config.productionTip = false;
console.log('当前环境', process.env);
// 防止路由回调错误
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
