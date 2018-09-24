const Router = require('express').Router;
const path = require('path');
const router = Router();
const fs = require('fs');
const resourceModel = require('../model/resource.js');
const list = require('../model/list.js');

//处理图片请求的配置
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/resource/')
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
		res.send('请用管理员账户登录')
	}
})
router.get('/list4-add',(req,res)=>{	
	list({
		page:req.query.page,
		model:resourceModel, 
		sort:{_id:-1},
		populate:[]		
	})
	.then((options)=>{
		res.render('admin/list4-add',{
			data:options.data,
		 	page:options.page,
		 	list:options.list,
			pages:options.pages,
		 	userInfo:req.userInfo,
		})
	})		
});
router.get('/list4-del',(req,res)=>{	
	let id = req.query.id;
	resourceModel.findByIdAndRemove(id)
	.then(data=>{
		let filePath = path.normalize(__dirname+'/../static/'+data.path);
		fs.unlink(filePath,(err)=>{
			if(!err){
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:'删除资源成功',
					url:'/admin/list4'
				})					
			}else{
				res.render('admin/error',{
					userInfo:req.userInfo,
					message:'删除资源失败,删除文件错误',
				})					
			}
		})

	})
	.catch(e=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'删除资源失败,删除数据库记录错误',
		})			
	})		
});
router.post('/add',upload.single('file'),(req,res)=>{
	// console.log(req.body);
	// console.log(req.file);
	new resourceModel({
		name:req.body.resName,
		path:'/resource/'+req.file.filename,
	})
	.save()
	.then(resource=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'新增文章成功',
			url:'/admin/list4'
		})
	})
})
module.exports = router;