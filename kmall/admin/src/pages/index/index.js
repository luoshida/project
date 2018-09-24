

import React, { Component } from 'react';
import { Card } from 'antd';
import MyLayout from 'layout'
import { connect } from 'react-redux';
import { REQUIRE } from 'util';
import { actionCreater } from './store';
import './index.css';
class Index extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.handleLink();
	}
	render() {
		return (
			<div className='index'>
				<MyLayout>
					<Card title="用户数量" hoverable={true}>
					    <p>{this.props.userNum}</p>
					</Card>
					<Card title="订单数量" hoverable={true}>
					    <p>{this.props.orderNum}</p>  
					</Card>
					<Card title="产品数量" hoverable={true}>
					    <p>{this.props.productNum}</p>
					</Card>
				</MyLayout>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
	return {
		userNum:state.get('index').get('userNum'),
		orderNum:state.get('index').get('orderNum'),
		productNum:state.get('index').get('productNum'),
	}
}
const mapDispatchToProps = (storeDispatch)=>{
	return {
		handleLink:()=>{
			const action = actionCreater.getLinkData()
			storeDispatch(action);
		},
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);