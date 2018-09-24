  const mongoose = require('mongoose');

  const BlogSchema = new mongoose.Schema({
	    name:{
	  		type:String
		},
		path:{
			type:String
		},
	});

  
  const blogModel = mongoose.model('Resource',BlogSchema);

  module.exports = blogModel;