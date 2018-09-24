import * as types from './actionTypes.js';

import { fromJS } from 'immutable';


const Default = fromJS ({
	isCategory:false,
	FirstListId:'',
	SecendListId:'',
	loadImg:'',
	detailContent:'',

	ListIdValidateStatus:'',
	ListIdHelp:'',
	ImageValidateStatus:'',
	ImageHelp:'',
	dataSource:[],
	current:1,
	defaultCurrent:1,
	total:500,
	pageSize:10,



	int:"",
	name:"",
	order:'',
	price:'',
	stock:'',

	keyword:'',
});

export default (state=Default,action)=>{
	if (action.type==types.List_Id) {
		return state.merge({
			FirstListId:action.payload.FirstListId,
			SecendListId:action.payload.SecendListId,
			ListIdValidateStatus:'',
			ListIdHelp:''	
		})
	}
	if (action.type==types.LOAD_IMG) {
		return state.merge({
			loadImg:action.payload,
			ImageValidateStatus:'',
			ImageHelp:'',
		})
	}

	if (action.type==types.DETAIL_IMG) {
		// console.log(state);
		return state.set('detailContent',action.payload)
	}
	if (action.type==types.CHANGE_START) {
		return state.set('isCategory',true)
	}

	if (action.type==types.CHANGE_DONE) {
		return state.set('isCategory',false)
	}
	if (action.type==types.ERR_ID) {
		return state.merge({
			ListIdValidateStatus:'error',
			ListIdHelp:'请输入分类'
		})
	}
	if (action.type==types.ERR_IMG) {
		return state.merge({
			ImageValidateStatus:'error',
			ImageHelp:'请上传商品图片'
		})
	}
	if (action.type==types.PRO_MOUNT_DONE) {
		return state.merge({
			dataSource:action.payload.dataSource,
			current:action.payload.current*1,
			defaultCurrent:action.payload.defaultCurrent,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			keyword:action.payload.keyword
		})
	}

	if (action.type==types.EDIT_PRODUCT_LOAD) {

		return state.merge({
			FirstListId:action.payload.category.pid,
			SecendListId:action.payload.category._id,
			loadImg:action.payload.loadImg,
			detailContent:action.payload.detailContent,
			int:action.payload.int,
			name:action.payload.name,
			order:action.payload.order,
			price:action.payload.price,
			stock:action.payload.stock	
		})
	}
	return state
};