const Router = require('express').Router;
 
const router = Router();

const orderModel = require('../model/order.js');

router.get('/info',(req,res)=>{
	//然后 根据订单号获取信息 然后调用支付宝接口获取支付二维码
	res.json({
		status:0,
		data:{
			orderNo:req.query.orderNo,
			//模拟返回的支付宝二维码，该二维码应从支付宝获取
			qrUrl:"http://127.0.0.1:3000/alipay-qr/pay.jpg"	
		}

	})
})

router.get('/status',(req,res)=>{
	orderModel .findOne({orderNo:req.query.orderNo},'status')
	.then(order=>{
		res.json({
			status:0,
			data:order.status==30
		})
	})
	
})
module.exports = router;