require('./index.css');

require('pages/common/search');
require('pages/common/nav');
var _util = require('util');

var productTpl = require('./product.tpl');
var shoppingTpl = require('./shopping.tpl');
var _order =require('service/order');
var _model=require('./model.js');

var page= {
	data:{
		addressId:null
	},
	init:function(){
		this.$shopping=$('.shopping-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShoppingList();
		this.loadProductList();
	},
	loadShoppingList:function(){
		var _this=this;
		_order.getAddress(function(address){
			_this.renderShopping(address);
		},function(){
			this.$shopping.html("<p class='errorMsg'>地址数据获取失败</p>")
		})
		
	},
	bindEvent:function(){
		var _this=this;
		this.$shopping.on('click','.shopping-add',function(){
			_model.show({
				success:_this.renderShopping.bind(_this)
			});
		})
		this.$shopping.on('click','.cancell',function(e){
			e.stopPropagation();
			var addressId=$(this).parents('.shopping-footer').data('address-id')
			if (window.confirm('确定删除吗')) {
				_order.deleteAddress({addressId:addressId},function(address){
					_this.renderShopping(address);
				},function(){
					this.$shopping.html("<p class='errorMsg'>地址数据获取失败</p>");
				})
			}
		})
		this.$shopping.on('click','.edit',function(e){
			e.stopPropagation();
			var addressId=$(this).parents('.shopping-footer').data('address-id')
			
			_order.editAddress({addressId:addressId},function(address){
				// console.log(address);
				_model.show({
					edit:address,
					success:_this.renderShopping.bind(_this)
				});
			},function(){
				this.$shopping.html("<p class='errorMsg'>编辑失败</p>");
			})
			
		})
		this.$shopping.on('click','.shopping-item',function(e){
			$(this).addClass('active').siblings().removeClass('active');
			_this.data.addressId=$(this).find('.shopping-footer').data('address-id');
		})
		$('.product-box').on('click','.submit-btn',function(e){
			if (_this.data.addressId) {
				_order.createOrder({addressId:_this.data.addressId},function(order){
					// console.log(order);
					window.location.href='./payment.html?orderNo='+order.orderNo
				},function(){
					alert('添加订单失败')
				})
			}else{
				alert('请选择地址')
			}
		})
	},
	renderShopping:function(address){
		var _this=this;
		// console.log(_this);
		address.forEach(function(addr){
			// console.log(_this.data.addressId);
			if (addr._id==_this.data.addressId) {
				addr.isActive=true;
			}
		})
		// console.log('index',address);
		var html = _util.render(shoppingTpl,{address:address});

		$('.shopping-box').html(html);
	},
	loadProductList:function(){
		_order.getOrderList(function(cart){
			cart.cartList.forEach(item=>{
				if (item.product.loadImg) {
					item.product.loadImg=item.product.loadImg.split(',')[0]
				}
			})
			cart.notEmpty = !!cart.cartList.length;
			// console.log(cart);
			var html = _util.render(productTpl,cart);
			$('.product-box').html(html);
		},function(){
			$('.product-box').html("<p class='errorMsg'>购物车数据获取失败</p>");
		});

		
	},
}
$(function(){
	page.init();
})