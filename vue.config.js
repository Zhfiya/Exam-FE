const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {}, //网关配置
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "学生成绩检测平台"; //设置标题
      return args;
    });
    config.resolve.alias.set("@", resolve("./src")); //设置路径别名
  },
};
