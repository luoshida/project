import * as types from './actionTypes.js';

import { fromJS } from 'immutable';


const Default = fromJS ({
	isCategory:false,
  	dataSource:[{ 
  		key: '1',
		name: '胡彦斌',
		order: 1,
		pid:555.

	},{
		key: '2',
		name: 'ddd',
		order: 1,
		pid:666
	}],
	current:1,
	defaultCurrent:1,
	total:500,
	pageSize:10,
	oneLevel:[],
	visible:false,
	name:'',
	id:''
});

export default (state=Default,action)=>{
	if (action.type==types.CHANGE_START) {
		return state.set('isCategory',true)
	}
	if (action.type==types.CHANGE_DONE) {
		return state.set('isCategory',false)
	}

	if (action.type==types.MOUNT_DONE) {
		// console.log(state);
		return state.set('oneLevel',action.payload)
	}
	if (action.type==types.GET_PAGE) {
		return state.merge({
			dataSource:action.payload.dataSource,
			current:action.payload.current*1,
			defaultCurrent:action.payload.defaultCurrent,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			visible:action.payload.visible,
		})
	}
	if (action.type==types.SHOW_UPDATE_MODAL) {
		// console.log(state);
		return state.merge({
			id:action.payload.updateId,
			name:action.payload.updateName,
			visible:true
		})
	}
	if (action.type==types.CHANGE_CATEGORY_NAME) {
		return state.set('name',action.payload)
	}
	if (action.type==types.QUIT_NOW) {
		return state.set('visible',false)
	}
	
	return state
};