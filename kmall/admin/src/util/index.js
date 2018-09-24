import axios from 'axios';

export const REQUIRE = (options)=>{
	return new Promise((resolve,reject)=>{
		let val = {
			url:options.url || '',
	    	method:options.method || 'get',
	    	withCredentials:true
		}
		switch(val.method.toUpperCase()){
			case"GET":
			case"DELETE":
				val.params = options.data || null;
			break;
			default:
				val.data = options.data || null;
		}
		axios(val)
	    .then((data)=>{
	    	let resulte = data.data;
	    	// console.log(resulte);
	    	if (resulte.status == 10) {
	    		RemoveUsername();
	    		window.location.href='/login';
	    		reject(resulte.messages);
	    	}else{
	    		resolve(resulte);
	    	}  		
	    })
	    .catch((err)=>{
	    	let messages='网络故障,请检查网络';
	    	reject(messages);
	    }) 
	})	
}
export const SetUsername = (username)=>{
	// console.log('fjdjdj');
	window.localStorage.setItem('username',username)
}
export const GetUsername = ()=>{
	return window.localStorage.getItem('username')
}
export const RemoveUsername = (username)=>{
	window.localStorage.removeItem('username')
}