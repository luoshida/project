const mongoose = require('mongoose');
const productModel = require('./product.js');

const CartItemSchema = new mongoose.Schema({
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product' 
  },
  price:Number,
  number:{
    type:Number,
    default:1
  },
  isSelect:{
    type:Boolean,
    default:true
  }
});

const CartSchema = new mongoose.Schema({
  cartList:[CartItemSchema],
  allSelect:{
    type:Boolean,
    default:false,
  },
  allPrice:{type:Number,default:0}
});

const AddressSchema = new mongoose.Schema({
  address:String,
  province:String,
  city:String,
  name:String,
  phone:String,
  zip:String,
});

  const UserSchema = new mongoose.Schema({
      username:String,
      password:String,
      isAdmin:{
      	type:Boolean,
      	default:false
      },
      phone:{
        type:String
      },
      email:String,
      cart:CartSchema,
      addressList:[AddressSchema]
  },{
    timestamps:true
  });

  UserSchema.methods.getCart=function(){
    
    return new Promise((resolve,reject)=>{
      
        if (!this.cart) {
            resolve({
              cartList:[]
            });
        }
        let getCartItem = this.cart.cartList.map(cartItem=>{
          return productModel.findById(cartItem.product)
            .then((product)=>{
                cartItem.product=product;
                cartItem.price=product.price*cartItem.number;
                return cartItem;
            })
        })

        Promise.all(getCartItem)
        .then(cartItems=>{
          var allPrice=0;
          cartItems.forEach(item=>{
            if (item.isSelect) {
               allPrice+=item.price*1
            }
           
          });
          this.cart.cartList=cartItems;
          this.cart.allPrice=allPrice;

          let hasNotCheckedItem=cartItems.find((item)=>{
            return item.isSelect==false;
          })
          if (hasNotCheckedItem) {
            this.cart.allSelect=false;
          }else{
            this.cart.allSelect=true;
          }
          resolve(this.cart);
        })
    })
  };

  UserSchema.methods.getOrderCartList=function(){
    
    return new Promise((resolve,reject)=>{
      
        if (!this.cart) {
            resolve({
              cartList:[]
            });
        };
        let newCartItem=this.cart.cartList.filter(item=>{
          return item.isSelect==true;
        });
        let getCartItem = newCartItem.map(cartItem=>{
          return productModel.findById(cartItem.product)
            .then((product)=>{
                cartItem.product=product;
                cartItem.price=product.price*cartItem.number;
                return cartItem;
            })
        });

        Promise.all(getCartItem)
        .then(cartItems=>{
          var allPrice=0;
          cartItems.forEach(item=>{
            if (item.isSelect) {
               allPrice+=item.price*1
            }
          });
          this.cart.cartList=cartItems;
          this.cart.allPrice=allPrice;

          resolve(this.cart);
        })
    })
  };

  const userModel = mongoose.model('user',UserSchema);

  module.exports = userModel;