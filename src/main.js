import Vue from 'vue';
import 'lib-flexible/flexible';
import App from './App.vue';
import router from './router';
import store from './store';
import "./utils/vant";
import "./utils/router";
//  cancelToken中的cancel函数
Vue.$httpRequestList = [];
Vue.prototype.$staticImgs = process.env.VUE_APP_STATIC_IMGS || '/resource';
Vue.config.productionTip = false;
console.log('当前环境', process.env);

// 全局登录指令
Vue.directive('preventReClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      console.log('防止点击');
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 3000);
      }
    });
  }
});

// 防止路由回调错误
import Router from 'vue-router';
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
