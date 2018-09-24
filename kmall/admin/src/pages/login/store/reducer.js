import * as types from './actionTypes.js';

import { fromJS } from 'immutable';

let Default = fromJS({
	isLogin:false
})


export default (state=Default,action)=>{
	if (action.type==types.CHANGE_START) {
		return state.set('isLogin',true)
	}
	if (action.type==types.CHANGE_DONE) {
		return state.set('isLogin',false)
	}
	return state
	//返回的都是一个map对象
};