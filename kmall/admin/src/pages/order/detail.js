
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import moment from 'moment';
import { Breadcrumb,Popconfirm,} from 'antd';
import './detail.css';

class Detail extends Component {
	constructor(props){
		super(props);
		this.state={
			orderNo:this.props.match.params.orderNo
		}
	}
	componentDidMount(){
		if (this.state.orderNo) {
			this.props.mountDetail(this.state.orderNo);
		}	
	}
	confirm(){
		this.props.handelDeliver(this.state.orderNo);
	}
	render() {
		
		const { orderNo,payment,createdAt,
			paymentTypeDesc,status,statusDesc,productList,address }=this.props.orderDetail;
		if (createdAt) {
			var createdTime=moment(createdAt).format('YYYY-MM-DD HH:mm:ss');
		}
		// console.log(productList);
		return (
			<div>
			<Breadcrumb>
				    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
				   	<Breadcrumb.Item>订单详情</Breadcrumb.Item>
				</Breadcrumb>
			{
				orderNo	
				? <div className='order-detail'>
					<div className="order">
						<p className="header">订单信息</p>
						<div className="order-message">
							<p className="orderNo">订单号：{orderNo}</p>
							<p>订单金额：<span className="payment">￥{payment}</span></p>
							<p className="creatAt">下单时间：{createdTime}</p>
							<p className="paymentType">支付方式：{paymentTypeDesc}</p>
							<p className="paymentTypeDesc">订单状态：{statusDesc}</p>
							{
								status==30 ? (<Popconfirm
								 	title="确认发货吗?" 
								 	placement="topLeft"
								 	onConfirm={this.confirm.bind(this)}  
								 	okText="发货" 
								 	cancelText="取消">
								
	    								<div className="btn">发货</div>
	  							</Popconfirm>) : null
							}
							
  							
						</div>
					</div>
					<div className="product">
						<p className="header">订单商品</p>
						<div className="product-content">
							<ul className="order-product-header">
								<li>产品名称</li>
								<li>产品图片</li>
								<li>产品价格</li>
								<li>产品数量</li>
								<li>总价</li>
							</ul>
							{

								productList.map((product,index)=>{
									
									return <ul className="order-product" key={index}>
										<li className="name">{product.name}</li>
										<li><img src={product.loadImg.split(',')[0]} alt=""/></li>
										<li>￥{product.price}</li>
										<li>{product.number}</li>
										<li>￥{product.allPrice}</li>
									</ul>
								})
							}
									
						</div>
					</div>
					<div className="order-address">
						<p className="header">配送地址</p>
						<div className="address-content">
							<div>地址：{address.province}{address.city}{address.address} 邮编：{address.zip}</div>
							<div>联系人：{address.name}  联系电话：{address.phone}</div>
						</div>
					</div>
				</div> 
				:null
			}
			</div>				
		)
	}
}			
const mapStateToProps=(state)=>{
	return{
		orderDetail:state.get('order').get('orderDetail')
	}
}
const mapDispatchToProps = (storeDispatch)=>{
	return {
		mountDetail:(orderNo)=>{
			let action = actionCreater.getMountOrderDetail(orderNo);
			storeDispatch(action);
		},
		handelDeliver:(orderNo)=>{
			let action = actionCreater.gethandelDeliver(orderNo);
			storeDispatch(action);
			
		},
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Detail) ;