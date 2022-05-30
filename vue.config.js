const { defineConfig } = require('@vue/cli-service');
const path = require('path');
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 解决H5缓存问题
let filePath = 'js/'; //打包文件存放文件夹路径
let Timestamp = '.' + new Date().getTime();//时间戳
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_BASE_URL || '/',
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("assets", resolve("./src/assets"))
      .set("components", resolve("./src/components"))
      .set("views", resolve("./src/views"));
  },
  devServer: {
    proxy: {
      // 公用代理-portal
      // [process.env.VUE_APP_BASE_API_PORTAL]: {
      //   target: 'https://t133.ebupt.com.cn/',
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API_PORTAL]: '',
      //   },
      // },
      // 公共的静态资源代理
      [process.env.VUE_APP_STATIC_IMGS]: {
        target: "http://10.1.63.203:8050/",
        changeOrigin: true
      }
    },
    allowedHosts: [
      't133.ebupt.com.cn'
    ]
  },
  configureWebpack: config => {
    // 可以省略后缀
    config.resolve.extensions = ['.js', '.vue', '.json'];
    //生产环境去掉vconsole调试器
    let envType = process.env.NODE_ENV != 'prod';
    let pluginsDev = [
      new vConsolePlugin({
        filter: [],
        enable: envType
      })
    ];
    config.optimization = {
      nodeEnv: false
    };

    // 输出重构  打包编译后的 文件名称  【模块名称.时间戳.js】 解决js缓存问题
    config.output.filename = `${filePath}[name]${Timestamp}.js`;
    config.output.chunkFilename = `${filePath}[name]${Timestamp}.js`;
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,//生产环境自动删除debugger
            drop_console: true, //生产环境自动删除console
            pure_funcs: ['console.log']
          },
          warnings: false
        },
        sourceMap: false, //关掉sourcemap 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
        parallel: true //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
      }),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240,// 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
        minRatio: 0.8
      })
    );
    // 开启分离js
    config.optimization = {
      nodeEnv: false,// 解决webpack5不能自定义环境名称问题
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 2000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      }
    };
    config.plugins = [...config.plugins, ...pluginsDev];
  }
});
