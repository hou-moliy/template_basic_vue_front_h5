// 全局路由守卫
import Vue from "vue";
import router from '@/router/index';
import SsoApi from "@/api/sso";

router.beforeEach((to, from, next) => {
  clearHttpRequestingList();
  let token = localStorage.getItem('Authorization');
  const { auth } = to.query;
  if (auth) { // 免登录
    handleSignIn(auth);
    return;
  }
  // 非免登
  if (to.path == '/login' || token) {
    next();
  } else {
    next('/login');
  }
});

// 处理免登 
function handleSignIn (auth) {
  SsoApi.signIn(auth).then(res => {
    if (res.code === 200) {
      let Authorization = `${res.data.tokenHead} ${res.data.token}`;
      localStorage.setItem('Authorization', Authorization);
      localStorage.setItem('adminPhone', res.data.pnnum);
      router.push('/index');
    } else {
      // 免登失败
      localStorage.removeItem('Authorization');
      localStorage.removeItem('adminPhone');
      Vue.prototype.$toast(res.message);
      router.replace('/login');
    }
  });
}

// 清空cancelToken中的cancel函数
function clearHttpRequestingList () {
  if (Vue.$httpRequestList.length > 0) { // 强行中断时才向下执行
    Vue.$httpRequestList.forEach((item) => {
      item('interrupt');// 给个标志，中断请求
    });
  }
}