const mongoose = require('mongoose');
const productModel = require('./product.js');

      const ProductSchema = new mongoose.Schema({
        productId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Product' 
        },
        price:Number,
        name:String,
        loadImg:String,
        number:{
          type:Number,
          default:1
        },
        allPrice:{
          type:Number,
          default:0
        }
      });
      const AddressSchema = new mongoose.Schema({
        addressId:String,
        address:String,
        province:String,
        city:String,
        name:String,
        phone:String,
        zip:String,
      });
const OrderSchema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user' 
    },
    orderNo:String,//订单号
    payment:Number,//支付金额
    paymentType:{
      type:String,
      enum:['10','20'],//支付方法10-支付宝 20-微信
      default:'10'
    },
    paymentTypeDesc:{
      type:String,
      enum:['支付宝','微信'],
      default:'支付宝'
    },
    paymentTime:Date,
    status:{
      type:String,
      enum:['10','20','30','40','50'],//10未支付 20取消 30已支付 40已发货 50完成
      default:'10'
    },
    statusDesc:{
      type:String,
      enum:["未支付","取消","已支付","已发货","完成"],
      default:'未支付'
    },
    address:AddressSchema,
    productList:{
      type:[ProductSchema],
      default:[]
    } 
},{
  timestamps:true
});

  const orderModel = mongoose.model('order',OrderSchema);

  module.exports = orderModel;