import * as types from './actionTypes.js';

import { fromJS } from 'immutable';


const Default = fromJS ({
	isCategory:false,

	dataSource:[],
	current:1,
	defaultCurrent:1,
	total:500,
	pageSize:10,
	keyword:'',
	
	orderDetail:{}
});

export default (state=Default,action)=>{

	if (action.type==types.CHANGE_START) {
		return state.set('isCategory',true)
	}

	if (action.type==types.CHANGE_DONE) {
		return state.set('isCategory',false)
	}

	if (action.type==types.MOUNT_DONE) {
		return state.merge({
			dataSource:action.payload.dataSource,
			current:action.payload.current*1,
			defaultCurrent:action.payload.defaultCurrent,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			keyword:action.payload.keyword
		})
	}

	if (action.type==types.MOUNT_DETAIL_DONE) {
		return state.set('orderDetail',action.payload)
	}
	return state
};