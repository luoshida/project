
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import moment from 'moment';
import { Breadcrumb, Table, Divider, 
	Button, InputNumber,Input, Switch, } from 'antd';

const Search = Input.Search;

class Order extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.mountOrder()
	}
	render() {
		let {keyword} = this.props;
		// console.log('999',this.props.dataSource);
		let data = this.props.dataSource.map((value)=>{
			console.log(value);
			return {
				key:Math.random(),
				orderNo:value.get('orderNo'),
				statusDesc:value.get('statusDesc'),
				payment:'￥'+value.get('payment'),
				createAt:moment(value.get('createAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()

		const columns = [{
		  title: '订单号',
		  dataIndex: 'orderNo',
		  key: 'orderNo',
		  width:300,
		  render:(orderNo)=>{
		  	if (keyword) {
		  		let reg = new RegExp("("+keyword+")",'ig');
		  		let html=orderNo.replace(reg,"<b style='color:red'>$1</b>");
		  		return <span dangerouslySetInnerHTML={{__html:html}}></span>;
		  	}else{
		  		return orderNo;
		  	}
		  }
		},{
		  title: '订单状态',
		  dataIndex: 'statusDesc',
		  key: 'statusDesc',
		},{
		  title: '订单金额',
		  dataIndex: 'payment',
		  key: 'payment',
		},{
		  title: '创建时间',
		  dataIndex: 'createAt',
		  key: 'createAt',
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		   		<Link to={'/order/detail/'+ record.orderNo }>详情</Link>
		    </span>
		  ),
		}];

		return (
			<div className='list'>
				<Breadcrumb>
				    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
				    <Breadcrumb.Item>订单列表</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ overflow:"hidden" }}>
					<Search
				      placeholder="输入订单号查找"
				      onSearch={value => {
				      	this.props.handleSearch(value)
				      }}
				      style={{ width:200,marginTop:40 }}
				      enterButton
				    />
	          	</div>
	          	<Table
					dataSource={data} 
					columns={columns}
					pagination={
						{
							current:this.props.current,
							defaultCurrent:this.props.defaultCurrent,
							total:this.props.total,
							pageSize:this.props.pageSize
						}
					}
					onChange={(dataState)=>{
						if (keyword) {
							this.props.handleSearch(keyword,dataState.current)
						}else{
							this.props.mountOrder(dataState.current)
						}
							
					}}
					loading={
						{spinning:this.props.isCategory,
						tip:'正在请求数据'}
					}
				/>   
			</div>
		)
	}
}

const mapStateToProps=(state)=>{

	return {
		isCategory:state.get('order').get('isCategory'),
		dataSource:state.get('order').get('dataSource'),
		current:state.get('order').get('current'),
		defaultCurrent:state.get('order').get('defaultCurrent'),
		total:state.get('order').get('total'),
		pageSize:state.get('order').get('pageSize'),
		keyword:state.get('order').get('keyword'),
	}
}

const mapDispatchToProps = (storeDispatch)=>{
	return {
		mountOrder:(page=1)=>{
			const action = actionCreater.getMountOrder(page);
			storeDispatch(action);
		},
		handleSearch:(keyword,page=1)=>{
			storeDispatch(actionCreater.getSearchOrder(keyword,page));
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);
