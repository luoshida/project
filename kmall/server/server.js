const express = require('express');

const mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookies = require('cookies');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


mongoose.connect('mongodb://localhost:27017/kmall', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error',(err)=>{
	throw err;
});
db.once('open',()=>{
	console.log('connect ok ing...')
});

const app = express();
app.use(function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Credentials', true);
  res.append('Access-Control-Allow-Headers', 'Content-Type,Content-Length,X-File-Name,Authorization,Accept,X-Requested-With,yourHeaderFeild');
  res.append('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method=='OPTIONS') {
    res.send('ok')
  }else{
    next();
  }
});


app.use(express.static('public'));


app.use(session({
	 //设置cookie名称
   	name:'kmall',
    //用它来对session cookie签名，防止篡改
    secret:'abcdefg',
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
  // console.log(req.userInfo );
	next();	
})
// 处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//处理路由
app.use('/admin',require('./router/admin.js'));
app.use('/user',require('./router/user.js'));
app.use('/cart',require('./router/cart.js'));
app.use('/product',require('./router/product.js'));
app.use('/addcategory',require('./router/category.js'));
app.use('/order',require('./router/order.js'));
app.use('/payment',require('./router/payment.js'));




app.listen(3000, function(){
	console.log("server running in 3000");
})