import * as types from './actionTypes.js';
// import axios from 'axios';
import { message } from 'antd';
import { REQUIRE } from 'util';
import { ORDER_MOUNT,ORDER_SEARCH,ORDER_DETAIL_MOUNT,HANDEL_DELIVER } from 'api';

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
const mountOrderDid = (payload)=>{
	return {
		type:types.MOUNT_DONE,
		payload
	}
};
const mountOrderDetailDid = (payload)=>{
	return {
		type:types.MOUNT_DETAIL_DONE,
		payload
	}
};
export const getMountOrder=(page)=>{
	return( (storeDispatch)=>{
		storeDispatch(changeStatusStart());
		// console.log(page);
		REQUIRE({
			url:ORDER_MOUNT,
			data:{
				page:page,
			}
		})
		.then((result)=>{
			// console.log('7777',result);
	    	storeDispatch(mountOrderDid(result));
	    	storeDispatch(changeStatusDone());
	    })
	    .catch((err)=>{
	    	storeDispatch(changeStatusDone());
	    	throw err;	
	    }) 
    })
}
export const getSearchOrder=(keyword,page)=>{
	return( (storeDispatch)=>{
		storeDispatch(changeStatusStart());
		// console.log(page);
		REQUIRE({
			url:ORDER_SEARCH,
			data:{
				keyword,
				page
			}
		})
		.then((result)=>{
	    	storeDispatch(mountOrderDid(result))
	    	storeDispatch(changeStatusDone());
	    })
    })
}
export const getMountOrderDetail =(orderNo)=>{
	return ( (storeDispatch)=>{
		REQUIRE({
			url:ORDER_DETAIL_MOUNT,
			data:{
				orderNo:orderNo,
			}
		})
		.then((data)=>{
			// console.log(data.order);
			storeDispatch(mountOrderDetailDid(data.order));	
		})
	})
}
export const gethandelDeliver =(orderNo)=>{
	return ( (storeDispatch)=>{
		REQUIRE({
			url:HANDEL_DELIVER,
			method:'put',
			data:{
				orderNo:orderNo,
			}
		})
		.then((data)=>{
			storeDispatch(mountOrderDetailDid(data.order));	
		})
	})
}



