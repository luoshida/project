require('./index.css');
var _util =require('util');
var tpl = require('./index.tpl');
(function($){
	function Pagination($elem){
		this.$elem=$elem;
		this.bindEvent();
	}
	Pagination.prototype={
		construction:Pagination,
		bindEvent:function(){
			var _this=this;
			this.$elem.on('click','.page-item',function(){
				_this.$elem.trigger('page-change',[$(this).data('value')])
			})
		},
		render:function(options){
			var start=options.current-options.range >1 
			? options.current-options.range
			: 1
			var end=options.pageSize-options.current >options.range
			? options.pageSize-options.current
			: options.pageSize

			var xxx=[];
			if (options.current-1<1) {
				xxx.push({
					name:'上一页',
					dataValue:1,
					disable:true
				})
			}else{
				xxx.push({
					name:'上一页',
					dataValue:options.current-1
				})
			}
			
			for (var i = start; i < end*1+1; i++) {
				if (i==options.current) {
					xxx.push({
						name:i,
						dataValue:i,
						active:true
					})
				}else{
					xxx.push({
						name:i,
						dataValue:i
					})
				}
				
			}

			if (options.pageSize-options.current<1) {
				xxx.push({
					name:'下一页',
					dataValue:options.pageSize,
					disable:true
				})
			}else{
				xxx.push({
					name:'下一页',
					dataValue:options.current+1
				})
			}
			
			var html = _util.render(tpl,{pagination:xxx});
			this.$elem.html(html);
		},

	};
	Pagination.Default={
		current:1,
		total:1,
		pageSize:1,
		range:3
	};
	$.fn.extend({
		pagination:function(fn,options){
			return this.each(function(){
				var $this= $(this);
				var pagination=$this.data('pagination');
				if (!pagination) {
					pagination=new Pagination($this);
					$this.data('pagination',pagination);
				}
				if (typeof pagination[fn]=='function') {
					options=$.extend({},Pagination.Default,options);
					pagination[fn](options)
				}
			})
		}
	})
})(window.jQuery)