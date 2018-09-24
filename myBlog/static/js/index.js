$(function(){
	var $form1 = $('.form1');
	var $form2 = $('.form2');
	var $btn1 = $('.form1').find('.btn');
	var $btn2 = $('.form2').find('.btn');
	// console.log($btn);
	$('.switch1').on('click',function(){
		$form1.hide();
		$form2.show();
	})
	$('.switch2').on('click',function(){
		$form2.hide();
		$form1.show();
	})

	$btn1.on('click',function(){

		var $userName = $form1.find('[name="userName"]').val();		
		var $passWord = $form1.find('[name="passWord"]').val();
		// console.log($userName);
		var errMessage = '';
		if (!/^[a-z][a-z|0-9|_]{2,9}$/i.test($userName)) {
			errMessage = '用户名请输入3-10位字符';
		} else if (!/^\w{3,10}$/.test($passWord)) {
			errMessage = '密码请输入3-10位正确字符';
		} 

		if (errMessage) {
			$('.message').html(errMessage);
			return; 
		}else{

			$.ajax({
				url:'/user/Login',
				data:{
					username:$userName,
					password:$passWord
				},
				type:'post',
				dataType:'json'
			})
			.done(function(data){
				// $form1.hide();
				// $('.count').show();
				// $('.countName').html(data.data.username);
				window.location.reload();
			})
		}
	});
	$btn2.on('click',function(){

		var $userName = $form2.find('[name="userName"]').val();		
		var $passWord = $form2.find('[name="passWord"]').val();
		var $repassWord = $form2.find('[name="repassWord"]').val();
		// console.log($userName);
		var errMessage = '';
		if (!/^[a-z][a-z|0-9|_]{2,9}$/i.test($userName)) {
			errMessage = '用户名请输入3-10位字符';
		} else if (!/^\w{3,10}$/.test($passWord)) {
			errMessage = '密码请输入3-10位正确字符';
		} else if ($passWord != $repassWord) {
			errMessage = '两次密码不一致';
		}

		if (errMessage) {
			$('.message').html(errMessage);
			return; 
		}else{

			$.ajax({
				url:'/user/register',
				data:{
					username:$userName,
					password:$passWord
				},
				type:'post',
				dataType:'json'
			})
			.done(function(data){
				 
				$('.switch2').trigger('click');
			})
		}
	});
	$('.logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get',
			dataType:'json'
		}).done((data)=>{
			window.location.reload();
		})
	})

	$('#page').on('click','a',function(){
		// console.log(this);
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
		// console.log(page);
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

	var changeArt =function(obj){
		var html = '';
		for (var i = 0; i < obj.articles.length; i++) {
			html += `
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <a href='/getArt?id=${ obj.articles[i]._id.toString() }' class="panel-title">${ obj.articles[i].title }</a>
				  </div>
				  <div class="panel-body">
				    ${ obj.articles[i].intr }
				  </div>
				  <div class="panel-footer">
				  	<span class="glyphicon glyphicon-user"></span>
				  	<span class="">${ obj.articles[i].user.username }</span>
				  	<span class="glyphicon glyphicon-th-list"></span>
				  	<span class="">${ obj.articles[i].category.name }</span>
				  	<span class="glyphicon glyphicon-time"></span>
				  	<span class="">${  moment(obj.articles[i].createdAt).format('YYYY年MM月DD日 H:mm:ss ') }</span>
				  	<span class="glyphicon glyphicon-eye-open"></span>
				  	<span class="">${ obj.articles[i].click }</span>
				  </div>
				</div>`				
		}
		return html;	
	}
	var changePage =function(obj){
		var html = '';
		html += `
            <ul class="pagination">
	            <li>
	              <a href="javascript:;" aria-label="Previous">
	                <span aria-hidden="true">&laquo;</span>
	              </a>
	            </li>`
	    for (var i = 0; i < obj.list.length; i++) {     
	        if (obj.page == obj.list[i]) {
	        html+=`	<li class="active"><a href="javascript:;"> ${obj.list[i]} </a></li>`
	        } else {
	        html+=`	<li><a href="javascript:;"> ${obj.list[i]} </a></li>`
	        }
	    }  
	    html +=  `
	    		<li>
	              <a href="javascript:;" aria-label="Next">
	                <span aria-hidden="true">&raquo;</span>
	              </a>
	            </li>
          	</ul>` 
	    return html;       
	}

	$('#comment-btn').on('click',function(){
		var commentContent = $('#comment-content').val().trim();

		var artId = $('#article-id').val();
		if (!commentContent) {
			$('.err').html('评论内容不能为空');
			return false;
		}else{
			$('.err').html('');
		}
		
		$.ajax({ 
			url:'/comment/add',
			dataType:'json',
			type:'post',
			data:{id:artId,content:commentContent}
		})
		.done((data)=>{
			// console.log(data);
			window.location.reload();
			if(data.code == 1){
				var html = '';
				for (var i = 0; i < data.comments.length; i++) {
					html+=`
					<div class="panel panel-default">
					  <div class="panel-footer">
					    ${	data.comments[i].user.username }发表于${ moment(data.comments[i].createdAt).format('YYYY年MM月DD日 H:mm:ss') }
					  </div> 
					  <div class="panel-body">${ data.comments[i].content }</div>
					</div>`;
				}
				$('#comment').html(html);
				
			}
		})
		
	})
	$('#comment-page').on('click','a',function(){
		var page = 1; 
		let $this = $(this);
		var current = $('#comment-page').find(".active a").html();
		if ($this.attr('aria-label') == 'Next') {
			page = current * 1 + 1;
		} else if ($this.attr('aria-label') == 'Previous'){
			page = current * 1 - 1;
		} else {
			page = $this.html();
		}
		var id = $('#comment-page').data('id');
		$.ajax({
			url:'/getComment?page='+page+'&id='+id,
			type:'get',
			dataType:'json'
		})
		.done((data)=>{
			if(data.code == 1){
				// console.log(data);
				$('#comment').html(changeComment(data));
				$('#comment-page').html(changePage(data));
			}		
		})
	})
	var changeComment =function(obj){
		var html = '';
		for (var i = 0; i < obj.comments.length; i++) {
			html += `
				<div class="panel panel-default">
			  <div class="panel-footer">
			   ${ obj.comments[i].user.username }发表于 ${ moment(obj.comments[i].createdAt).format('YYYY年MM月DD日 H:mm:ss') }
			  </div>
			  <div class="panel-body">${ obj.comments[i].content }</div>
			</div>`				
		}
		return html;	
	}
})