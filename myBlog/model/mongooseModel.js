  const mongoose = require('mongoose');

  const BlogSchema = new mongoose.Schema({
      username:String,
      password:String,
      isAdmin:{
      	type:Boolean,
      	default:false
      }
  });

  
  const blogModel = mongoose.model('new',BlogSchema);

  module.exports = blogModel;