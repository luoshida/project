require('./index.css');
var _nav = require('pages/common/nav');
require('pages/common/search');
var _product=require('service/product');
var _util = require('util');

var _cart = require('service/cart');
var tpl = require('./index.tpl');
var page = {
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		var _this=this;
		_cart.getCart(function(cart){
			$('.cart-box').html("<div class='loading'></div>");
			_this.renderCart(cart)
		},function(err){
			$('.cart-box').html("<div class='errorMsg'>购物车数据获取失败</div>");
		})	
	},
	configCancell:function(){
		return window.confirm('确认删除购物车信息吗');
	},
	renderCart:function(cart){
		_nav.loadCartNum();
		this.cart=cart;
		cart.cartList.forEach(item=>{
			if (item.product.loadImg) {
				item.product.loadImg=item.product.loadImg.split(',')[0]
			}
		})
		cart.notEmpty = !!cart.cartList.length;
		
		var html = _util.render(tpl,cart);
		$('.cart-box').html(html);
	},
	bindEvent:function(){
		var _this=this;
//选中取消一个
		$('.cart-box').on('click','.select-one',function(){
			var $this = $(this);
			var productId=$this.parents('.head-item').data('product-id');
			// console.log(productId);
			if ($this.is(':checked')) {
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showErrMessage()
				})
			}else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showErrMessage()
				})
			}
		});
//选中取消所有
		$('.cart-box').on('click','.select-all',function(){
			var $this = $(this);
			if ($this.is(':checked')) {
				_cart.selectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showErrMessage()
				})
			}else{
				_cart.unselectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showErrMessage()
				})
			}
		});
//删除一个
		$('.cart-box').on('click','.cancell-cart',function(){
			var $this = $(this);
			var productId=$this.data('product-id');
			if (_this.configCancell()) {
				_cart.cancellCart({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showErrMessage()
				})
			}
		});
//删除选中
		$('.cart-box').on('click','.cancell-select-cart',function(){
			if (_this.configCancell()) {
				_cart.cancellSelectCart(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showErrMessage()
				})
			}
		});
//按钮改变购物车产品数量
		$('.cart-box').on('click','.count-btn span',function(){
			var $this = $(this);
			var stock=$this.parents('.count-btn').data('stock');
			var current=$this.siblings('#product-number').val();
			var productId=$this.parents('.count-btn').data('product-id');
			if ($this.hasClass('plus')) {
				if (current>=stock) {
					alert('库存不足')
				}else{
					current=current*1+1
				}
			}else if ($this.hasClass('minus')) {
				if (current<=1) {
					alert('购买商品数量不能小于0')
				}else{
					current=current*1-1
				}
			}
			_cart.modifyCartNum({productId:productId,number:current},function(cart){
				_this.renderCart(cart)
			},function(msg){
				_this.showErrMessage()
			})
		});
		$('.cart-box').on('click','.submit-btn',function(){
			if (_this.cart && _this.cart.allPrice>0) {
				window.location.href='./order-confirm.html';
			}else{
				_util.showErrorMsg('请选择商品后再提交')
			}
		})

	},
	showErrMessage:function(){
		$('.cart-box').html("<p class='errorMsg'>购物车数据获取失败</p>");
	}

}

$(function(){
	page.init();
})