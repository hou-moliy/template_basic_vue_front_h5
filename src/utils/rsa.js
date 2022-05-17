import JSEncrypt from 'jsencrypt';
const PublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsGBIVmDa7kGZiH2Pqw68ES1gF8kw3MCrQtZM+f/AavMUqhZ0wb8E4wNSNCWfCnr8X5C3eHI9kH++lBv+Y1/vm5kICi/XEK3Ts2bRkI0NyqcN7gRnbGx2Dpklo6ida6mrEatOLzG0Ea0+1oXGNC0JHDhqtHVmH4yk8Q0YxGzI4MQIDAQAB';
const PrivateKey = '-----BEGIN RSA PRIVATE KEY-----MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAOwYEhWYNruQZmIfY+rDrwRLWAXyTDcwKtC1kz5/8Bq8xSqFnTBvwTjA1I0JZ8KevxfkLd4cj2Qf76UG/5jX++bmQgKL9cQrdOzZtGQjQ3Kpw3uBGdsbHYOmSWjqJ1rqasRq04vMbQRrT7WhcY0LQkcOGq0dWYfjKTxDRjEbMjgxAgMBAAECgYAMwhI8G4EdqqR1ufeGyLNM+ptTmu/WbaJqq908m+JIN5o5/YVsiCV7YSQ7SN5UDIsMCfcWkRmIkhc7pkCqrEU+7u1IiHtWnwjtNGe/vhqqtwCe4fSl3RKmF7qOBvOpxf9nH2oEa5TqHj6WyZV6SVHyFk63I/CRD3TVa0KfZYSOPwJBAP6M2pObBO9nagkoSyDOX6HUJ6RoqW47vOGcGMTSW4SEjwoZgWTNkiEeJa8qezUfVGfaI1yAnP7ifoIrLe20MjsCQQDtcE6NMzxDD6BIgkGSkMXajSK9B18pynPLBwmO7YEaa5EoZ++dodqDrpQEnnj3esggiaiuLsHCawmlx0tPCUyDAkBfIum2bSPFDlOVJJgfpMIdS5udWPiqGG2ZrKudNDm8J4cGcU3pDOPmuMvA0hHGYvU6805wDimfIavCnrzFsKltAkEA1LvQxVXoYjU36H87/PNVMdFOFIrsSmcng/pUKAjHqUJDFi65U0RWobDi0ZiizSjm8bAkv5sI4wY/6JY89R1hvQJBAPHGLQKJF4t1q8+jclMU6TvQvrqV5la/vGtf4zt1QdjmtBDWzE/qRBNVN7qrNfD0SbEE7Lb37jKblmlR+TSCehs=-----END RSA PRIVATE KEY-----';
// RSA加密
export const getRsaCode = str => {
  const pubKey = process.env.VUE_APP_RSA_PUBLICKEY || PublicKey; // ES6 模板字符串 引用 rsa 公钥
  const encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  console.log(typeof str, 'typeof', str);
  const data = encryptStr.encrypt(str.toString()); // 进行加密
  return data;
};

// RSA解密
export const decryptionRsacode = encrypted => {
  var decrypt = new JSEncrypt();//创建解密对象实例
  //之前ssl生成的秘钥
  const priKey = process.env.VUE_APP_RSA_PRIVATEKEY || PrivateKey; // ES6 模板字符串 引用 rsa 私钥
  decrypt.setPrivateKey(priKey);//设置秘钥
  const data = decrypt.decrypt(encrypted);//解密之前拿公钥加密的内容
  return data;
};