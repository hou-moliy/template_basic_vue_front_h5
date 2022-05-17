// 设置页面标题
import $ from 'jquery';
import router from '@/router';
window.jQuery = $;
window.$ = $;
export const setPageTitle = (title) => {
  let userAgentObj = JSON.parse(localStorage.getItem('userAgentObj')) || null;
  if (userAgentObj && userAgentObj.isDingTalk) {//钉钉内
    window.$dd.ready(function () {
      window.$dd.biz.navigation.setTitle({
        title: title,//控制标题文本，空字符串表示显示默认文本
        onSuccess: function (result) {
          console.log(result);
        },
        onFail: function (err) {
          console.log(err);
        }
      });
    });
  } else {//微信或浏览器内
    var $body = $('body');
    document.title = title;//普通浏览器用这一句就可以修改了
    var $iframe = $('<iframe style="display: none"></iframe>');
    $iframe.on('load', function () {
      setTimeout(function () {
        $iframe.off('load').remove();
      }, 0);
    }).appendTo($body);
  }
};

// 页面跳转
export const navigateUrl = ({ preventType, preventUrl }) => {
  switch (preventType) {
    case 1: // 内部跳转
      router.push(preventUrl);
      break;
    case 2: // 外部跳转h5
      window.location.href = preventUrl;
      break;
    default:
      break;
  }
};

// 当前日期的前后几个月时间
export const getpreDate = (month, type = 1) => { // type = 1是前几个月，0是后几个月
  var dt = new Date();
  if (type === 1) {
    dt.setMonth(dt.getMonth() - month);
  } else {
    dt.setMonth(dt.getMonth() + month);
  }
  // dt = dt.toLocaleString();
  return dt;
};

//关闭所有历史页面,跳转到某个页面
export const colseAllPage = (url) => {
  let backlen = window.history.length - 1;
  window.history.go(-backlen);
  console.log(url, 'url');
  setTimeout(() => {
    url && router.push(url);
  }, 100);
};

// 手机号脱敏展示
export const desensitizationPhone = (phone) => {
  // 第一种
  let enStr = phone.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
  return enStr;
};