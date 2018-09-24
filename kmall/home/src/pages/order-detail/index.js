require('./index.css');
require('pages/common/nav');
require('util/pagination');
var _side = require('pages/common/side');
var _order = require('service/order')
var tpl = require('./content.tpl');
var _util = require('util');
var page= {
	init:function(){
		this.onload();
		this.loadOrder();
		this.bindEvent();
	},
	onload:function(){
		_side.render('order-list');
	},
	loadOrder:function(){
		var _this=this;
		var orderNo=_util.getParamFromUrl('orderNo');
		_order.getOrderDetail({orderNo:orderNo},function(order){
			
			_this.loadOrderDom(order);
		},function(){
			$('.content').html("<p class='errorMsg'>订单数据获取失败</p>");
		})
	},
	loadOrderDom:function(order){
		console.log(order);
		order.createdTime=new Date(order.createdAt).toLocaleString();
		order.productList.forEach(itemList=>{
			itemList.loadImg=itemList.loadImg.split(',')[0];
		})
		var html = _util.render(tpl,{
			order:order,
			needpay:order.status==10,
			canCancell:order.status ==10,
		});
		$('.content').html(html);
	},
	bindEvent:function(){
		var _this=this;
		$('.content').on('click','.order-cancell',function(){
			if (window.confirm('确定取消订单吗')) {
				var orderId=_util.getParamFromUrl('orderNo');
				_order.cancellOrder({orderNo:orderNo},function(order){
					_this.loadOrderDom(order);
				},function(){
					alert('取消失败，服务器错误')
				})
			}
		})
		
	}
	
}
$(function(){
	page.init();
})