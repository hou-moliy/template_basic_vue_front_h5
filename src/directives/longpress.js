// 长按指令
const longpress = {
  bind: function (el, binding, vNode) {
    console.log(vNode);
    if (typeof binding.value !== "function") {
      throw console.error("callback must be a function");
    }
    // 定义变量
    let pressTimer = null;
    // 运行函数
    const handler = (e) => {
      binding.value(e);
    };
    // 创建计时器（ 2秒后执行函数 ）
    const start = (e) => {
      if (e.type === "click" && e.button !== 0) {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler();
        }, binding.arg || 2000);
      }
    };
    // 取消计时器
    const cancel = (e) => {
      console.log(e);
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    // 添加事件监听器
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    // 取消计时器
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  },
  // 当传进来的值更新的时候触发
  componentUpdated (el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind (el) {
    el.removeEventListener("click", el.handler);
  },
};

export default longpress;
