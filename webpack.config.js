const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 压缩, 抽离css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/main.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  mode: "production",
  devServer: {
    // 开启本地服务
    static: "./dist",
  },
  module: {
    // 配置资源文件
    rules: [
      {
        // font
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.jpg/,
        type: "asset", // 会根据的默认规则来使用 resource 或inline
        parser: {
          // 自定义规则
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.png/,
        type: "asset/resource", // 默认的规则
      },
      {
        test: /\.svg/,
        type: "asset/inline", // 转化为base64
      },
      /** 使用loader */
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        // 配置babel
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              // 为了解决 Uncaught ReferenceError: regeneratorRuntime is not defined 的错误
              [
                "@babel/plugin-transform-runtime",
                {
                  "absoluteRuntime": false,
                  "corejs": false,
                  "helpers": true,
                  "regenerator": true,
                  "version": "7.0.0-beta.0"
                }
              ]
            ]
          },
          
        },
      },
    ],
  },
  optimization: { minimizer: [new CssMinimizerPlugin()] },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[contenthash].css",
    }),
  ],
};
