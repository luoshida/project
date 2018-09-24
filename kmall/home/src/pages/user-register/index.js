require('./index.css');
require('pages/common/logo');
require('util/carousel');
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
		
		$('[name="username"]').on('blur',function(){
			if (!_util.validate($.trim($('[name="username"]').val()),'username')) {
				return;
			} 
			_user.usernameBlur({
				username:$.trim($('[name="username"]').val())
			},function(data){
				formErr.show(data.messages);
			},function(message){
				formErr.hide();
			})
		})
		$('#user-register-btn').on('click',function(){
			_this.submit()
		})
	},
	submit:function(){
		var formDate={
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			rePassword:$.trim($('[name="rePassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val()),
		};
		var validateResult = this.validate(formDate);
		if (validateResult.status) {
			formErr.hide();
			_user.register(formDate,function(data){
				window.location.href='./result.html?type=register'
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
		if (!_util.validate(formDate.rePassword,'require')) {
			result.msg='请再次输入密码';
			return result;
		}
		if (formDate.password != formDate.rePassword) {
			result.msg='两次密码不一致';
			return result;
		}
		if (!_util.validate(formDate.phone,'require')) {
			result.msg='手机号不能为空';
			return result;
		}
		if (!_util.validate(formDate.phone,'phone')) {
			result.msg='手机号不能为空';
			return result;
		}
		if (!_util.validate(formDate.email,'require')) {
			result.msg='邮箱不能为空';
			return result;
		}
		if (!_util.validate(formDate.email,'email')) {
			result.msg='邮箱格式错误';
			return result;
		}
		result.status=true;
		return result;
	}
}
$(function(){
	page.init();
})
