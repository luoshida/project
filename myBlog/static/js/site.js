/*
* @Author: TomChen
* @Date:   2018-08-07 15:05:21
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-13 16:48:16
*/
(function($){
	// $.each($('.btn-remove'),function(index,value){
		// 	$(value).on('click',function(){
		//    	$(value).siblings().remove();
		//  })
	// })
	
	$('.btn-remove').on('click',function(){
		$(this).parent().remove();
	})   
	$('.btn-add').on('click',function(){
		$(this).before($(this).siblings().eq(0).clone())
	})  
})(jQuery);