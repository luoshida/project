 require('./index.css');
require('pages/common/logo');
var _user = require('service/user');
var _util = require('util');
var formErr={
	show:function(message){
		$('.head-login').hide();
		$('.err').show();
		$('.err span').html(message);
	},
	hide:function(){
		$('.head-login').show();
		$('.err').hide();
	},
}
var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this=this;
		$('#user-load-btn').on('click',function(){
			_this.submit()
		})
	},
	submit:function(){
		var formDate={
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
		};
		var validateResult = this.validate(formDate);
		// console.log(validateResult);
		if (validateResult.status) {
			formErr.hide();
			_user.login(formDate,function(data){
				window.location.href=_util.getParamFromUrl('redirect') || './index.html'
			},function(message){
				
				formErr.show(message);
			});
		}else{
			formErr.show(validateResult.msg);
		}
	},
	validate:function(formDate){
		var result={
			status:false,
			msg:''
		}
		if (!_util.validate(formDate.username,'require')) {
			result.msg='用户名不能为空';
			return result;
		}
		if (!_util.validate(formDate.username,'username')) {
			result.msg='用户名格式错误';
			return result;
		}
		if (!_util.validate(formDate.password,'require')) {
			result.msg='密码不能为空';
			return result;
		}
		if (!_util.validate(formDate.password,'password')) {
			result.msg='密码格式错误';
			return result;
		}
		result.status=true;
		return result;
	}
}
$(function(){
	page.init();
})
