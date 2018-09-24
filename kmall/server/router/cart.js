const Router = require('express').Router;
let swig = require('swig');
const hmac = require('../util/crypto.js');
const router = Router();
const userModel = require('../model/user.js');
const list = require('../model/list.js');

router.get('/getCartNum',(req,res)=>{
	if (req.userInfo._id) {
		userModel.findById(req.userInfo._id)
		.then(user=>{
			if (user.cart) {
				var totalNum=0;
				user.cart.cartList.forEach(item=>{
					totalNum+=item.number
				})
				res.json({
					status:0,
					data:totalNum
				})
			}else{ 
				res.json({
					status:0,
					data:0
				})
			}
		})		
	}else{
		res.json({
			status:0,
			data:0
		})
	}
})
//权限控制
router.use((req,res,next)=>{
	if (req.userInfo._id) {
		next();
	}else{
		res.json({
			status:10
		})
	}
})

router.post('/addCart',(req,res)=>{
	var body = req.body;
	// console.log(body);
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.cart) {
			var cartItem=user.cart.cartList.find((item)=>{
				return item.product==body.productId
			})
			if (cartItem) {
				cartItem.number=cartItem.number+parseInt(body.number)
			}else{
				user.cart.cartList.push({
					product:body.productId,
					number:body.number
				})
			}
		}else{
			user.cart = {
				cartList:[
					{
						product:body.productId,
						number:body.number
					}
				]
			}
		}
		user.save()
		.then(newUser=>{
			// console.log(user);
			res.json({
				status:0,
				data:{messages:'添加购物车成功'}
			})
		})
	})	
})

router.get('/addCart',(req,res)=>{
	
	userModel.findById(req.userInfo._id)
	.then(user=>{
		// console.log(user);
		user.getCart()
		.then(newUser=>{
			res.json({
				status:0,
				data:newUser
			})
		})
		.catch((err)=>{
			console.log(err)
		})
	})
})
router.put('/selectOne',(req,res)=>{
	var body = req.body;
	
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.cart) {
			var cartItem=user.cart.cartList.find((item)=>{
				return item.product==body.productId
			})
			if (cartItem) {
				cartItem.isSelect=true
			}else{
				res.json({
					status:1,
					messages:'购物车记录不存在'
				})
			}
		}else{
			res.json({
				status:1,
				messages:'购物车不存在'
			})
		}
		user.save()
		.then(newUser=>{
			newUser.getCart()
			.then(cart=>{
				res.json({
					status:0,
					data:cart
				})
			})
		})
	})	
})
router.put('/unselectOne',(req,res)=>{
	var body = req.body;
	
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.cart) {
			var cartItem=user.cart.cartList.find((item)=>{
				return item.product==body.productId
			})
			if (cartItem) {
				cartItem.isSelect=false
			}else{
				res.json({
					status:1,
					messages:'购物车记录不存在'
				})
			}
		}else{
			res.json({
				status:1,
				messages:'购物车不存在'
			})
		}
		user.save()
		.then(newUser=>{
			newUser.getCart()
			.then(cart=>{
				res.json({
					status:0,
					data:cart
				})
			})
		})
	})	
})
router.put('/selectAll',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.cart) {
			user.cart.cartList.forEach(item=>{
				item.isSelect=true;
			})
			
		}else{
			res.json({
				status:1,
				messages:'购物车不存在'
			})
		}
		user.save()
		.then(newUser=>{
			newUser.getCart()
			.then(cart=>{
				res.json({
					status:0,
					data:cart
				})
			})
		})
	})	
})
router.put('/unselectAll',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.cart) {
			user.cart.cartList.forEach(item=>{
				item.isSelect=false;
			})
			
		}else{
			res.json({
				status:1,
				messages:'购物车不存在'
			})
		}
		user.save()
		.then(newUser=>{
			newUser.getCart()
			.then(cart=>{
				res.json({
					status:0,
					data:cart
				})
			})
		})
	})
})

router.put('/cancellCart',(req,res)=>{
	var body = req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.cart) {
			var cartItem=user.cart.cartList.filter((item)=>{
				return item.product != body.productId
			});
			user.cart.cartList=cartItem;
		}else{
			res.json({
				status:1,
				messages:'购物车不存在'
			})
		}
		user.save()
		.then(newUser=>{
			newUser.getCart()
			.then(cart=>{
				res.json({
					status:0,
					data:cart
				})
			})
		})
	})	
})
router.put('/cancellSelectCart',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.cart) {
			var cartItem=user.cart.cartList.filter((item)=>{
				return item.isSelect==false
			});
			user.cart.cartList=cartItem;
		}else{
			res.json({
				status:1,
				messages:'购物车不存在'
			})
		}
		user.save()
		.then(newUser=>{
			newUser.getCart()
			.then(cart=>{
				res.json({
					status:0,
					data:cart
				})
			})
		})
	})	
})
router.put('/modifyCartNum',(req,res)=>{
	var body = req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if (user.cart) {
			user.cart.cartList.forEach(item=>{
				if (item.product==body.productId) {
					item.number=body.number
				}
			})
		}else{
			res.json({
				status:1,
				messages:'购物车不存在'
			})
		}
		user.save()
		.then(newUser=>{
			newUser.getCart()
			.then(cart=>{
				res.json({
					status:0,
					data:cart
				})
			})
		})
	})	
})

router.get('/getOrderList',(req,res)=>{
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
})

module.exports = router;