require('./index.css');
require('pages/common/nav');
var _side = require('pages/common/side');
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
var page= {
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		_side.render('user-update-password');
	},
	bindEvent:function(){
		var _this=this;
		$('#user-update-btn').on('click',function(){
			_this.submit()
		})
	},
	submit:function(){
		var formDate={
			password:$.trim($('[name="password"]').val()),
			rePassword:$.trim($('[name="rePassword"]').val()),
		};
		var validateResult = this.validate(formDate);
		// console.log(validateResult);
		if (validateResult.status) {
			formErr.hide();
			_user.updatePassword(formDate,function(data){
				window.location.href='./result.html?type=updatePassword'
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
		if (!_util.validate(formDate.password,'require')) {
			result.msg='密码不能为空';
			return result;
		}
		if (!_util.validate(formDate.password,'password')) {
			result.msg='密码格式错误';
			return result;
		}
		if (formDate.password != formDate.rePassword) {
			result.msg='两次密码不一致';
			return result;
		}
		result.status=true;
		return result;
	}

}
$(function(){
	page.init();
})
