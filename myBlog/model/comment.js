
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  article:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'article'
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'new'
  },  
  content:{
    type:String,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }   
});


const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;