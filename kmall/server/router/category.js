const Router = require('express').Router;
let swig = require('swig');
const router = Router();
const categoryModel = require('../model/category.js');

const list = require('../model/list.js');

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next();
	}else{
		res.send({
			status:10
		})
	}
})
router.post('/',(req,res)=>{
	let body = req.body;
	categoryModel.findOne({name:body.name,pid:body.pid},(err,data)=>{
		if (!err) {
			if (data) {
				res.json({
					status:10,
					message:'添加失败，已有该分类'
				});
			}else{
				new categoryModel({
					name:body.name,
					pid:body.pid
				}).save((err,doc)=>{
					if (!err) {
						categoryModel.find({pid:body.pid})
						.then((result)=>{
							res.json({
								status:0,
								data:result
							});
						})
						
					} else{
						res.json({
							status:10,
							message:'添加失败'
						});
					}
				})
			}
		}		
	});	
})

router.get('/',(req,res)=>{
	
	let pid = req.query.pid;
	categoryModel.find({pid:pid},(err,data)=>{
		// console.log(data);
		if (!err) {
			res.json({
				status:0,
				data:data
			});	
		}		
	});	
})

router.get('/mount',(req,res)=>{
	let page = req.query.page;
	let pid = req.query.pid;
	list({
		query:{pid:pid},
		page:page,
		model: categoryModel,
		sort: {order:-1},
		limit:3
	})
	.then((data)=>{
		let result = {
			dataSource:data.data,
			current:page*1,
			defaultCurrent:1,
			total:data.total,
			pageSize:3,
			visible:false
		}	
		res.json(result);		
	})
})
router.get('/saleMount',(req,res)=>{
	let page = req.query.page;
	let pid = req.query.pid;
	list({
		query:{pid:pid},
		page:page,
		model: categoryModel,
		sort: {order:-1},
	})
	.then((data)=>{
		let result = {
			dataSource:data.data,
			current:page*1,
			defaultCurrent:1,
			total:data.total,
			pageSize:3,
			visible:false
		}	
		res.json(result);		
	})
})
router.get('/updateName',(req,res)=>{
	let name = req.query.name;
	let pid = req.query.pid;
	let id = req.query.id;
	let page = req.query.page;
	categoryModel.findOne({name:name,pid:pid})
	.then((data)=>{
		if (data) {
			res.json({status:1,messages:'名称重复，请重新输入'})
		}else{
			categoryModel.update({_id:id},{name:name})
			.then((result)=>{
				list({
					query:{pid:pid},
					page:page,
					model: categoryModel,
					sort: {order:-1},
					limit:3
				})
				.then((data)=>{
					let result = {
						dataSource:data.data,
						current:page*1,
						defaultCurrent:1,
						total:data.total,
						pageSize:3,
						visible:false,
						messages:'更新成功'
					}	
					res.json(result);		
				})
			})
		}
	})	
})

router.get('/updateOrder',(req,res)=>{
	let order = req.query.order;
	let pid = req.query.pid;
	let id = req.query.id;
	let page = req.query.page;
	
	categoryModel.update({_id:id},{order:order})
	.then((result)=>{
		list({
			query:{pid:pid},
			page:page,
			model: categoryModel,
			sort: {order:-1},
			limit:3
		})
		.then((data)=>{
			let result = {
				dataSource:data.data,
				current:page*1,
				defaultCurrent:1,
				total:data.total,
				pageSize:3,
				visible:false,
				messages:'更新成功'
			}	
			res.json(result);		
		})
	})
		
	
})


module.exports = router;