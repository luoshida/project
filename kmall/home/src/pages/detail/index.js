require('./index.css');
require('pages/common/nav');
require('pages/common/search');
var _product=require('service/product');
var _util = require('util');

var _cart = require('service/cart');
var tpl = require('./index.tpl');
var page = {
	params:{
		productId:_util.getParamFromUrl('caregoryId') || ''
	},
	init:function(){
		this.onload();	

	},
	onload:function(){
		if (this.params.productId) {
			this.loadDetail();	
		}
		this.bindEvent();
	
	},
	bindEvent:function(){
		var _this=this;
		$('.detail-box').on('mouseenter','.img-list-item',function(){
			var $this=$(this);
			$this.addClass('active')
			.siblings().removeClass('active');
			var imgMain =$this.find('img').attr('src');
			$('.detail-box .img-main img').attr('src',imgMain);
		})
		$('.detail-box').on('click','.count-btn span',function(){
			var $this=$(this);
			
			var $input=$('#product-number');
			var stock=_this.stock;
			var min=1;
			var current=parseInt($input.val());
			if ($this.hasClass('plus')) {
				$input.val(current>=stock ? stock : current+1)
			}else if($this.hasClass('minus')){
				$input.val(current>min ? current-1 : min)
			}
			
		})
		$('.detail-box').on('click','#addCart-btn',function(){
			var data={
				productId:_this.params.productId,
				number:$('#product-number').val(),
			}
			// console.log(data);
			_cart.addCart(data,function(data){
				// console.log(data);
				window.location.href='./result.html?type=addCart'
			},function(err){
				
			})
		})
	},
	loadDetail:function(){
		var _this=this;
		$('.detail-box').html("<div class='loading'></div>");
		_product.getProductDetail({productId:this.params.productId},function(product){
			
			product.imgMain=product.loadImg.split(',')[0];
			product.loadImg=product.loadImg.split(',');
			_this.stock=product.stock;
			
			var html=_util.render(tpl,product);
			$('.detail-box').html(html);
		},function(msg){
			_util.showErrorMsg(msg)
		})
	},
}

$(function(){
	page.init();
})