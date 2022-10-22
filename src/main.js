import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Router from "vue-router";
import store from "./store";
import "lib-flexible/flexible";
import "normalize.css/normalize.css";
import "./plugins";
import "./permission";
import analysis from "./utils/analysis";
import Directives from "./directives";
import CommonComponents from "./components/common";
// 全局指令注册，一般情况下不要修改！！！
Vue.use(Directives);
// 全局公用组件注册，一般情况下不要修改！！！
Object.keys(CommonComponents).forEach((key) => {
  Vue.prototype[`$${key}`] = CommonComponents[key].install;
});
//  cancelToken中的cancel函数
Vue.$httpRequestList = [];
Vue.prototype.$staticImgs = process.env.VUE_APP_STATIC_IMGS || "/resource";
Vue.prototype.$analysis = analysis;
Vue.config.productionTip = false;
console.log("当前环境", process.env);
// 防止路由回调错误
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
