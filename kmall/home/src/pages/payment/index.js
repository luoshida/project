require('./index.css');
require('pages/common/nav');
require('pages/common/logo');


var _util=require('util');
var tpl = require('./content.tpl');
var _payment=require('service/payment');
var page= {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || ''
	},
	init:function(){
		this.onload();
	},
	onload:function(){
		if (this.params.orderNo) {
			this.loadPaymentDetail();
		}
	},
	loadPaymentDetail:function(){
		var _this=this;
		_payment.getPaymentInfo({orderNo:this.params.orderNo},function(payment){
			var html = _util.render(tpl,payment);
			$('.payment-box').html(html);
			_this.listenPaymentStatus();
		},function(){
			$('.payment-box').html("<p class='errorMsg'>支付信息获取失败</p>");
		})
	},
	listenPaymentStatus:function(){
		var _this = this;
		window.setInterval(function(){
			_payment.getPaymentStatus({orderNo:_this.params.orderNo},function(result){
				if (result==true) {
					window.location.href="./result.html?type=payment&orderNo="+_this.params.orderNo
				}
			})
		},5000)
	}
	
}
$(function(){
	page.init();
})