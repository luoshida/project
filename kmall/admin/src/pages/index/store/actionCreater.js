import * as types from './actionTypes.js';

import { REQUIRE,SetUsername } from 'util';
import { GETDATA_LOAD } from 'api';


const focusLinkData = (payload)=>{
	return {
		type:types.GET_LINK,
		payload
	}
};
const getLinkData = ()=>{
	return ( (storeDispatch)=>{
		REQUIRE({
			url:GETDATA_LOAD
		})
		.then((data)=>{
			let action = focusLinkData(data);
			storeDispatch(action);
		})
	})
}
export { getLinkData }