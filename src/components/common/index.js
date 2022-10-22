// 此文件用于'main.js'一次性导入所有common下的组件作为公用组件，一般情况下不要修改！！！
const componentsFiles = require.context(".", true, /\.js$/);
const components = {};
componentsFiles.keys().forEach(key => {
  if (key === "./index.js") { return; };
  components[key.replace(/(\.\/|\.js|\/index |\/)/g, "")] = (componentsFiles(key).default || componentsFiles(key));
});
export default components;
