const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 压缩, 抽离css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env) => {
  console.log(env)
  return {
    entry: {
      index: "./src/main.js",
    }, // 入口文件
    output: {
      filename: "js/[name].bundle.js",
      // path: path.resolve(__dirname, "./dist"),
      clean: true,
    },
    devtool: "source-map",
    mode: env.production ? 'production' : 'development',
    devServer: {
      // 开启本地服务
      static: "./dist",
      hot: true, // 热更新
      liveReload: true,
    },
    module: {
      // 配置资源文件
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        },
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
          exclude: /node_modules/, // 不处理该文件夹下的js文件
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                // 为了解决 Uncaught ReferenceError: regeneratorRuntime is not defined 的错误
                ["@babel/plugin-transform-runtime"],
              ],
            },
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        // splitChunks
        cacheGroups: {
          // 缓存
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },

        chunks: "all", // 分割代码
      },
      minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
        inject: "body",
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[contenthash].css",
      }),
      new VueLoaderPlugin(),
    ],
  };
};
