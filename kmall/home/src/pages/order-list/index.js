require('./index.css');
require('pages/common/nav');
require('util/pagination');
var _side = require('pages/common/side');
var _order = require('service/order')
var tpl = require('./content.tpl');
var _util = require('util');
var page= {
	params:{
		page:_util.getParamFromUrl('page') || 1
	},
	init:function(){
		this.onload();
		this.initPagination();
		this.loadOrder();
	},
	onload:function(){
		_side.render('order-list');
	},
	loadOrder:function(){
		var _this=this;
		_order.getOrder({page:this.params.page},function(order){
			// console.log(order);
			order.order.forEach(item=>{
				item.createdTime=new Date(item.createdAt).toLocaleString();
				item.productList.forEach(itemList=>{
					itemList.loadImg=itemList.loadImg.split(',')[0];
				})
			})

			var html = _util.render(tpl,order);
			$('.order-list').html(html);

			$('.pagination-box').pagination('render',{
				current:order.page,
				total:order.total,
				pageSize:order.pages
			})
			
		},function(){
			$('.order-list').html("<p class='errorMsg'>订单数据获取失败</p>");
		})
	},
	initPagination:function(order){
		var _this=this;
		$('.pagination-box').on('page-change',function(e,value){
			_this.params.page=value;
			_this.loadOrder();
		})
		$('.pagination-box').pagination();
	},
}
$(function(){
	page.init();
})