
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import { Breadcrumb, Form, Icon, Input, Button, Select, Upload, Modal} from 'antd';
import ProductSelect from './Product-select';
import LoadImg from './phone-load';
import MySimditor from 'common/simditor';
import {IMG_UPLOAD, IMG_DETAIL_UPLOAD} from 'api';

const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	componentDidMount(){
		if (this.props.match.params.id) {
			this.props.handleEditProduct(this.props.match.params.id)
		}
	}
	handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	    	if (this.props.match.params.id) {
	    		values.id=this.props.match.params.id
	    	}
	        this.props.handleProductSubmit(err,values);
	     
	    });
  	}
	render() {
		const { categoryId,parentCategoryId,detailContent,loadImg,int,name,price,stock }=this.props;
		// console.log('5555',detailContent);
		let fileList = [];
		if (loadImg) {
			fileList=loadImg.split(',').map((img,key)=>({
		      uid: key,
		      status: 'done',
		      url: img,
		      response: img,
		    }));
		}
		
	   
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 2,
	        },
	      },
	    };

		return (
			<div className='productSave'>
				<Breadcrumb>
				    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				    {this.props.match.params.id
				    ? <Breadcrumb.Item>编辑商品</Breadcrumb.Item>
				    : <Breadcrumb.Item>新增商品</Breadcrumb.Item>}
				</Breadcrumb>
			    <Form  className="login-form">
			        <FormItem  {...formItemLayout} label="商品名称">
			          {getFieldDecorator('name', {
			            rules: [{ required: true, message: '请输入名称' }],
			            initialValue:name
			          })(
			            <Input placeholder="名称" />
			          )}
			        </FormItem>
			        <FormItem  {...formItemLayout} label="商品描述">
			          {getFieldDecorator('int', {
			            rules: [{ required: true, message: '请输入描述' }],
			            initialValue:int
			          })(
			            <Input  placeholder="描述" />
			          )}
			        </FormItem>

					<FormItem  {...formItemLayout} 
						label="商品分类"
						required={true}
						validateStatus={this.props.ListIdValidateStatus}
						help={this.props.ListIdHelp}
					>	          
				        <ProductSelect 
				        categoryId={categoryId}
				        parentCategoryId={parentCategoryId}
				        getId={(a,b)=>{
				        	this.props.getListId(a,b)
				        }} />
	        		</FormItem>

			        <FormItem  {...formItemLayout} label="商品价格">
			          {getFieldDecorator('price', {
			            rules: [{ required: true, message: '请输入价格' }],
			            initialValue:price
			          })(
			            <Input  placeholder="元" />
			          )}
			        </FormItem>
			        <FormItem  {...formItemLayout} label="库存">
			          {getFieldDecorator('stock', {
			            rules: [{ required: true, message: '请输入件数' }],
			            initialValue:stock
			          })(
			            <Input  placeholder="件" />
			          )}
			        </FormItem>

			        <FormItem  {...formItemLayout} 
			        	label="上传图片"
			        	validateStatus={this.props.ImageValidateStatus}
						help={this.props.ImageHelp}
			        >
				        {(
				        <LoadImg 
				        	num={3} 
				        	saveAddress={IMG_UPLOAD} 
				        	fileList={fileList}
				        	LoadImg={(fileList)=>{
				        		this.props.getloadImg(fileList);
				        	}}
				        /> 
				        )}
			        </FormItem>

			        <FormItem  {...formItemLayout} label="商品详情">
			          {(
			             <MySimditor
			             	url={IMG_DETAIL_UPLOAD}
			             	LoadDetailImg={(fileContent)=>{
			             		this.props.getDetailImg(fileContent);
			             	}}
			             	detail={detailContent}
			             />
			          )}
			        </FormItem>
			       
			        <FormItem {...tailFormItemLayout } >
          				<Button 
          					type="primary"
          					onClick={this.handleSubmit}
          					loading={this.props.isCategory}
          				>新增</Button>
        			</FormItem>			  
			    </Form>		
			</div>
		)
	}
}
const mapStateToProps=(state)=>{

	return {
		isCategory:state.get('product').get('isCategory'),
		ListIdValidateStatus:state.get('product').get('ListIdValidateStatus'),
		ListIdHelp:state.get('product').get('ListIdHelp'),
		ImageValidateStatus:state.get('product').get('ImageValidateStatus'),
		ImageHelp:state.get('product').get('ImageHelp'),
		
		categoryId:state.get('product').get('SecendListId'),	
		parentCategoryId:state.get('product').get('FirstListId'),	
		loadImg:state.get('product').get('loadImg'),	
		detailContent:state.get('product').get('detailContent'),	
		int:state.get('product').get('int'),	
		name:state.get('product').get('name'),	
		order:state.get('product').get('order'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),	
	}
}
const mapDispatchToProps = (storeDispatch)=>{
	return {
		getListId:(a,b)=>{
			let action = actionCreater.getListIdAction(a,b);
			storeDispatch(action);
		},
		getloadImg:(img)=>{
			let action = actionCreater.getloadImgAction(img);
			storeDispatch(action);
		},
		getDetailImg:(content)=>{
			let action = actionCreater.getDetailImgAction(content);
			storeDispatch(action);
		},
		handleProductSubmit:(err,values)=>{
			let action = actionCreater.handleProductSubmitAction(err,values);
			storeDispatch(action);
		},
		handleEditProduct:(id)=>{
			storeDispatch(actionCreater.getEditProductAction(id));
		}
	}
}



const ProductSave = Form.create()(NormalLoginForm);
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);