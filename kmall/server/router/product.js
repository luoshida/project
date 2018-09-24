const Router = require('express').Router;
const router = Router();
const multer = require('multer');
const path = require('path');
const productModel = require('../model/product.js');
const list = require('../model/list.js');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
         cb(null, 'public/product-img/')//保存的路径
    },
    filename: function (req, file, cb) {
         cb(null, Date.now()+path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next();
	}else{
		res.send({
			status:10
		})
	}
})

router.post('/uploadImg',upload.single('file'),(req,res)=>{
	let path ='http://127.0.0.1:3000/product-img/'+req.file.filename;
	res.json(path)
})

router.post('/uploadDetailImg',upload.single('upload'),(req,res)=>{
	let path ='http://127.0.0.1:3000/product-img/'+req.file.filename;
	res.json({
	  "success": true,
	  "msg": "上传成功",
	  "file_path": path
	})
})
router.post('/add',(req,res)=>{
	let body = req.body;
	new productModel({
		name:body.name,
		price:body.price,
		stock:body.stock,
		int:body.int,
		category:body.SecendListId,
		detailContent:body.detailContent,
		loadImg:body.loadImg,
	})
	.save((err,doc)=>{
		if (!err) {
			res.json({
				status:0,
				data:doc,
				messages:'添加成功'
			});
		} else{
			res.json({
				status:1,
				messages:'添加失败'
			});
		}
	})					
});
router.put('/add',(req,res)=>{
	let body = req.body;
	// console.log(body);
	let update={
		name:body.name,
		price:body.price,
		stock:body.stock,
		int:body.int,
		category:body.SecendListId,
		detailContent:body.detailContent,
		loadImg:body.loadImg,
	}
	productModel.update({_id:body.id},update)
	.then((doc)=>{
		res.json({
			status:0,
			data:doc,
			messages:'添加成功'
		});
	})							
});
router.get('/mount',(req,res)=>{
	// console.log(page);
	let page=req.query.page
	list({
		model: productModel,
		sort: {order:-1},
		limit:3,
		page:page
	})
	.then((data)=>{
		let result = {
			dataSource:data.data,
			current:page,
			defaultCurrent:1,
			total:data.total,
			pageSize:3,
		}	
		res.json(result);		
	})				
});
router.get('/search',(req,res)=>{
	let page=req.query.page;
	let keyword=req.query.keyword;
	// console.log(keyword);
	list({
		query:{name:{$regex:new RegExp(keyword,'i')}},
		model: productModel,
		sort: {order:-1},
		limit:3,
		page:page
	})
	.then((data)=>{
		let result = {
			dataSource:data.data,
			current:page,
			defaultCurrent:1,
			total:data.total,
			pageSize:3,
			keyword:keyword
		}	
		res.json(result);		
	})				
});
router.get('/updateOrder',(req,res)=>{
	let order = req.query.order;
	let id = req.query.id;
	let page = req.query.page;
	
	productModel.update({_id:id},{order:order})
	.then((result)=>{
		list({
			page:page,
			model: productModel,
			sort: {order:-1},
			limit:3
		})
		.then((data)=>{
			let result = {
				dataSource:data.data,
				current:page,
				defaultCurrent:1,
				total:data.total,
				pageSize:3,
				messages:'更新成功'
			}	
			res.json(result);		
		})
	})	
})
router.get('/updateStatus',(req,res)=>{
	let id = req.query.id;
	let status = req.query.status;
	
	productModel.update({_id:id},{status:status})
	.then((result)=>{	
		res.json({
			status:0,
			messages:'更新成功'
		});		
		
	})	
})

router.get('/getEdit',(req,res)=>{
	let id = req.query.id;
	productModel.findById(id)
	.populate('category','_id pid')
	.then((product)=>{	
		res.json({
			status:0,
			data:product
		});		
	})
	.catch((err)=>{
		res.json({
			status:1,
			messages:'获取失败，服务器错误'
		});	
	})	
})
module.exports = router;