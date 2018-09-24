require('./index.css');
require('pages/common/nav');
require('pages/common/search');

var _util = require('util');
var keywordTpl = require('./keyword.tpl');
var carouselTpl = require('./carousel.tpl');
var floorTpl = require('./floor.tpl');
require('util/carousel');
var page = {
	keyword:[
		{item:[{name:'折扣'},{name:'低价每日抢'}]},
		{item:[{name:'大牌'},{name:'红旗'}]},
		{item:[{name:'女装'},{name:'连衣裙'}]},
		{item:[{name:'男装'},{name:'卫衣'},{name:'鞋子'}]},
		{item:[{name:'数码'},{name:'手机'},{name:'iPhone'}]},
		{item:[{name:'母婴'},{name:'奶粉辅食'}]},
		{item:[{name:'家居'},{name:'整理收纳'}]},
		{item:[{name:'美食'},{name:'各地特产'}]},
		{item:[{name:'美妆'},{name:'精致妆容'}]},
		{item:[{name:'箱包'},{name:'行李箱'}]}
	],
	carousel:[
		{categoryId:'1111',image:require('image/a1.jpg')},
		{categoryId:'2222',image:require('image/a2.jpg')},
		{categoryId:'3333',image:require('image/a3.jpg')},
	],
	floor:[
		{
			title:'F1 手机',
			item:[
				{itemName:'红米1',image:require('image/floor/f1.jpg')},
				{itemName:'红米2',image:require('image/floor/f2.jpg')},
				{itemName:'红米3',image:require('image/floor/f3.jpg')},
				{itemName:'红米4',image:require('image/floor/f4.jpg')},
				{itemName:'红米5',image:require('image/floor/f5.jpg')},
			]
		},
		{
			title:'F2 家电',
			item:[
				{itemName:'手机',image:require('image/floor/f6.jpg')},
				{itemName:'手机',image:require('image/floor/f7.jpg')},
				{itemName:'手机',image:require('image/floor/f6.jpg')},
				{itemName:'手机',image:require('image/floor/f7.jpg')},
				{itemName:'手机',image:require('image/floor/f6.jpg')},
			]
		},
		{
			title:'F3 智能',
			item:[
				{itemName:'手机',image:require('image/floor/f4.jpg')},
				{itemName:'手机',image:require('image/floor/f5.jpg')},
				{itemName:'手机',image:require('image/floor/f1.jpg')},
				{itemName:'手机',image:require('image/floor/f2.jpg')},
				{itemName:'手机',image:require('image/floor/f4.jpg')},
			]
		},
	],
	init:function(){
		this.loadKeyword();
		this.loadCarousel();
		this.loadFloor();
	},
	loadKeyword:function(){
		var html = _util.render(keywordTpl,{
			keyword:this.keyword
		});
		$(".keyword").html(html)
	},
	loadCarousel:function(){
		var html = _util.render(carouselTpl,{
			carousel:this.carousel
		});
		$(".carousel").html(html);
		var $unslider = $('.carousel').unslider({
		 	speed: 500, 
		 	delay: 3000,
		 	dots:true,
		})
		$('.arrow').on('click',function(){
			let direction = $(this).hasClass('next') ? 'next' : 'prev';
			$unslider.data('unslider')[direction]();
		})
	},
	loadFloor:function(){
		var html = _util.render(floorTpl,{
			floor:this.floor
		});
		$(".floor-wrap").html(html);
	}
}

$(function(){
	page.init();
})


