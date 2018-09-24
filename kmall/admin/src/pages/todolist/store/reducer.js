import * as types from './actionTypes.js';

// Immutable Data 就是一旦创建，就不能再被更改的数据。
// 对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。
// Immutable 实现的原理是 Persistent Data Structure（持久化数据结构）
// 也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。
// 同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，
// Immutable 使用了 Structural Sharing（结构共享），
// 即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享
import { fromJS } from 'immutable';
let Default = fromJS({
	list:['xx','yy'],
	value:'4444'
})


// reducer是一个纯函数-
// 给定固定的输入，就会有固定的输出，不能改变参数，
// 纯函数不能系统时间，随机数等不固定的值，
// reducer只处理逻辑不改变值，数据的改变由store来负责
// action.type在整个数据中必须唯一
export default (state=Default,action)=>{
	
	if (action.type == types.CHANGE_VALUE) {
		return state.set('value',action.payload);
	}
	if (action.type == types.CHANGE_LIST) {
		const newList = [...state.get('list'),state.get('value')]
		return state.merge({
			list:newList,
			value:''
		})
	}
	if (action.type == types.DEL_LIST) {
		const newList = [...state.get('list')];
		newList.splice(action.payload,1);
		return state.set('list',newList);
	}
	if(action.type == types.INIT_LOAD){
		return state.set('list',action.payload);
	}
	return state
	//返回的都是一个map对象
};