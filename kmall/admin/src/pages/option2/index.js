

import React, { Component } from 'react';
import { Table, Breadcrumb } from 'antd';
import MyLayout from 'layout';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import moment from 'moment';

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '是否是管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render: isAdmin => (isAdmin ? '是' : '否')
},{
	title: '电话',
  	dataIndex: 'phone',
  	key: 'phone',
},{
	title: '注册时间',
  	dataIndex: 'createdAt',
  	key: 'createdAt',
}];


class Option2 extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		
		this.props.mountData();
	}
	render() {
		let data = this.props.dataSource.map((value)=>{
			return {
				key:Math.random(),
				username:value.get('username'),
				isAdmin:value.get('isAdmin'),
				phone:value.get('phone'),
				createdAt:moment(value.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()
		return (
			<div className='option2'>
				<MyLayout>
					<Breadcrumb>
					    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
					    <Breadcrumb.Item>用户列表</Breadcrumb.Item>
					</Breadcrumb>

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
						onChange={(dataState)=>(
							this.props.handlePage(dataState.current)
						)}
						loading={
							{spinning:this.props.isFetching,
							tip:'正在请求数据'}
						}
					/>
				</MyLayout>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	// console.log(state.get('user').get('dataSource'));
	// console.log(state.get('user').get('current'));
	
	return {
		isFetching:state.get('user').get('isFetching'),
		dataSource:state.get('user').get('dataSource'),
		current:state.get('user').get('current'),
		defaultCurrent:state.get('user').get('defaultCurrent'),
		total:state.get('user').get('total'),
		pageSize:state.get('user').get('pageSize')
	}
}
const mapDispatchToProps = (storeDispatch)=>{
	return {
		handlePage:(page)=>{
			const action = actionCreater.getPageData(page);
			storeDispatch(action);
		},
		mountData:()=>{

			const action = actionCreater.getMountData();
			storeDispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Option2);