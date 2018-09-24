require('./index.css');
var _user = require('service/user');
var _util = require('util');
var _cart = require('service/cart');

var nav={
	init:function(){
		this.bindEvent();
		this.loadUsername();
		this.loadCartNum();
		return this;
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(message){
				_util.showErrorMsg(message);
			})
		})
	},
	loadUsername:function(){
		_user.getUsername(function(user){
			$('.user-load').hide();
			$('.user-loaded').show().find('.username')
			.text(user.username);
		});
	},
	loadCartNum:function(){
		_cart.getCartNum(function(cartNum){
			$('#cart-total').html(cartNum || 0);
		},function(num){
			$('#cart-total').html(0);
		})
	}

}
module.exports=nav.init();