let updatePage = function(){

}
(function($){
	$.fn.extend({
		updatePage:function(){
			var self = $(this);
			$(this).on('click','a',function(){
				var page = 1;
				let $this = $(this);
				var current = self.find(".active a").html();
				if ($this.attr('aria-label') == 'Next') {
					page = current * 1 + 1;
				} else if ($this.attr('aria-label') == 'Previous'){
					page = current * 1 - 1;
				} else {
					page = $this.html();
				}
				console.log(page);
				$.ajax({
					url:'/getPage?page='+page,
					type:'get',
					dataType:'json'
				})
				.done((data)=>{
					if(data.code == 1){
						// console.log(data);
						$('#articles').html(changeArt(data));
						$('#page').html(changePage(data));
					}		
				})
			}


		}
	})
})(jQuery)
$('#page').on('click','a',function(){
		console.log(this);
		var page = 1; 
		let $this = $(this);
		var current = $('#page').find(".active a").html();
		if ($this.attr('aria-label') == 'Next') {
			page = current * 1 + 1;
		} else if ($this.attr('aria-label') == 'Previous'){
			page = current * 1 - 1;
		} else {
			page = $this.html();
		}
		console.log(page);
		$.ajax({
			url:'/getPage?page='+page,
			type:'get',
			dataType:'json'
		})
		.done((data)=>{
			if(data.code == 1){
				// console.log(data);
				$('#articles').html(changeArt(data));
				$('#page').html(changePage(data));
			}		
		})
	})