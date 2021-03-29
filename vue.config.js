const path = require("path");

const ip = "121.36.18.182";

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 2989,
    https: false,
    proxy: {
      "/api": {
        //代理字段设置
        target: `http://${ip}:7788/`, //填写后台接口
        ws: true,
        changOrigin: true, //设置允许跨域
        pathRewrite: {
          "^/api": "", //除去代理字段
        },
      },
    },
  }, //网关配置
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "学生成绩检测平台"; //设置标题
      return args;
    });
    config.resolve.alias.set("@", resolve("./src")); //设置路径别名
  },
};
