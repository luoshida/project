import * as types from './actionTypes.js';
// import axios from 'axios';
import { message } from 'antd';
import { REQUIRE } from 'util';
import { PRODUCT_ADD,PRODUCT_MOUNT,UPDATE_PRODUCT_ORDER,
	UPDATE_PRODUCT_STATUS,GET_PRODUCT_EDIT,PRODUCT_SEARCH } from 'api';

export const getListIdAction = (FirstListId,SecendListId)=>{
	return {
		type:types.List_Id,
		payload:{
			FirstListId,
			SecendListId
		}
	}
};
export const getloadImgAction = (payload)=>{
	return {
		type:types.LOAD_IMG,
		payload
	}
};
export const getDetailImgAction = (payload)=>{
	return {
		type:types.DETAIL_IMG,	
		payload
	}
};
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
const errId=()=>{
	return {
		type:types.ERR_ID,	
	}
}
const errImg=()=>{
	return {
		type:types.ERR_IMG,	
	}
};
export const handleProductSubmitAction = (err,values)=>{
	return ( (storeDispatch,getState)=>{
		const state=getState().get('product');
		let hasError=false;
		if (!state.get('SecendListId')) {
			storeDispatch(errId());
			hasError=true;
		}
		if (!state.get('loadImg')) {
			storeDispatch(errImg());
			hasError=true;
		}
		if (hasError) {
			return
		}
		if (err) {
			return
		}
		values.FirstListId=state.get('FirstListId');
		values.SecendListId=state.get('SecendListId');
		values.loadImg=state.get('loadImg');
		values.detailContent=state.get('detailContent');
		// console.log(values);
		storeDispatch(changeStatusStart());
		let method='post';
		if (values.id) {
			method='put'
		}
		REQUIRE({
		    	url:PRODUCT_ADD,
		    	method:method,
		    	data:values
		    })
		    .then((result)=>{
		    	// console.log(result.data);
		    	message.success(result.messages);
		    	storeDispatch(changeStatusDone());

		    	window.location.href='/product'
		    })
		    .catch((err)=>{
		    	message.error(data.messages);
		    	storeDispatch(changeStatusDone());
		    }) 
	})
}
const mountStatusDid = (payload)=>{
	return {
		type:types.PRO_MOUNT_DONE,	
		payload
	}
};
const keyWordStore = (payload)=>{
	return {
		type:types.KEYWORD_STORE,	
		payload
	}
};
export const getMountProduct=(page)=>{
	return( (storeDispatch)=>{
		storeDispatch(changeStatusStart());
		// console.log(page);
		REQUIRE({
			url:PRODUCT_MOUNT,
			data:{
				page:page,
			}
		})
		.then((result)=>{
	    	storeDispatch(mountStatusDid(result))
	    	storeDispatch(changeStatusDone());
	    })
	    .catch((err)=>{
	    	storeDispatch(changeStatusDone());
	    	throw err;	
	    }) 
    })
}
export const getSearchProduct=(keyword,page)=>{
	return( (storeDispatch)=>{
		storeDispatch(changeStatusStart());
		// console.log(page);
		REQUIRE({
			url:PRODUCT_SEARCH,
			data:{
				keyword,
				page
			}
		})
		.then((result)=>{
	    	storeDispatch(mountStatusDid(result))
	    	storeDispatch(changeStatusDone());
	    })
    })
}
export const updateProductOrder =(order,id)=>{
	return ( (storeDispatch,getState)=>{
		const state=getState().get('category');
		REQUIRE({
			url:UPDATE_PRODUCT_ORDER,
			data:{
				page:state.get('current'),
				id:id,
				order:order,
			}
		})
		.then((data)=>{
			message.success(data.messages);
			storeDispatch(mountStatusDid(data));	
		})
	})
}
export const updateProductStatus =(id,status)=>{
	return ( (storeDispatch)=>{
		REQUIRE({
			url:UPDATE_PRODUCT_STATUS,
			data:{
				id:id,
				status:status,
			}
		})
		.then((data)=>{
			message.success(data.messages);	
		})
	})
}
const editLoad = (payload)=>{
	return {
		type:types.EDIT_PRODUCT_LOAD,	
		payload
	}
};
export const getEditProductAction=(id)=>{
	return ( (storeDispatch)=>{
		REQUIRE({
			url:GET_PRODUCT_EDIT,
			data:{
				id:id,
			}
		})
		.then((data)=>{
			storeDispatch(editLoad(data.data))
		})
	})
}
