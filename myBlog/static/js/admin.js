(function($){
	$('.logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get',
			dataType:'json'
		}).done((data)=>{
			// window.location.reload();
			window.location.href='/';
		})
	})

	$('.btn-repass').on('click',function(){
		var $passWord = $('#repass').find('[name="password"]').val();		
		var $repassWord = $('#repass').find('[name="repassword"]').val();
		
		// console.log($userName);
		var errMessage = '';
		if (!/\d{3,10}/.test($passWord)) {
			$('.help-block1').html('密码请输入3-10位字符');
			return false
		} else if ($passWord != $repassWord) {
			$('.help-block1').html('');
			$('.help-block2').html('两次密码不一致');
			return false
		}
	})
})(jQuery)