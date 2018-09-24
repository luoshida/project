import * as types from './actionTypes.js';

import { fromJS } from 'immutable';
let Default = fromJS({
	userNum:0,
	orderNum:0,
	productNum:0
})


export default (state=Default,action)=>{
	if (action.type==types.GET_LINK) {
		return state.merge({
			userNum:action.payload.userNum,
			orderNum:action.payload.orderNum,
			productNum:action.payload.productNum
		})
	}
	// if (action.type==types.CHANGE_DONE) {
	// 	return state.set('isLogin',false)
	// }
	return state
	//返回的都是一个map对象
};