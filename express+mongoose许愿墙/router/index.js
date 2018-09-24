const Router = require('express').Router;
let swig = require('swig');
const router = Router();
const wishModel = require('../model/wishmongoose.js')

router.get('/',(req,res)=>{
	wishModel.find({},(err,data)=>{
		res.render('wish/index',{data:data})	
	})	
})

module.exports = router;