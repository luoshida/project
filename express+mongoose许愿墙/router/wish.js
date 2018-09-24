
const Router = require('express').Router;
const router = Router();
const wishModel = require('../model/wishmongoose.js')


var getRandomColor = function(){
    return  '#' +
    (function(color){
        return (color += '0123456789abcdef'[Math.floor(Math.random()*16)])
        && (color.replace(/^0/,"").length == 6) ?  color : arguments.callee(color);
    })('');
}
router.get('/:id', function(req,res){
	wishModel.remove({_id:req.params.id},(err,data)=>{
		var result = {status:1}
		res.end(JSON.stringify(result));
	})
});

router.post('/', function(req,res){
	// console.log(req.body);
	var obj = req.body;
	obj.color = getRandomColor();
	wishModel.insertMany(obj,(err,data)=>{
		var result = {
			status:1,
			data:data
		};
		res.end(JSON.stringify(result));
	})
});

module.exports = router;