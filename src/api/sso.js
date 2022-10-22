import axios from ".";
import { getRsaCode } from "@/utils/rsa";
const baseURL = process.env.VUE_APP_BASE_API_PORTAL;
// 登录
const sendSmsLoginByParams = ({ code, phone, authType }) => axios.request({
  url: "/sso/smsCodeH5Login",
  data: {
    code: getRsaCode(code),
    phone: getRsaCode(phone),
    authType: authType || 1, // 1-RSA/ECB,2-RSA,3-base64
  },
  method: "POST",
  baseURL,
});
// 刷新token
const refreshToken = params => axios.request({
  url: "/sso/refreshToken",
  params,
  method: "GET",
  baseURL,
});

// h5获取验证码
const getAuthCode = ({ phone, authType }) => axios.request({
  url: "/sso/getH5AuthCode",
  data: {
    phone: getRsaCode(phone),
    authType: authType || 1, // 加密类型,1-RSA/ECB,2- RSA,3-base64
  },
  method: "POST",
  baseURL,
});

// 免登
const signIn = auth => axios.request({
  url: `/sso/appNewHdh?auth=${encodeURIComponent(auth)}`,
  method: "GET",
  baseURL,
});

export default {
  sendSmsLoginByParams,
  refreshToken,
  getAuthCode,
  signIn,
};
