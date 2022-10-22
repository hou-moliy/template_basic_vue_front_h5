// 全局路由守卫----登录权限控制
import Vue from "vue";
import router from "@/router/index";
import ssoApi from "@/api/sso";
import store from "@/store";

router.beforeEach((to, from, next) => {
  // 清除之前的请求
  clearHttpRequestingList();
  // 不需要的页面直接去该页面
  if (to.matched.some(record => record.meta.requiresAuth === false)) { return next(); }
  // 需要登录的页面去校验是否登录
  const token = localStorage.getItem("Authorization");
  const { auth } = to.query;
  if (auth) { // 免登录
    handleSignIn(auth);
    return;
  }
  // 非免登
  if (to.path === "/login" || token) {
    next();
  } else {
    next("/login");
  }
});

// 处理免登
function handleSignIn (auth) {
  ssoApi.signIn(auth).then(res => {
    if (res.code === 200) {
      const Authorization = `${res.data.tokenHead} ${res.data.token}`;
      localStorage.setItem("Authorization", Authorization);
      localStorage.setItem("adminPhone", res.data.pnnum);
      router.push("/index");
    } else {
      // 免登失败
      store.dispatch("logOut").then(() => {
        // 跳转登录页
        Vue.prototype.$toast(res.message);
        router.replace("/login");
      });
    }
  });
}

// 清空cancelToken中的cancel函数
function clearHttpRequestingList () {
  if (Vue.$httpRequestList.length > 0) { // 强行中断时才向下执行
    Vue.$httpRequestList.forEach((item) => {
      item("interrupt");// 给个标志，中断请求
    });
  }
}
