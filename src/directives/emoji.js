// 限制不能输入表情指令
const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type);
};

const trigger = (el, type) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

const emoji = {
  bind: function (el, binding, vnode) {
    console.log(binding, vnode);
    // 正则规则可根据需求自定义
    const regRule = /[^\u4E00-\u9FA5|\d|\\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;
    const $inp = findEle(el, "input");
    el.$inp = $inp;
    $inp.handle = function () {
      const val = $inp.value;
      $inp.value = val.replace(regRule, "");

      trigger($inp, "input");
    };
    $inp.addEventListener("keyup", $inp.handle);
  },
  unbind: function (el) {
    el.$inp.removeEventListener("keyup", el.$inp.handle);
  },
};

export default emoji;
