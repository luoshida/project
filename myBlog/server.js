const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookies = require('cookies');
const session = require('express-session');
//session持久化保存到mongoDB的工具connect-mongo。
const MongoStore = require('connect-mongo')(session);


mongoose.connect('mongodb://localhost:27017/lsd', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error',(err)=>{
	throw err;
});
db.once('open',()=>{
	console.log('connect ok ing...')
});

const app = express();
// app.use('*',function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

//   if (req.method == 'OPTIONS') {
//     res.send(200);
//   }
//   else {
//     next();
//   }
// });
// 模板
swig.setDefaults({
  cache: false
});
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');

//静态资源

app.use(express.static('static'));

//设置cookies
// app.use((req,res,next)=>{
// 	req.cookies = new cookies(req,res);
// 	req.userInfo = {};
// 	if (req.userInfo) {
// 		try{
// 			req.userInfo = JSON.parse(req.cookies.get('userInfo'));
// 		}catch(e){

// 		}
// 	}
// 	next();
// })
app.use(session({
	 //设置cookie名称
   	name:'blogId',
    //用它来对session cookie签名，防止篡改
    secret:'dsjfkdfd',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //rolling位true的情况下每次请求都会更新cookies过期时间
    rolling:true,
    //cookie过期时间 一天  单位毫秒
    cookie:{maxAge:1000*60*60*24},
    //将session存储在数据库中
    store:new MongoStore({mongooseConnection:mongoose.connection})
}))
app.use((req,res,next)=>{

	req.userInfo  = req.session.userInfo || {};

	next();	
})
// 处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//处理路由
app.use('/',require('./router/index.js'));
app.use('/user',require('./router/user.js'));
app.use('/admin',require('./router/admin.js'));
app.use('/home',require('./router/home.js'));
app.use('/article',require('./router/article.js'));
app.use('/comment',require('./router/comment.js'));
app.use('/resource',require('./router/resource.js'));


app.listen(3000, function(){
	console.log("server running in 3000");
})