module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 37.5, // 换算基数
      minPixelValue: 0,
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    })
  ]
};
