
var _util = require('util');

var _cart = {
	
	addCart: function (data,success,error) {
		_util.request({
			url:'/cart/addCart',
			type:"post",
			data:data,
			success:success,
			error:error,
		})
	},
	getCart: function (success,error) {
		_util.request({
			url:'/cart/addCart',
			success:success,
			error:error,
		})
	},
	selectOne: function (data,success,error) {
		_util.request({
			url:'/cart/selectOne',
			type:'put',
			data:data,
			success:success,
			error:error,
		})
	},
	unselectOne: function (data,success,error) {
		_util.request({
			url:'/cart/unselectOne',
			type:'put',
			data:data,
			success:success,
			error:error,
		})
	},
	selectAll:function (success,error) {
		_util.request({
			url:'/cart/selectAll',
			type:'put',
			success:success,
			error:error,
		})
	},
	unselectAll:function (success,error) {
		_util.request({
			url:'/cart/unselectAll',
			type:'put',
			success:success,
			error:error,
		})
	},
	cancellCart:function (data,success,error) {
		_util.request({
			url:'/cart/cancellCart',
			type:'put',
			data:data,
			success:success,
			error:error,
		})
	},
	cancellSelectCart:function (success,error) {
		_util.request({
			url:'/cart/cancellSelectCart',
			type:'put',
			success:success,
			error:error,
		})
	},
	modifyCartNum:function (data,success,error) {
		_util.request({
			url:'/cart/modifyCartNum',
			type:'put',
			data:data,
			success:success,
			error:error,
		})
	},
	getCartNum:function (success,error) {
		_util.request({
			url:'/cart/getCartNum',
			success:success,
			error:error,
		})
	},
}

module.exports = _cart;