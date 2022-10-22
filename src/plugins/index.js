// 此文件用于'main.js'一次性导入所有plugins模块，一般情况下不要修改！！！
const pluginsFiles = require.context(".", false, /\.js$/);
const plugins = {};
pluginsFiles.keys().forEach(key => {
  if (key === "./index.js") { return; };
  plugins[key.replace(/(\.\/|\.js)/g, "")] = (pluginsFiles(key).default || pluginsFiles(key));
});
export default plugins;
