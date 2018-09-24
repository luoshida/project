const Router = require('express').Router;
let swig = require('swig');
const router = Router();
const categoryModel = require('../model/category.js');
const articleModel = require('../model/article.js');
const mongooseModel = require('../model/mongooseModel.js');
const list = require('../model/list.js');
const commentModel = require('../model/comment.js');
const hmac = require('../util/crypto.js');


router.get('/',(req,res)=>{
	var page;
	if (req.query.page) {
		page = req.query.page
	}else{
		page=1
	}
	list({
		page:page,
		query:{user:req.userInfo._id.toString()},
		model:commentModel,
		sort:{_id:-1},
		populate:['article']
	})
	.then((options)=>{
		res.render('home/index',{
			userInfo:req.userInfo,
			comments:options.data,	
			page:options.page,
			list:options.list,
			pages:options.pages
		})
	})
	
});

router.get('/rePass',(req,res)=>{
	res.render('home/rePassword',{
		userInfo:req.userInfo,
	})		
});
router.post('/rePass',(req,res)=>{
	var obj = req.body;	
	mongooseModel.findByIdAndUpdate(req.userInfo._id,{password:hmac(obj.password)})
	.then((data)=>{
		req.session.destroy();
		res.render('home/success',{
			message:'成功',
			url:'/'
		})
	})
});

module.exports = router;