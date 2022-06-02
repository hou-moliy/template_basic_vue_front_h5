const handleLogin = (callBack) => {
  if (!localStorage.getItem('Authorization')) {
    // 修改登录状态
    // 设置登录状态
    console.log('你还没有登录，展示登录弹窗');
  } else {
    callBack();
  }
};

const login = {
  inserted: function (el, binding) {
    el.addEventListener('click', handleLogin(binding.value), true);
  }
};
export default login;
