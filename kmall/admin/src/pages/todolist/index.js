

import React, { Component } from 'react';

// 按需加载不需要引入样式,只需引入相应的组件
//npm install babel-plugin-import --save-dev
// import 'antd/dist/antd.css';
import {  Row, Col, Input,Button,List } from 'antd';

import './todolist.css';

import { connect } from 'react-redux';



import { actionCreater } from './store';

class TodoList extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.focuseInit();
	}
	render() {
		return (
			<div className='todolist'>
				<Row>
			      <Col span={10}>
			      	<Input value={ this.props.value } onChange={ this.props.handleInput } />
			      </Col>
			      <Col span={2}>
			      	<Button type="primary" onClick={this.props.handleClick}>增加</Button>
			      </Col>
			    </Row>

			    <Col span={10}>
				    <List style={{ marginTop:'10px' }}
				      bordered
				      dataSource={this.props.list}
				      renderItem={(item, index) => (<List.Item onClick={()=>{this.props.handleDel(index)}}>{item}</List.Item>)}
				    />
			    </Col>
			</div>
		)
	}
}

//store里面的state映射到组件props上
const mapStoreToProps = (state)=>{
	return {
		value:state.get('todolist').get('value'),
		list:state.get('todolist').get('list')
	}
}
const mapDispatchToProps = (storeDispatch)=>{
	return {
		handleInput:(e)=>{
			let action = actionCreater.CHANGEVALUE(e.target.value);
			storeDispatch(action);
		},
		handleClick:()=>{
			let action = actionCreater.CHANGELIST();
			storeDispatch(action);
		},
		handleDel:(index)=>{
			let action = actionCreater.DELLIST(index);
			storeDispatch(action);
		},
		focuseInit:()=>{
			let action = actionCreater.getInit();
			storeDispatch(action);
		}
	}
}
//connect方法是让指定的组件和store连接
export default connect(mapStoreToProps,mapDispatchToProps)(TodoList);