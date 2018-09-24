import * as types from './actionTypes.js';

import { REQUIRE } from 'util';
import { GETUSER_LOAD, GETMOUNT_LOAD} from 'api';

const changeStatusDone = ()=>{
	return {
		type:types.CHANGE_DONE,
	}
};
const changeStatusStart = ()=>{
	return {
		type:types.CHANGE_START,	
	}
};
const focusPageData = (payload)=>{
	return {
		type:types.GET_PAGE,
		payload
	}
};
const getPageData = (page)=>{
	return ( (storeDispatch)=>{
		storeDispatch(changeStatusStart());
		REQUIRE({
			url:GETUSER_LOAD,
			data:{
				page:page
			}
		})
		.then((data)=>{
			storeDispatch(changeStatusDone());
			let action = focusPageData(data);
			storeDispatch(action);
		})
	})
}
const getMountData = () => {
	return ( (storeDispatch)=>{
		storeDispatch(changeStatusStart());
		REQUIRE({
			url:GETMOUNT_LOAD,
		})
		.then((data)=>{
			storeDispatch(changeStatusDone());
			let action = focusPageData(data);
			storeDispatch(action);
		})
	})
}
export { getPageData, getMountData}