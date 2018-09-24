const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
	title:{
  		type:String
  	},
	order:{
		type:Number,
		default:0
	},
	content:{
		type:String
	},
	intr:{
		type:String
	},
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Category'
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'new'
	},   
	click:{
		type:Number,
		default:0
	},
	createdAt:{
		type:Date,
		default:Date.now
	} 
});




const ArticleModel = mongoose.model('article',  ArticleSchema);

module.exports =  ArticleModel;