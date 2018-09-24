// import { combineReducers } from 'redux';

//redux-immutable中的combineReducers方法生成的store中的state数据是immutable对象
import { combineReducers } from 'redux-immutable';

import {reducer as todolistReducer} from 'pages/todolist/store';
import {reducer as loginReducer} from 'pages/login/store';
import {reducer as indexReducer} from 'pages/index/store';
import {reducer as userReducer} from 'pages/option2/store';
import {reducer as categoryReducer} from 'pages/option3/store';
import {reducer as productReducer} from 'pages/product/store';
import {reducer as orderReducer} from 'pages/order/store';

export default combineReducers({
	todolist:todolistReducer,
	login:loginReducer,
	index:indexReducer,
	user:userReducer,
	category:categoryReducer,
	product:productReducer,
	order:orderReducer,
})