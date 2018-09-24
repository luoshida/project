const Router = require('express').Router;
let swig = require('swig');
const hmac = require('../util/crypto.js');
const router = Router();
const wishModel = require('../model/mongooseModel.js')

router.post('/register',(req,res)=>{
	var result={
		status:0,
		message:''
	}; 
	// console.log(req.body,';;;;');
	let body = req.body;
	wishModel.find({username:body.username},(err,data)=>{
		var result={
			status:0,
			message:''
		};
		// console.log(data);
		if (!err) {
			if (data[0]) {
				result.status=10;
				result.message='用户名已存在';
				res.json(result);
			}else{
				new wishModel({
					username:body.username,
					password:hmac(body.password)
				}).save((err,doc)=>{
					if (!err) {
						result.message='注册成功';
						res.json(result);
					} else{
						res.end('save data error..',err)
					}
				})
			}
		}
		
	});
})

router.post('/Login',(req,res)=>{
	var result={
		status:0,
		message:''
	};
	let body = req.body;
	wishModel.findOne({username:body.username,password:hmac(body.password)},(err,data)=>{
		
		// console.log(data);    
		if (!err) {
			if (data) {
				// result.data={
				// 	_id:data._id,
				// 	username:data.username,
				// 	isAdmin:data.isAdmin
				// }
				// req.cookies.set('userInfo',JSON.stringify(result.data));
				req.session.userInfo = {
				 	_id:data._id,
				 	username:data.username,
				 	isAdmin:data.isAdmin
				}
				res.json(result);
			}else{
				result.status=10;
				result.message='用户名或密码错误';
				res.json(result);
			}
		}
		
	});
})
router.get('/logout',(req,res)=>{
	let result  = {
		code:0,// 0 代表成功 
		message:''
	}	
	// req.cookies.set('userInfo',null);
	req.session.destroy();

	res.json(result);

})


module.exports = router;