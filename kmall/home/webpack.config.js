const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

//单独对css文件打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ShowHtmlWebpack=(name,title)=>({
      template:'./src/view/'+name+'.html',
      filename:name+'.html',
      title:title,
      chunks:['common',name]
})

module.exports = {
  mode:'development',

  entry: {
    //入口js文件的名字和对应的路径
    'common':'./src/pages/common/index.js',
    'list':'./src/pages/list/index.js',
    'index':'./src/pages/index/index.js',
    'detail':'./src/pages/detail/index.js',
    'user-login':'./src/pages/user-login/index.js',
    'user-register':'./src/pages/user-register/index.js',
    'user-center':'./src/pages/user-center/index.js',
    'order-list':'./src/pages/order-list/index.js',
    'user-update-password':'./src/pages/user-update-password/index.js',
    'order-confirm':'./src/pages/order-confirm/index.js',
    'order-detail':'./src/pages/order-detail/index.js',
    'cart':'./src/pages/cart/index.js',
    'payment':'./src/pages/payment/index.js',
    'result':'./src/pages/result/index.js',
   
  },  
  //引入额外的模块
  // externals: {
  //  jquery: "window.jQuery",
  // },
  output: {
    //[name]为entry入口文件的前缀名(index,login)
    //输出的js为js文件夹下的index.js,login.js
    filename: 'js/[name].js',
    publicPath:'/',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      pages: path.resolve(__dirname, "./src/pages"),
      image: path.resolve(__dirname, "./src/images"),
      util: path.resolve(__dirname, "./src/util"),
      service: path.resolve(__dirname, "./src/service"),
      node_modules: path.resolve(__dirname, "./node_modules"),
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        //加载css 的配置文件
        // use: [ 'style-loader','css-loader']

        //单独打包css文件的配置
        use: [ 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          "css-loader"
        ] 
      },
      {
        //加载图片的配置文件
        test: /\.(png|jpg|gif|ttf|woff2|woff|eot|svg)\??.*$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:100,//图片大小限制 大于该值会以base64位显示
            name:'resource/[name].[ext]'//打包后的文件存储路径
          }
        }] 
      },
      {
//安装react react-dom
//安装 babel npm i babel-core babel-loader babel-preset-env babel-preset-react --save-dev
//添加webpack配置loader
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: { 
          loader: 'babel-loader',
          options: {
            //配置ES6扩展 babel
            presets: ['env','es2015','react','stage-3'],
          }
        }
      },
      {
        test: /\.tpl$/,
        use: { 
          loader: 'html-loader',
        }
      }
    ]
  },

  plugins:[
  	// new HtmlWebpackPlugin({
   //    //入口html的路径
	  // 	template:'./src/view/index.html',
   //    //输出HTML的名字
	  // 	filename:'index.html',
   //    //引用js的名字
        // inject:'head'//脚本写在那个标签里,默认是true(在body结束后)
        // hash:true//给生成的js/css文件添加一个唯一的hash
	  // 	chunks:['common','index']
	  // }),
   //  new HtmlWebpackPlugin({
   //    template:'./src/view/user-login.html',
   //    filename:'user-login.html',
   //    chunks:['common','user-login']
   //  }),
    new HtmlWebpackPlugin(ShowHtmlWebpack('index','首页')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('detail','商品详情')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('list','商品列表')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('user-login','用户登录')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('user-register','用户注册')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('result','操作结果')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('user-center','用户中心')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('order-list','订单中心')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('user-update-password','密码修改')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('cart','购物车')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('order-confirm','订单确认')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('order-detail','订单详情')),
    new HtmlWebpackPlugin(ShowHtmlWebpack('payment','支付订单')),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  devServer:{
//webpack-dev-server提供了一个简单的基于node express的web服务器,能够实时重新加载页面
  	contentBase:'./dist',
    //启用的端口
    port:3002,
    proxy:{
      "/user":{
        target:'http://127.0.0.1:3000',
        changeOrigin:true
      },
      "/cart":{
        target:'http://127.0.0.1:3000',
        changeOrigin:true
      },
      "/order":{
        target:'http://127.0.0.1:3000',
        changeOrigin:true
      },
      "/payment":{
        target:'http://127.0.0.1:3000',
        changeOrigin:true
      }
    }
  },
};