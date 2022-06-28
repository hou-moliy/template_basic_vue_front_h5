import Vue from "vue";
import router from "@/router";
// 判断用户是否登录，没有登录就展示弹窗跳转登录页面
const handleLogin = () => {
  if (!localStorage.getItem('Authorization')) {
    // 修改登录状态
    // 设置登录状态
    console.log('你还没有登录，展示登录弹窗');
    Vue.prototype.$dialog.alert({
      message: '你还没有登录，快去登录吧',
      theme: 'round-button',
      confirmButtonText: '去登录',
      confirmButtonColor: '#4DC591'
    }).then(() => {
      // on close
      router.push('/login');
    });
  }
};

const login = {
  inserted: function (el) {
    el.addEventListener('click', handleLogin, true);
  }
};
export default login;
