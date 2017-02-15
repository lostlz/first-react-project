//webpack中的配置
var webpack = require('webpack');

module.exports = {
  entry: {
    index:"./src/index.js"//入口文件
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: 'bundle_[name].js'//打包后输出文件的文件名
  },

  module: {//在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'//添加对样式表的处理
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          "env": {
            "development": {
              "plugins": [["react-transform", {
                "transforms": [{
                  "transform": "react-transform-hmr",

                  "imports": ["react"],

                  "locals": ["module"]
                }]
              }]]
            }
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],

  devServer: {
    contentBase: "./public",//设定webpack-dev-server的director根目录
    historyApiFallback: true,
    inline: true,
    open: true,//启动命令，自动打开浏览器
    hot: true//热替换
  }
}