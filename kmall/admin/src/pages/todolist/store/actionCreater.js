import * as types from './actionTypes.js';
import axios from 'axios';

const CHANGEVALUE = (payload)=>{
	return {
			type:types.CHANGE_VALUE,
			payload
	}
};
const CHANGELIST = ()=>{
	return {
			type:types.CHANGE_LIST,
	}
};
const DELLIST = (payload)=>{
	return {
			type:types.DEL_LIST,
			payload
	}
};
const INITLOAD = (payload)=>{
	return {
			type:types.INIT_LOAD,
			payload
	}
};
const getInit = ()=>{
	return (aa)=>{
		axios
		.get('http://127.0.0.1:3000')
		.then((data)=>{
			let action = INITLOAD(data.data);
			aa(action);
		})
		.catch((e)=>{
			throw e
		})
	}
}
export { CHANGEVALUE, CHANGELIST, DELLIST,getInit }