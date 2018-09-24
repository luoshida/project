const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//单独对css文件打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode:'development',

  entry: {main:'./src/index.js'},  

  output: {
    filename: 'bundle.js',
    publicPath:'/',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      'pages': path.resolve(__dirname, "./src/pages"),
      'util': path.resolve(__dirname, "./src/util"),
      'api': path.resolve(__dirname, "./src/api"),
      'layout': path.resolve(__dirname, "./src/common/layout"),
      'common': path.resolve(__dirname, "./src/common"),
      // 注意： 静态资源通过src，不能这么设置。
      // "@assets": path.join(__dirname, "..", "src", "assets"),
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [ 'style-loader','css-loader']
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader"
        ] 
      },
      {
        test:/\.(png|jpg|gif)$/,
        use:['url-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: { 
          loader: 'babel-loader',
          options: {
            //配置ES6扩展 babel
            presets: ['env','es2015','react','stage-3'],
            //antd按需加载
            plugins: [
              ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
            ]
          }
        }
      }
    ]
  },

  plugins:[
  	new HtmlWebpackPlugin({
	  	template:'./src/index.html',
	  	filename:'index.html',
	  	title:'test'
	  }),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({})
  ],

  devServer:{
  	contentBase:'./dist',
    port:3001,
    historyApiFallback:true
  }
};