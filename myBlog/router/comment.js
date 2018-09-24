const Router = require('express').Router;
let swig = require('swig');
const router = Router();

const commentModel = require('../model/comment.js');
const list = require('../model/list.js');

router.post('/add',(req,res)=>{
	let obj = req.body;

	new commentModel({
		  article:obj.id,
		  user:req.userInfo._id,
		  content:obj.content,
	})
	.save()
	.then(()=>{
		list({
			query:{article:obj.id},
			model:commentModel,
			sort:{_id:-1},
			populate:[
				{path:'article'},
				{path:'user',selected:'username'}
			]
		})
		.then(comments=>{
			// console.log('54464546',comments);
			res.json({
				userInfo:req.userInfo,
				code:1,
				comments:comments.data,
				page:comments.page,
				list:comments.list,
				pages:comments.pages
			})
		})

		
	})
});


module.exports = router;