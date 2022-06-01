// 埋点
import Fingerprint2 from 'fingerprintjs2';
import analysisServe from '@/api/analysis';
const uuid = () => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  const r = (Math.random() * 16) | 0;
  const v = c === 'x' ? r : (r & 0x3) | 0x8;
  return v.toString(16);
});
const initDeviceId = (components) => {
  const values = components.map((component, index) => {
    if (index === 0) {
      // 把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
      return component.value.replace(/\bNetType\/\w+\b/, '');
    }
    return component.value;
  });
  // 生成最终id murmur
  const murmur = Fingerprint2.x64hash128(values.join(''), 31);
  return murmur;
};

const deviceIdInCache = localStorage.getItem('analysis_deviceId');
const initedDeviceId = localStorage.getItem('inited_deviceId');
if (!initedDeviceId) {
  localStorage.removeItem('analysis_deviceId');
}
if (!deviceIdInCache) {
  if (window.requestIdleCallback) {
    requestIdleCallback(() => {
      Fingerprint2.get((components) => {
        components.push({
          key: 'uuid',
          value: uuid() // 通过接口获取的到ip
        });
        localStorage.setItem('analysis_deviceId', initDeviceId(components));
        localStorage.setItem('inited_deviceId', true);
      });
    });
  } else {
    setTimeout(() => {
      Fingerprint2.get((components) => {
        components.push({
          key: 'uuid',
          value: uuid() // 通过接口获取的到ip
        });
        localStorage.setItem('analysis_deviceId', initDeviceId(components));
        localStorage.setItem('inited_deviceId', true);
      });
    }, 500);
  }
}

const getParams = () => {
  const activityId = localStorage.getItem('analysis_activityId');
  const channel = sessionStorage.getItem('analysis_channel');
  const deviceId = localStorage.getItem('analysis_deviceId');
  const currentUrl = localStorage.getItem('analysis_currentUrl');
  const sourceUrl = localStorage.getItem('analysis_sourceUrl');
  return {
    activityId,
    channel,
    deviceId,
    pageTitle: document.title,
    currentUrl,
    sourceUrl
  };
};

// 采集自定义事件类型
const dispatch = (eventId, extraInfo) => {
  let param = getParams();
  param = {
    ...param,
    eventId,
    extraInfo
  };
  // 某些页面需要跳转会打断埋点请求，需要使用promise
  return analysisServe.send(param);
};
// 采集活动id，用于区分是哪个活动的事件
const setActivityId = (activityId) => {
  localStorage.setItem('analysis_activityId', activityId);
};

// 采集渠道，用于区分是哪个渠道的事件
const setChannel = (channel) => {
  console.log(channel);
  sessionStorage.setItem('analysis_channel', channel);
};

// 采集当前目标地址
const setCurrentUrl = (currentUrl) => {
  localStorage.setItem('analysis_currentUrl', currentUrl);
};

// 采集源目标地址
const setSourceUrl = (sourceUrl) => {
  localStorage.setItem('analysis_sourceUrl', sourceUrl);
};

export default {
  uuid,
  dispatch,
  setActivityId,
  getParams,
  setChannel,
  setSourceUrl,
  setCurrentUrl
};
