const Router = require('express').Router;
let swig = require('swig');
const router = Router();
const categoryModel = require('../model/category.js');
const articleModel = require('../model/article.js');
const mongooseModel = require('../model/mongooseModel.js');
const list = require('../model/list.js');
const showindex = require('../model/showindex.js');
const commentModel = require('../model/comment.js');
const hmac = require('../util/crypto.js');

router.get('/',(req,res)=>{
	showindex()
	.then((showIndex)=>{
		list({
			model:articleModel,
			sort:{_id:-1},
			populate:[
				{path:'category',selected:'name'},
				{path:'user',selected:'username'}
			]
		})
		.then((options)=>{
			res.render('main/index',{
				data:showIndex.data,
			 	articles:options.data,
			 	userInfo:req.userInfo,
			 	page:options.page,
			 	list:options.list,
				pages:options.pages,
				click:showIndex.click,
				site:showIndex.site
			})
		})
	})
});
router.get('/universal',(req,res)=>{
	showindex()
	.then((showIndex)=>{
		categoryModel.findOne({name:req.query.name})
		.then((qqq)=>{
			list({
				query:{category:qqq._id.toString()},
				model:articleModel,
				sort:{_id:-1},
				populate:[
					{path:'category',selected:'name'},
					{path:'user',selected:'username'}
				]
			})
			.then((thisName)=>{
				articleModel.find({})
				.sort({click:-1})
				.limit(6)
				.then((click)=>{
					res.render('main/universal',{
						data:showIndex.data,
						click:showIndex.click,
						thisName:thisName.data,
					 	userInfo:req.userInfo,
					 	url:req.query.name,
					 	site:showIndex.site
					})
				})
			})
		})							
	})
});
router.get('/getPage',(req,res)=>{
	list({
		page:req.query.page,
		model:articleModel,
		sort:{_id:-1},
		populate:[
			{path:'category',selected:'name'},
			{path:'user',selected:'username'}
		]
	})
	.then(data=>{
		res.json({
			code:1,
			articles:data.data,
			list:data.list,
			page:data.page
		})
	})
})
router.get('/getComment',(req,res)=>{
	// console.log(req.query);
	list({
		query:{article:req.query.id},
		page:req.query.page,
		model:commentModel,
		sort:{_id:-1},
		populate:[
			{path:'article'},
			{path:'user'}
		]
	})
	.then((data)=>{
		console.log(data.data);
		res.json({
			userInfo:req.userInfo,
			code:1,
			comments:data.data,
			list:data.list,
			page:data.page
		})
	})
})
router.get('/getArt',(req,res)=>{
	showindex()
	.then((showIndex)=>{
		articleModel.update({_id:req.query.id},{$inc:{click:1}})
		.then(()=>{
			articleModel.findOne({_id:req.query.id})
			.populate([
					{path:'category',selected:'name'},
					{path:'user',selected:'username'}
			])
			.then(art=>{
				list({
					query:{article:req.query.id},
					model:commentModel,
					sort:{_id:-1},
					populate:[
						{path:'article'},
						{path:'user',selected:'username'}
					]
				})
				.then((comments)=>{
					console.log('2',comments);
					res.render('main/articles',{
						data:showIndex.data,
						click:showIndex.click,
					 	userInfo:req.userInfo,
						art:art,
						comments:comments.data,
						page:comments.page,
						list:comments.list,
						pages:comments.pages,
						site:showIndex.site
					})
					
				})
				
			})
		})						
	})
	
})


module.exports = router;