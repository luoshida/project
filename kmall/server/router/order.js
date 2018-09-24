const Router = require('express').Router;
 
const router = Router();
const userModel = require('../model/user.js');
const orderModel = require('../model/order.js');
const list = require('../model/list.js');

router.use((req,res,next)=>{
	if (req.userInfo._id) {
		next();
	}else{
		res.json({
			status:10
		})
	}
})

router.get('/mount',(req,res)=>{
	list({
		model:orderModel,
		sort:{_id:-1},
		page:req.query.page,
		limit:2,
	})
	.then(order=>{
		// console.log(order);
		res.json({
			dataSource:order.data,
			current:order.page,
			defaultCurrent:1,
			total:order.total,
			pageSize:order.pages,
		})	
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'获取订单商品失败'
		})
	})
})

router.get('/search',(req,res)=>{
	let page=req.query.page;
	let keyword=req.query.keyword;
	list({
		query:{orderNo:{$regex:new RegExp(keyword,'i')}},
		model: orderModel,
		sort: {_id:-1},
		limit:2,
		page:page
	})
	.then((order)=>{
		res.json({
			dataSource:order.data,
			current:order.page,
			defaultCurrent:1,
			total:order.total,
			pageSize:order.pages,
			keyword:keyword
		});		
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'获取订单商品失败'
		})
	})
})
router.get('/mountDetail',(req,res)=>{
	orderModel.findOne({orderNo:req.query.orderNo})
	.then(order=>{
		// console.log(order);
		res.json({
			status:0,
			order:order
		})	
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'获取订单商品失败'
		})
	})
})
router.put('/deliver',(req,res)=>{
	orderModel.findOneAndUpdate(
		{orderNo:req.body.orderNo},
		{status:40,statusDesc:"已发货"},
		{new:true})
	.then(order=>{
		// console.log(order);
		res.json({
			status:0,
			order:order
		})	
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'发货失败'
		})
	})
})
router.get('/home/getOrderList',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		user.getOrderCartList()
		.then(cart=>{
			res.json({
				status:0,
				data:cart
			})
		})	
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'获取订单商品失败'
		})
	})
})
router.get('/getOrder',(req,res)=>{
	list({
		model:orderModel,
		query:{user:req.userInfo._id},
		page:req.query.page,
		limit:2,
		sort:{_id:-1}
	})
	.then(order=>{
		res.json({
			status:0,
			data:{
				order:order.data,
				page:order.page,
				total:order.total,
				pages:order.pages,
			}
		})
			
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'获取订单失败'
		})
	})
})
router.get('/home/getOrderDetail',(req,res)=>{
	orderModel.findOne({orderNo:req.query.orderNo,user:req.userInfo._id})
	.then(order=>{
		res.json({
			status:0,
			data:order
		})		
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'获取订单详情失败'
		})
	})
})
router.get('/cancellOrder',(req,res)=>{
	orderModel.findOneAndUpdate({orderNo:req.query.orderNo,user:req.userInfo._id},{
		status:"20",statusDesc:"取消"
	},{new:true})
	.then(order=>{
		res.json({
			status:0,
			data:order
		})		
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'获取订单详情失败'
		})
	})
})
router.get('/getAddress',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		res.json({
			status:0,
			data:user.addressList
		})
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'添加地址失败'
		})
	})

})
router.post('/addAddress',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.addressList.length) {
			user.addressList.push(req.body)
		}else{
			user.addressList=[req.body]
		}
		user.save()
		.then(newUser=>{
			res.json({
				status:0,
				data:user.addressList
			})
		})
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'添加地址失败'
		})
	})

})
router.put('/deleteAddress',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		user.addressList.id(req.body.addressId).remove();
		user.save()
		.then(newUser=>{
			res.json({
				status:0,
				data:user.addressList
			})
		})
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'删除地址失败'
		})
	})
})
router.put('/editAddress',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		res.json({
			status:0,
			data:user.addressList.id(req.body.addressId)
		})
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'删除地址失败'
		})
	})
})
router.post('/editAddress',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		var item=user.addressList.id(req.body.addressId);
		item.name=req.body.name;
		item.address=req.body.address;
		item.province=req.body.province;
		item.city=req.body.city;
		item.phone=req.body.phone;
		item.zip=req.body.zip;
		user.save()
		.then(newUser=>{
			res.json({
				status:0,
				data:user.addressList
			})
		})
		
	})
	.catch(e=>{
		res.json({
			status:1,
			messages:'删除地址失败'
		})
	})

})


router.post('/createOrder',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		let order={};
		user.getOrderCartList()
		.then(result=>{
			order.payment=result.allPrice;
			let productList=[];
			result.cartList.forEach(item=>{
				productList.push({
					productId:item.product._id,
					number:item.number,
					allPrice:item.price,
					price:item.product.price,
					loadImg:item.product.loadImg,
					name:item.product.name
				})
			})
			order.productList=productList;
			let address=user.addressList.id(req.body.addressId);
			order.address={
				addressId:address._id,
				address:address.address,
				province:address.province,
				city:address.city,
				name:address.name,
				phone:address.phone,
				zip:address.zip,
			}
			order.orderNo=Date.now().toString()+parseInt(Math.random()*10000);
			order.user=user._id;
			new orderModel(order)
			.save()
			.then(newOrder=>{
				userModel.findById(req.userInfo._id)
				.then(userUser=>{
					var cartItem=userUser.cart.cartList.filter((item)=>{
						return item.isSelect==false
					});
					userUser.cart.cartList=cartItem;
					userUser.save()
					.then(newUser=>{
						res.json({
							status:0,
							data:newOrder
						})
					})
				})
				
			})
		})
	})
})

module.exports = router;