const Router = require('express').Router;

const router = Router();


const userModel = require('../model/user.js');
const orderModel = require('../model/order.js');
const productModel = require('../model/product.js');
const list = require('../model/list.js');


const hmac = require('../util/crypto.js');

// router.get('/creat',(req,res)=>{
// 	var arr = [];
// 	for (var i = 0; i < 100; i++) {
// 		arr.push({
// 			username:'test'+[i],
// 			password:hmac('test'),
// 			phone:'145623451'+[i],
// 		})
// 	}
// 	userModel.insertMany(arr)
// 	.then(()=>{
// 		res.end('ok')
// 	})
// })

router.post('/login',(req,res)=>{
	var result={
		status:0,
		messages:''
	};
	let body = req.body;

	userModel
	.findOne({username:body.username,password:hmac(body.password)})
	.then((data)=>{  
		if (data) {
			req.session.userInfo = {
			 	_id:data._id,
			 	username:data.username,
			 	isAdmin:data.isAdmin
			}
			result.messages='登录成功';
			result.data=data;
			res.json(result);
		}else{
			result.status=10;
			result.messages='用户名或密码错误';
			res.json(result);
		}
	})
})
router.get('/logout',(req,res)=>{
	let result  = {
		status:0,// 0 代表成功 
		message:''
	}	
	// req.cookies.set('userInfo',null);
	req.session.destroy();

	res.json(result);

})
router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next()
	}else{
		res.json({status:10})
	}
})
router.get('/link',(req,res)=>{
	userModel.estimatedDocumentCount((err,userNum)=>{
		orderModel.estimatedDocumentCount((err,orderNum)=>{
			productModel.estimatedDocumentCount((err,productNum)=>{
				res.json({
					status:0,// 0 代表成功 
					userNum:userNum,
					orderNum:orderNum,
					productNum:productNum,
				});
			});
		});
	});	
})

router.get('/mount',(req,res)=>{
	list({
		model: userModel,
		sort: {_id:-1},
		limit:7
	})
	.then((data)=>{
		let result = {
			dataSource:data.data,
			current:1,
			defaultCurrent:1,
			total:data.total,
			pageSize:7,
		}	
		res.json(result);		
	})	
})
router.get('/page',(req,res)=>{
	let page = req.query.page*1;
	list({
		page:page,
		model: userModel,
		sort: {_id:-1},
		limit:7
	})
	.then((data)=>{
		let result = {
			dataSource:data.data,
			current:page,
			defaultCurrent:1,
			total:data.total,
			pageSize:7,
		}	
		res.json(result);		
	})	
})
module.exports = router;