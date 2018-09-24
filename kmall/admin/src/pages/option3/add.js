
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreater } from './store';
import { Breadcrumb, Form, Icon, Input, Button, Select, } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    this.props.handleCategory(values);
		  }
		});
	}
	componentDidMount(){
		this.props.handleAddCategory();
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 10 },
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
			<div className='ppp'>
				<Breadcrumb>
				    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
				    <Breadcrumb.Item>新增分类</Breadcrumb.Item>
				</Breadcrumb>
			    <Form  className="login-form">
			        <FormItem  {...formItemLayout} label="名称">
			          {getFieldDecorator('name', {
			            rules: [{ required: true, message: '请输入名称' }],
			          })(
			            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="分类名称" />
			          )}
			        </FormItem>
			        <FormItem  {...formItemLayout} label="目录">
			          {getFieldDecorator('pid', {
			            rules: [{ required: true, message: '请选择父级分类名称' }],
			          })(
				      	<Select initialValue='0' style={{ width: 120 }} >
					      <Option value="0">根目录</Option>
					      {
					      	this.props.oneLevel.map((value)=>{
					      		// console.log(value);
					      		return <Option value={value._id} key={value._id}>根目录/{value.name}</Option>					      			
					      	})
					      }  
					    </Select>			         
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
		isCategory:state.get('category').get('isCategory'),
		oneLevel:state.get('category').get('oneLevel'),
	}
}
const mapDispatchToProps = (storeDispatch)=>{
	return {
		handleCategory:(values)=>{
			let action = actionCreater.getCategoryAction(values);
			storeDispatch(action);
		},
		handleAddCategory:()=>{
			let action = actionCreater.getOneLevelCategory();
			storeDispatch(action);
		}
	}
}
const Add = Form.create()(NormalLoginForm);

export default connect(mapStateToProps,mapDispatchToProps)(Add);