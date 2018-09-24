
var Hogan =require('hogan.js');
var _util = {
	request: function (params) {
		var _this = this;
		$.ajax({
			url:params.url || '',
			type:params.type || 'get',
			data:params.data || '',
			dataType:params.dataType || 'json',
			success:function(result){
				if (result.status == 0) {
					params.success && params.success(result.data)
				}else if(result.status==10){
					_this.doLogin();
				}else if(result.status==1){
					params.error && params.error(result.messages)
				}
			},
			error:function(err){
				params.error && params.error(err.statusText)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg);
	},
	render:function(tem,data){
		var template = Hogan.compile(tem);
		var html = template.render(data);
		return html;
	},
	doLogin:function(){
		//执行dologin之前把当前页面地址传给 登录页面；
		window.location.href='./user-login.html?redirect='+encodeURIComponent(window.location.href)
	},
	goHome:function(){
		window.location.href='./';
	},
	getParamFromUrl:function(key){
		var query = window.location.search.substr(1);
		// var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		// var result = query.match(reg);
		 
		var aaa=query.replace(/[&=]/g,',');
		var result = aaa.split(',');
		for (var i = 0; i < result.length; i++) {
			if(result[i]==key){
				// console.log(result[i+1]);
				return decodeURIComponent(result[i+1])
			}
		}
	},
	validate:function(value,type){
		if (type === 'require') {
		 	return !!value;
		}
		if (type === 'username') {
		 	return /^[a-zA-Z0-9_]{3,10}$/.test(value);
		}
		if (type === 'password') {
		 	return /^[a-zA-Z0-9_]{3,10}$/.test(value);
		}
		if (type === 'phone') {
		 	return /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
		}
		if (type === 'email') {
		 	return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
		}
		if (type === 'zip') {
		 	return /\d{6}/.test(value);
		}
	}
}

module.exports = _util;