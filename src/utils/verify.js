// 手机号校验
export const verifyPhone = phone => {
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return reg.test(phone.trim());
};
// 身份证号校验
export const verifyCode = (idno) => {
  //六位地区编码 region
  let region = "((1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|8[1-3])\\d{4})";
  //四位年份 year
  let year = "((19|20)\\d{2})";
  //两位月份 month
  let month = "(0[1-9]|1[0-2])";
  //两位日期 date
  let date = "(0[1-9]|[12]\\d|3[01])";
  //末尾四位编号 code
  let code = "(\\d{3}([0-9xX]))";
  let regex = region + year + month + date + code;
  if (idno.match(regex)) {
    return true;
  }
  return false;
};
// 姓名校验
export const verifyName = (val) => {
  let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
  return reg.test(val);
};
