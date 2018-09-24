  const mongoose = require('mongoose');

  const BlogSchema = new mongoose.Schema({
      content:String,
      color:String
  });

  
  const blogModel = mongoose.model('new',BlogSchema);

  module.exports = blogModel;