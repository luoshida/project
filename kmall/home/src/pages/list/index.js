require('./index.css');
require('pages/common/nav');
require('pages/common/search');
require('util/pagination');

var _util = require('util');
var _product=require('service/product');
var tpl = require('./list.tpl');
var page = {
	listParams:{
		keyword:_util.getParamFromUrl('keyword') || '',
		categoryId:_util.getParamFromUrl('categoryId') || '',
		page:_util.getParamFromUrl('page') || 1,
		orderBy:_util.getParamFromUrl('orderBy') || 'default',
	},
	init:function(){
		this.initPagination();
		this.bindEvent();
		this.loadProductList();
	},
	initPagination:function(){
		var _this=this;
		$('.pagination-box').on('page-change',function(e,value){
			_this.listParams.page=value;
			_this.loadProductList();
		})
		$('.pagination-box').pagination();
	},
	bindEvent:function(){
		var _this = this;
		$('.list-sort li').on('click',function(){
			var $this=$(this);
			if ($this.hasClass('sort-default')) {
				if ($this.hasClass('active')) {
					return;
				}
				$this.addClass('active')
				.siblings()
				.removeClass('active');
				_this.listParams.orderBy = 'default';
					
			}
			else if($this.hasClass('sort-price')){
				$this.addClass('active')
				.siblings()
				.removeClass('active');
				if (!$this.hasClass('asc')) {
					$this.addClass('asc')
					.removeClass('desc');
					_this.listParams.orderBy = 'price-asc';					
				}else{
					$this.addClass('desc')
					.removeClass('asc');
					_this.listParams.orderBy = 'price-desc';
				}
			}
			_this.listParams.page=1;
			_this.loadProductList();
		});	
	},
	loadProductList:function(){
		this.listParams.categoryId
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId)
		// console.log(this.listParams);
		$('.product-list').html("<div class='loading'></div>");
		_product.getProductList(this.listParams,function(data){
			// console.log(data);
			for (var i = 0; i < data.data.length; i++) {
				 data.data[i].mainImg=data.data[i].loadImg.split(',')[0]
			}
			
			var html = _util.render(tpl,{list:data.data});
			$('.product-list').html(html);

			$('.pagination-box').pagination('render',{
				current:data.page,
				total:data.total,
				pageSize:data.pages
			})
		},function(err){
			// console.log(err);
		})
	}
}

$(function(){
	page.init();
})