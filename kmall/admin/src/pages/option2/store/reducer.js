import * as types from './actionTypes.js';

import { fromJS } from 'immutable';


const Default = fromJS ({
	isFetching:false,
  	dataSource:[{ 
  		key: '1',
		username: '胡彦斌',
		isAdmin: false,
	},{
		key: '2',
		username: 'ddd',
		isAdmin: false,
	}],
	current:1,
	defaultCurrent:1,
	total:500,
	pageSize:10,
});


export default (state=Default,action)=>{
	if (action.type==types.CHANGE_START) {
		return state.set('isFetching',true)
	}
	if (action.type==types.CHANGE_DONE) {
		return state.set('isFetching',false)
	}
	if (action.type==types.GET_PAGE) {
		return state.merge({
			dataSource:action.payload.dataSource,
			current:action.payload.current,
			defaultCurrent:action.payload.defaultCurrent,
			total:action.payload.total,
			pageSize:action.payload.pageSize
		})
	}

	return state
	//返回的都是一个map对象
};