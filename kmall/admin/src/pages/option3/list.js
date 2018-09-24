
import React, { Component } from 'react';

import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import moment from 'moment';
import { Breadcrumb, Button, Table, Divider, Modal, Input, InputNumber } from 'antd';



class List extends Component {
	constructor(props){
		super(props);
		this.state={
			pid:this.props.match.params.pid || 0,
		}
	}
	componentDidMount(){
		this.props.handleCategory({pid:this.state.pid,page:1})
	}
	componentDidUpdate(prevProps, prevState,snapshot){
		const oldPathName = prevProps.location.pathname;
		const newPathName = this.props.location.pathname;
		if (oldPathName != newPathName) {
			this.setState({
				pid:this.props.match.params.pid || 0,
			},()=>{
				this.props.handleCategory({pid:this.state.pid,page:1})
			})	
		}
	}
	render() {
		let pid = this.state.pid;
		let data = this.props.dataSource.map((value)=>{
			return {
				key:Math.random(),
				id:value.get('_id'),
				name:value.get('name'),
				order:value.get('order'),
				pid:value.get('pid'),	
				createdAt:moment(value.get('createdAt')).format('YYYY-MM-DD HH:mm:ss'),
				updatedAt:moment(value.get('updatedAt')).format('YYYY-MM-DD HH:mm:ss'),
			}
		}).toJS()

		const columns = [{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id',
		},{
		  title: '名称',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render:(order, record) =>{
		  		return <InputNumber 
		  			defaultValue={order}
		  			onBlur={(e)=>{
		  				console.log(record.value);
		  				this.props.handleUpdateOrder(e.target.value,pid,record.id)
		  			}}
		  		/>
		  }
		},{
			title: '创建时间',
		  	dataIndex: 'createdAt',
		  	key: 'createdAt',
		},{
			title: '最近一次更新时间',
		  	dataIndex: 'updatedAt',
		  	key: 'updatedAt',
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      <a href="javascript:;"
		      	onClick={()=>{
		      		this.props.showUpdateModal(record.id,record.name)
		      	}}
		      >更改名称</a>
		      {
		      	record.pid == 0
		      	? (
		      	<span>
		      		<Divider type="vertical" />
		      		<Link to={'/option3/'+ record.id }>查看子元素</Link>
		      	</span>
		      	) : null
		      }
		    </span>
		  ),
		}];

		return (
			<div className='list'>
				<Breadcrumb>
				    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
				    <Breadcrumb.Item>分类列表</Breadcrumb.Item>
				</Breadcrumb>
				<div >
					<Link to='/option3/add' className='clearfix'>
						<Button type="primary" style={{ float:'right' }}>新增</Button>
	          		</Link>
					<h2>父级分类(ID:{ pid })</h2>	
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
					onChange={(dataState)=>(
						this.props.handleCategory({pid:pid,page:dataState.current})
					)}
					loading={
						{spinning:this.props.isCategory,
						tip:'正在请求数据'}
					}
				/>
				
        		<Modal
		          title="修改分类名称"
		          visible={this.props.visible}
		          onOk={()=>{this.props.handleUpdateName(pid)}}
		          onCancel={this.props.handleQuit}
		        >
		        <Input 
		        	value={this.props.name} 
		        	onChange={(e)=>{this.props.handleChangeCategoryName(e.target.value)}}
		        />
		        </Modal>
		        
			</div>
		)
	}
}

const mapStateToProps=(state)=>{

	return {
		isCategory:state.get('category').get('isCategory'),
		dataSource:state.get('category').get('dataSource'),
		current:state.get('category').get('current'),
		defaultCurrent:state.get('category').get('defaultCurrent'),
		total:state.get('category').get('total'),
		pageSize:state.get('category').get('pageSize'),
		visible:state.get('category').get('visible'),
		name:state.get('category').get('name'),
	}
}

const mapDispatchToProps = (storeDispatch)=>{
	return {
		handleCategory:(object)=>{
			const action = actionCreater.getCategoryData(object);
			storeDispatch(action);
		},
		showUpdateModal:(updateId,updateName)=>{
			storeDispatch(actionCreater.getShowUpdateModal(updateId,updateName));
		},
		handleChangeCategoryName:(name)=>{
			storeDispatch(actionCreater.changeCategoryName(name));
		},
		handleUpdateName:(pid)=>{
			storeDispatch(actionCreater.updateCategoryName(pid));
		},
		handleQuit:()=>{
			storeDispatch({type:'category\QUIT_NOW'})
		},
		handleUpdateOrder:(order,pid,id)=>{
			storeDispatch(actionCreater.updateCategoryOrder(order,pid,id));
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(List);