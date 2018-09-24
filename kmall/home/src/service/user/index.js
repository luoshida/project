
var _util = require('util');

var _user = {
	logout: function (success,error) {
		_util.request({
			url:'/user/logout',
			success:success,
			error:error,
		})
	},
	login: function (data,success,error) {
		_util.request({
			url:'/user/login',
			data:data,
			type:'post',
			success:success,
			error:error,
		})
	},
	register: function (data,success,error) {
		_util.request({
			url:'/user/register',
			data:data,
			type:'post',
			success:success,
			error:error,
		})
	},
	getUsername: function(success,error){
		_util.request({
			url:'/user/username',
			success:success,
			error:error,
		})
	},
	getUserInfo: function(success,error){
		_util.request({
			url:'/user/userInfo',
			success:success,
			error:error,
		})
	},
	usernameBlur: function (data,success,error) {
		_util.request({
			url:'/user/blur',
			data:data,
			success:success,
			error:error,
		})
	},
	updatePassword:function(data,success,error){
		_util.request({
			type:'put',
			url:'/user/updatePassword',
			data:data,
			success:success,
			error:error,
		})
	}
}

module.exports = _user;