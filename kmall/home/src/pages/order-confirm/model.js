
var _util = require('util');

var modelTpl = require('./model.tpl');

var _order =require('service/order');
var _city=require('util/city');

var _model= {
	show:function(options){
		this.options=options;
		this.$model=$('.model');

		var html = _util.render(modelTpl,{edit:this.options.edit || null});
		this.$model.html(html);

		this.bindEvent();
		this.loadProvince();
	},
	bindEvent:function(){
		var _this=this;
		$('.close').on('click',function(e){
			_this.hide();
		})
		$('.add-address').on('click','.add-address-container',function(e){
			e.stopPropagation();
		})
		this.$model.on('change','#province-select',function(){
			var province= _this.$model.find('#province-select').val();
			_this.loadCity(province);
		})
		$('#modelr-btn').on('click',function(e){
			_this.submit()
		})
		this.$model.find('input').on('keyup',function(e){
			if (e.keyCode == 13) {
				_this.submit();
			}
		})	
	},
	submit:function(){
		var _this=this;
		var formDate={
			name:$.trim($('[name="username"]').val()),
			address:$.trim($('[name="address"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val()),
		};
		// console.log(formDate);
		var validateResult = this.validate(formDate);
		if (validateResult.status) {
			$('.err').hide();
			if (this.options.edit) {
				formDate.addressId=this.options.edit._id;
				_order.editAddressSubmit(formDate,function(address){
					_util.showErrorMsg('更新地址成功');
					_this.hide();
					_this.options.success(address);
				},function(){
					_util.showErrorMsg('新增地址失败');
				})
			}else{
				_order.addAddress(formDate,function(address){
					_util.showErrorMsg('新增地址成功');
					_this.hide();
					_this.options.success(address);
				},function(){
					_util.showErrorMsg('新增地址失败');
				})
			}	
		}else{
			$('.err').show();
			$('.err span').text(validateResult.msg);

		}

	},
	validate:function(formDate){
		var result={
			status:false,
			msg:''
		}
		if (!_util.validate(formDate.name,'require')) {
			result.msg='名字不能为空';
			return result;
		}
		if (!_util.validate(formDate.name,'username')) {
			result.msg='名字格式错误';
			return result;
		}
		if (!_util.validate(formDate.province,'require')) {
			result.msg='城市不能为空';
			return result;
		}
		if (!_util.validate(formDate.city,'require')) {
			result.msg='城市不能为空';
			return result;
		}
		if (!_util.validate(formDate.address,'require')) {
			result.msg='详细地址必须填';
			return result;
		}

		if (!_util.validate(formDate.phone,'require')) {
			result.msg='手机号不能为空';
			return result;
		}
		if (!_util.validate(formDate.phone,'phone')) {
			result.msg='手机号格式错误';
			return result;
		}
		if (!_util.validate(formDate.zip,'require')) {
			result.msg='邮编不能为空';
			return result;
		}
		if (!_util.validate(formDate.zip,'zip')) {
			result.msg='邮编格式错误';
			return result;
		}
		result.status=true;
		return result;
	},
	loadCity:function(province){
		var html='';
		html+=
		_city.getCities(province).map(function(city,index){
			return '<option >'+city+'</option>'
		})
		var $city=this.$model.find('#city-select');
		$city.html(html);

		if (this.options.edit && this.options.edit.city) {
			$city.val(this.options.edit.city);
		}

	},
	loadProvince:function(){
		var _this=this;
		var html='';
		html+=
		_city.getProvinces().map(function(province,index){
			return '<option >'+province+'</option>'	 
		})
		var $province=this.$model.find('#province-select');
		$province.html(html);

		if (this.options.edit && this.options.edit.province) {
			$province.val(this.options.edit.province);
			_this.loadCity(this.options.edit.province);
		}
	},
	hide:function(){
		this.$model.empty();
	}

}
module.exports=_model;
