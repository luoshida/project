require('./index.css');
require('pages/common/nav');
var _side = require('pages/common/side');
var _user = require('service/user');
var tpl = require('./content.tpl');
var _util = require('util');
var page= {
	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function(){
		_side.render('user-center');
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(userInfo){
			var html = _util.render(tpl,userInfo);
			$('.content').html(html);
		})

	}
}
$(function(){
	page.init();
})