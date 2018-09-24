 let $box = $('.box');
 let $wool = $('.wool');
 
 var getRandom = function(min,max){
 	return Math.round(min+Math.random()*(max-min));
 }
function setFont($elem){
	$elem.pep({constrainTo: '.wool'}); 
	$elem.each(function(){
	 	$(this).css({
			left:getRandom(0,700),
			top:getRandom(0,400),
		})
	})
	$elem.hover(function(){
	    $(this).css({
	        zIndex:999
	    })
	},function(){
	    $(this).css({
	        zIndex:0
	    })
	});
}
setFont($box);

$wool.on('click','.down',function(){
	var $this = $(this);
	var self = this;
	// console.log($this.data('id'));
	$.ajax({
		url:'/wish/'+$this.data('id'),
		
 		dataType:'json',
	})
	.done(function(data){
		if (data.status==1) {
			$(self.parentNode).remove();
		}
 		
	})
})
 $('.btn').on('click',function(){
 	let val = $('.intr').val();
 	$.ajax({
 		url:'/wish',
 		data:{content:val},
 		dataType:'json',
 		type:'POST'
 	})
 	.done(function(data){
 		// console.log(data);
 		if (data.status==1) {
 			var $newElem=$(
 			`<div class="box" style="background-color: ${data.data[0].color}">
			<a href="javascript:;" class="down" data-id="${data.data[0]._id.toString()}"></a>
			${data.data[0].content}
			</div>`);
 			setFont($newElem);
			$wool.append($newElem);
			$('.intr').val('');
 		}
 	})
 })