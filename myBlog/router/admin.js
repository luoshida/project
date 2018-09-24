const Router = require('express').Router;
let swig = require('swig');
const router = Router();

const mongooseModel = require('../model/mongooseModel.js');
const wishModel = require('../model/mongooseModel.js');
const categoryModel = require('../model/category.js');
const commentModel = require('../model/comment.js');
const resourceModel = require('../model/resource.js');

const list = require('../model/list.js');
const multer = require('multer');
const upload = multer({ dest: 'static/uploads/' });
const fs = require('fs');
const path = require('path');
const hmac = require('../util/crypto.js');

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next();
	}else{
		res.send('请用管理员账户登录')
	}
})
router.get('/',(req,res)=>{
	
	let page = req.query.page;
	
	list({page:page,model:wishModel,sort:{_id:-1}})
	.then((options)=>{
		res.render('admin/index',{
		 	data:options.data,
		 	page:options.page,
		 	list:options.list,
			pages:options.pages
		})
	})
			
});
router.get('/list1',(req,res)=>{
	categoryModel.find({})
	.sort({order:1})
	.then((data)=>{
		res.render('admin/list1',{
		 	data:data,
		 	userInfo:req.userInfo,	
		})
	})		
});
router.get('/list1-ctl1',(req,res)=>{
	categoryModel.find()
	.then((data)=>{
		res.render('admin/list1-ctl1',{
		 	data:data,
		 	userInfo:req.userInfo,	
		})
	})		
});
router.get('/list1-ctl2',(req,res)=>{
	var obj = req.query;
	categoryModel.findById(obj.id)
	.then((data)=>{
		res.render('admin/list1-ctl2',{
			id:obj.id,
		 	data:data,
		 	userInfo:req.userInfo,	
		})
	})		
});
router.get('/list3',(req,res)=>{
	list({
		page:req.query.page,
		model:commentModel,
		sort:{_id:-1},
		populate:[
			{path:'article'},
			{path:'user',selected:'username'}
		]		
	})
	.then((options)=>{
		res.render('admin/list3',{
			data:options.data,
		 	page:options.page,
		 	list:options.list,
			pages:options.pages,
		 	userInfo:req.userInfo,
		})
	})		
});

router.get('/list4',(req,res)=>{	
	list({
		page:req.query.page,
		model:resourceModel,
		sort:{_id:-1},
		populate:[]		
	})
	.then((options)=>{
		res.render('admin/list4',{
			data:options.data,
		 	page:options.page,
		 	list:options.list,
			pages:options.pages,
		 	userInfo:req.userInfo,
		})
	})		
});
//显示站点管理页面
router.get("/list5",(req,res)=>{
	let filePath = path.normalize(__dirname + '/../site-info.json');
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let site = JSON.parse(data);
			res.render('admin/list5',{
					userInfo:req.userInfo,
					site:site
			});	
		}else{
			console.log(err)
		}
	})
 
})
//处理修改网站配置请求
router.post("/list5",(req,res)=>{
	let obj = req.body;
	// console.log(obj);
	var carouseles=[];
	if (typeof obj.carouselUrl == 'object') {
		for (var i = 0; i < obj.carouselUrl.length; i++) {
			carouseles.push({
				url:obj.carouselUrl[i],
				path:obj.carouselPath[i]
			})
		}
	}else{
		carouseles.push({
			url:obj.carouselUrl,
			path:obj.carouselPath
		})
	}

	var ads = [];
	if (typeof obj.adUrl == 'object') {
		for (var i = 0; i < obj.adUrl.length; i++) {
			ads.push({
				url:obj.adUrl[i],
				path:obj.adPath[i]
			})
		}
	}else{
		ads.push({
			url:obj.adUrl,
			path:obj.adPath 
		})
	}
	
	
	var author = {
		name:obj.authorName,
		intro:obj.authorIntro,
		image:obj.authorImage,
		wechat:obj.authorWechat
	}
	let site={
		name:obj.name,
		carouseles:carouseles,
		ads:ads,
		author:author,
		icp:obj.icp
	}
	
	let siteStr = JSON.stringify(site);

	fs.writeFile(__dirname+'/../site-info.json',siteStr,(err)=>{
		if(!err){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'修改站点成功',
				url:'/admin/list5'
			})					
		}else{
	 		res.render('admin/error',{
				userInfo:req.userInfo,
				message:'修改站点失败,数据库操作失败'
			})					
		}
	})
})


router.post("/add",(req,res)=>{
	let body = req.body;
	console.log('body::',body)
	categoryModel
	.findOne({name:body.name})
	.then((cate)=>{
		if(cate){//已经存在渲染错误页面
	 		res.render('admin/error',{
				userInfo:req.userInfo,
				message:'新增分类失败,已有同名分类'
			})
		}else{
			new categoryModel({
				name:body.name,
				order:body.order
			})
			.save()
			.then((newCate)=>{
				if(newCate){//新增成功,渲染成功页面
					res.render('admin/success',{
						userInfo:req.userInfo,
						message:'新增分类成功',
						
					})
				}
			})
			.catch((e)=>{//新增失败,渲染错误页面
		 		res.render('admin/error',{
					userInfo:req.userInfo,
					message:'新增分类失败,数据库操作失败'
				})
			})
		}
	})
})
router.post("/edit",(req,res)=>{
	let body = req.body;
	console.log('body::',body)
	categoryModel.findById(body.id)
	.then((category)=>{
		if(category.name == body.name && category.order == body.order){
	 		res.render('admin/error',{
				userInfo:req.userInfo,
				message:'请修改数据后提交'
			})				
		}else{
			categoryModel.findOne({name:body.name,_id:{$ne:body.id}})
			.then((newCategory)=>{
				if(newCategory){
			 		res.render('admin/error',{
						userInfo:req.userInfo,
						message:'编辑分类失败,已有同名分类'
					})						
				}else{
					categoryModel.update({_id:body.id},{name:body.name,order:body.order},(err,raw)=>{
						if(!err){
							res.render('admin/success',{
								userInfo:req.userInfo,
								message:'修改分类成功',
								url:'/admin/list1'
							})					
						}else{
					 		res.render('admin/error',{
								userInfo:req.userInfo,
								message:'修改分类失败,数据库操作失败'
							})					
						}
					})					
				}
			})
		}
	})
})
router.get('/delete',(req,res)=>{
	let obj = req.query;
	console.log(obj);
	categoryModel.remove({_id:obj.id})
	.then((dat)=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除成功',
			url:'/admin/list1'
		})
	})
	
			
});

router.post('/uploadImg',upload.single('upload'),(req,res)=>{
	let path = "/uploads/"+req.file.filename;
	res.json({
		uploaded:true,
        url:path
	})
})


router.get('/rePassword',(req,res)=>{
	res.render('admin/rePassword',{
		userInfo:req.userInfo,
	})		
});
router.post('/rePassword',(req,res)=>{
	var obj = req.body;	
	// console.log(req.userInfo._id);
	// console.log(obj.password);
	mongooseModel.findByIdAndUpdate(req.userInfo._id,{password:hmac(obj.password)})
	.then((data)=>{
		req.session.destroy();
		res.render('admin/success',{
			message:'成功',
			url:'/'
		})
	})
	.catch((err)=>{
		res.render('admin/error',{
			message:'失败',
		})
	})
});
module.exports = router;