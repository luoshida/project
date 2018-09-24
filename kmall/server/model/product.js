
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:{
  	type:String
  },
  price:{
  	type:Number
  },
  order:{
  	type:Number,
    default:0
  },
  status:{
    type:Number,
    default:0
  },
  stock:Number,
  int:String,
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  detailContent:String,
  loadImg:String,
},{
    timestamps:true
  });

 
const productModel = mongoose.model('Product', ProductSchema);

module.exports = productModel;