const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body"
    }),
  ]
}