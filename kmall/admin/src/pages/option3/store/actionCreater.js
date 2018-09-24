import * as types from './actionTypes.js';
// import axios from 'axios';
import { message } from 'antd';
import { REQUIRE } from 'util';
import { CATEGORY_LOAD, CATEGORYMOUNT_LOAD, UPDATE_CATEGORY_NAME, UPDATE_CATEGORY_ORDER } from 'api';

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
const mountStatusDid = (payload)=>{
	return {
		type:types.MOUNT_DONE,	
		payload
	}
};
const getCategoryAction = (values)=>{
	return ( (storeDispatch)=>{
		storeDispatch(changeStatusStart());
		REQUIRE({
		    	url:CATEGORY_LOAD,
		    	method:'post',
		    	data:values
		    })
		    .then((result)=>{
		    	// console.log(result.data);
		    	storeDispatch(changeStatusDone());
		    	
		    	storeDispatch(mountStatusDid(result.data));
		    })
		    .catch((err)=>{
		    	storeDispatch(changeStatusDone());
		    }) 
	})
}
const getOneLevelCategory = ()=>{
	return ( (storeDispatch)=>{
		REQUIRE({
	    	url:CATEGORY_LOAD,
	    	method:'get',
	    	data:{
	    		pid:0
	    	}
	    })
	    .then((result)=>{
	    	if (result.status==0) {
	    		storeDispatch(mountStatusDid(result.data));
	    	}
	    })
	    .catch((err)=>{
	    	throw err
	    }) 
	})
}

const getCategoryData = (object)=>{
	return ( (storeDispatch)=>{
		storeDispatch(changeStatusStart());
		REQUIRE({
			url:CATEGORYMOUNT_LOAD,
			data:object
		})
		.then((data)=>{
			// console.log(data);
			storeDispatch(changeStatusDone());
			let action = focusPageData(data);
			storeDispatch(action);
		})
	})
}
const focusPageData = (payload)=>{
	return {
		type:types.GET_PAGE,
		payload
	}
};
const getShowUpdateModal = (updateId,updateName)=>{
	return {
		type:types.SHOW_UPDATE_MODAL,
		payload:{
			updateId,
			updateName
		}
	}
};
const changeCategoryName = (payload)=>{
	return {
		type:types.CHANGE_CATEGORY_NAME,
		payload
	} 
}
const updateCategoryName =(pid)=>{
	return ( (storeDispatch,getState)=>{
		const state=getState().get('category');
		REQUIRE({
			url:UPDATE_CATEGORY_NAME,
			data:{
				name:state.get('name'),
				page:state.get('current'),
				id:state.get('id'),
				pid:pid
			}
		})
		.then((data)=>{
			if ( data.status == 1 ) {
				message.error(data.messages);
			}else{
				message.success(data.messages);
				let action = focusPageData(data);
				storeDispatch(action);
			}	
		})
	})
}
const updateCategoryOrder =(order,pid,id)=>{
	return ( (storeDispatch,getState)=>{
		const state=getState().get('category');
		REQUIRE({
			url:UPDATE_CATEGORY_ORDER,
			data:{
				page:state.get('current'),
				id:id,
				order:order,
				pid:pid
			}
		})
		.then((data)=>{
			if ( data.status == 1 ) {
				message.error(data.messages);
			}else{
				message.success(data.messages);
				let action = focusPageData(data);
				storeDispatch(action);
			}	
		})
	})
}
export { 
	getCategoryAction, 
	getOneLevelCategory, 
	getCategoryData,
	getShowUpdateModal,
	changeCategoryName,
	updateCategoryName,
	updateCategoryOrder
}