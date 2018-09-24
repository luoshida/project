
import React, { Component } from 'react';

import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import moment from 'moment';
import { Breadcrumb, Table, Divider, Button, InputNumber,Input, Switch, } from 'antd';
const Search = Input.Search;


class ProductList extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.mountProduct()
	}
	render() {
		let {keyword}=this.props;
		let data = this.props.dataSource.map((value)=>{
			return {
				key:Math.random(),
				id:value.get('_id'),
				name:value.get('name'),
				order:value.get('order'),
				status:value.get('status')
			}
		}).toJS()

		const columns = [{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id',
		},{
		  title: '商品名称',
		  dataIndex: 'name',
		  key: 'name',
		  width:300,
		  render:(name)=>{
		  	if (keyword) {
		  		let reg = new RegExp("("+keyword+")",'ig');
		  		let html=name.replace(reg,"<b style='color:red'>$1</b>");
		  		return <span dangerouslySetInnerHTML={{__html:html}}></span>;
		  	}else{
		  		return name;
		  	}
		  }
		},{
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		  render:(status, record)=>{
		  	return <Switch 
		  		checkedChildren="在售" 
		  		unCheckedChildren="下架" 
		  		defaultChecked={record.status=='0'?true:false}
		  		onChange={(checked)=>{
		  			this.props.handleStatus(record.id,checked?0:1)
		  		}}
		  	/>
		  }
		},{
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render:(order, record) =>{
		  		return <InputNumber 
		  			defaultValue={order}
		  			onBlur={(e)=>{
		  				this.props.handleUpdateOrder(e.target.value,record.id)
		  			}}
		  		/>
		  }
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		   		<Link to={'/product/save/'+ record.id }>编辑</Link>
		      	<Divider type="vertical" />
		      	<Link to={'/product/see/'+ record.id }>查看</Link>
		    </span>
		  ),
		}];

		return (
			<div className='list'>
				<Breadcrumb>
				    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				    <Breadcrumb.Item>商品列表</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ overflow:"hidden" }}>
					<Search
				      placeholder="输入名称查找"
				      onSearch={value => {
				      	this.props.handleSearch(value)
				      }}
				      style={{ width:200,marginTop:40 }}
				      enterButton
				    />
					<Link to='/product/save' style={{ float:'right' }}>
						<Button type="primary">新增</Button>
          			</Link>	
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
							this.props.mountProduct(dataState.current)
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
		isCategory:state.get('product').get('isCategory'),
		dataSource:state.get('product').get('dataSource'),
		current:state.get('product').get('current'),
		defaultCurrent:state.get('product').get('defaultCurrent'),
		total:state.get('product').get('total'),
		pageSize:state.get('product').get('pageSize'),
		keyword:state.get('product').get('keyword'),
	}
}

const mapDispatchToProps = (storeDispatch)=>{
	return {
		mountProduct:(page=1)=>{
			const action = actionCreater.getMountProduct(page);
			storeDispatch(action);
		},
		// showUpdateModal:(updateId,updateName)=>{
		// 	storeDispatch(actionCreater.getShowUpdateModal(updateId,updateName));
		// },
		// handleChangeCategoryName:(name)=>{
		// 	storeDispatch(actionCreater.changeCategoryName(name));
		// },
		handleSearch:(keyword,page=1)=>{
			storeDispatch(actionCreater.getSearchProduct(keyword,page));
		},
		handleStatus:(id,status)=>{
			console.log(id,status);
			storeDispatch(actionCreater.updateProductStatus(id,status));
		},
		handleUpdateOrder:(order,id)=>{
			storeDispatch(actionCreater.updateProductOrder(order,id));
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);
