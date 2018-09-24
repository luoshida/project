
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import { Breadcrumb, Form, Icon, Input, 
		Button, Select, Upload, Modal} from 'antd';
import ProductSelect from './Product-select';
import MySimditor from 'common/simditor';
import { IMG_DETAIL_UPLOAD} from 'api';

const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		if (this.props.match.params.id) {
			this.props.handleEditProduct(this.props.match.params.id)
		}
	}
	render() {
		const { categoryId,parentCategoryId,detailContent
			,int,name,price,stock,loadImg }=this.props;

		let fileList;
		if (loadImg) {
			fileList=loadImg.split(',').map((img,key)=>(
		     <li key={key} style={{listStyle:'none',float:'left'}}>
		     	<img src={img} style={{width:100,height:100}}/>
		     </li>
		    ));
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
				    <Breadcrumb.Item>查看商品</Breadcrumb.Item>
				   
				</Breadcrumb>
			    <Form  className="login-form">
			        <FormItem  {...formItemLayout} label="商品名称">			          
			            <Input 
			            	disabled={true}
			            	value={name} />			
			        </FormItem>

			        <FormItem  {...formItemLayout} label="商品描述">			         
			            <Input  disabled={true}
			            	value={int} />			       
			        </FormItem>

					<FormItem  {...formItemLayout} label="商品分类"	>	          
				        <ProductSelect 
				        disable={true}
				        categoryId={categoryId}
				        parentCategoryId={parentCategoryId}
				        getId={(a,b)=>{
				        	this.props.getListId(a,b)
				        }} />
	        		</FormItem>

			        <FormItem  {...formItemLayout} label="商品价格">			         
			            <Input  disabled={true}
			            	value={price} />
			        </FormItem>

			        <FormItem  {...formItemLayout} label="库存"> 
			            <Input  disabled={true}
			            	value={stock} />
			        </FormItem>
			        <FormItem  {...formItemLayout} label="商品图片">
			            <ul>{fileList}</ul>
			        </FormItem>	
			        <FormItem  {...formItemLayout} label="商品详情">
			             <div 
			             dangerouslySetInnerHTML={{__html:detailContent}}
			             style={{overflow:'hidden'}}
			             >
			             </div>
			        </FormItem>			      		  
			    </Form>		
			</div>
		)
	}
}
const mapStateToProps=(state)=>{

	return {
		categoryId:state.get('product').get('SecendListId'),	
		parentCategoryId:state.get('product').get('FirstListId'),		
		detailContent:state.get('product').get('detailContent'),
		loadImg:state.get('product').get('loadImg'),	
		int:state.get('product').get('int'),	
		name:state.get('product').get('name'),	
		order:state.get('product').get('order'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),	
	}
}
const mapDispatchToProps = (storeDispatch)=>{
	return {
		handleEditProduct:(id)=>{
			storeDispatch(actionCreater.getEditProductAction(id));
		}
	}
}



const ProductSee = Form.create()(NormalLoginForm);
export default connect(mapStateToProps,mapDispatchToProps)(ProductSee);