import * as types from './actionTypes.js';
// import axios from 'axios';
import { message } from 'antd';
import { REQUIRE,SetUsername } from 'util';
import { REQ_LOAD } from 'api';

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
const getLoginAction = (values)=>{
	return ( (storeDispatch)=>{
		// console.log(REQUIRE);
		storeDispatch(changeStatusStart());
		REQUIRE({
		    	url:REQ_LOAD,
		    	method:'post',
		    	data:values
		    })
		    .then((result)=>{
		    	// console.log(result);
		    	
		    	message.success(result.messages);
		    	SetUsername(result.data.username);
		    	// window.localStorage.setItem('username',result.data.username);
		    	window.location.href='/';

		    	storeDispatch(changeStatusDone());
		    })
		    .catch((err)=>{
		    	message.error(err);
		    	storeDispatch(changeStatusDone());
		    }) 
	})
}
export { getLoginAction }