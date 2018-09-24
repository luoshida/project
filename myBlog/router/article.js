const Router = require('express').Router;
let swig = require('swig');
const router = Router();
const categoryModel = require('../model/category.js');
const articleModel = require('../model/article.js');
const list = require('../model/list.js');

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next();
	}else{
		res.send('请用管理员账户登录')
	}
})
router.get('/',(req,res)=>{		
	articleModel.find({})
	.populate('category')
	.populate('user')
	.then((data)=>{
		res.render('admin/list2',{
			userInfo:req.userInfo,
			data:data,	
		})
	})			
});

router.get('/add',(req,res)=>{
	categoryModel.find({})
	.then((categorys)=>{
		res.render('admin/article-update',{
			userInfo:req.userInfo,
			categorys:categorys,
		})
	})
})
router.post('/add',(req,res)=>{
	var obj = req.body;
	// console.log(req.userInfo);
	new articleModel({
		title:obj.title,
		intr:obj.intr,
		content:obj.content,
		category:obj.category,
		user:req.userInfo._id,
	})
	.save()
	.then((data)=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'新增文章成功',
			url:'/article'
		})
	})
	.catch((err)=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'新增文章失败',
		})
	})
	
})
router.get('/edit',(req,res)=>{
	var id = req.query.id
	categoryModel.find({})
	.then((categorys)=>{
		articleModel.findOne({_id:id})
		.then((data)=>{
			res.render('admin/article-update',{
				userInfo:req.userInfo,
				data:data,
				categorys:categorys
			})
		})
	})
	
})
router.post('/edit',(req,res)=>{
	var obj = req.body;
	let result = {
		content:obj.content,
		title:obj.title,
		intr:obj.intr,
		category:obj.category
	}
	articleModel.update({_id:obj.id},result,(err,data)=>{
		if(!err){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'修改文章成功',
				url:'/article'
			})				
		}else{
	 		res.render('admin/error',{
				userInfo:req.userInfo,
				message:'修改文章失败,数据库操作失败'
			})				
		}
	})
})
router.get('/delete',(req,res)=>{
	let id = req.query.id;
	articleModel.remove({_id:id},(err,raw)=>{
		if(!err){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'删除文章成功',
				url:'/article'
			})				
		}else{
	 		res.render('admin/error',{
				userInfo:req.userInfo,
				message:'删除文章失败,数据库操作失败'
			})				
		}		
	})
})

module.exports = router;