require('./index.css');
require('pages/common/logo');
require('pages/common/foot');
var _util = require('util');

$(function(){
	var type = _util.getParamFromUrl('type');
	if (type=='payment') {
		var orderNo=_util.getParamFromUrl('orderNo');
		var href=$('.order-detail').attr('href');
		var newHref=href+orderNo;
		$('.order-detail').attr('href',newHref)
	}
	// console.log(type);
	$('.'+type).show();
})