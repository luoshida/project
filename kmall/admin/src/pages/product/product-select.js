
import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { REQUIRE } from 'util';
import {SALEMOUNT_LOAD} from 'api'

const Option = Select.Option;

class ProductSelect extends Component {
	constructor(props){
		super(props);
		this.state = {
		    FirstListData:[],
		    FirstListId:'',
		    SecendListData:[],
		    SecendListId:'',
		    shouldLoadSecendList:false,
		    isChanged:false
		};
	
		this.handleFirstListChange=this.handleFirstListChange.bind(this);
		this.handleSecendListChange=this.handleSecendListChange.bind(this);
		this.getListId=this.getListId.bind(this);

		// console.log(this.props.categoryId);
		// console.log(this.props.parentCategoryId);
	}
	componentDidMount(){	

		this.handleLoadFirstList()
	}
	static getDerivedStateFromProps(props, state){
		// console.log(props)
		// console.log(state)
		const FirstListIdChanged=props.parentCategoryId != state.FirstListId;
		const SecendListIdChanged=props.categoryId!=state.SecendListId;
		//新增的时候不更新state
		if ( state.FirstListId && !props.parentCategoryId && !props.categoryId) {
			return null
		}
		//分类ID没有改变 不更新state
		if ( !FirstListIdChanged && !SecendListIdChanged ) {
			return null
		}
		//编辑时已经更新过了就不更新state
		if (state.isChanged) {
			return null
		}
		if (props.parentCategoryId==0) {
			return {
			    FirstListId:props.categoryId,
			    SecendListId:'',
			    isChanged:true
			}			
		}else {
			return {
			    FirstListId:props.parentCategoryId,
			    SecendListId:props.categoryId,
			    shouldLoadSecendList:true,
			    isChanged:true
			}
		}
		return null;
	}
	componentDidUpdate(){
		if (this.state.shouldLoadSecendList) {
			this.handleLoadSecendList (this.state.FirstListId);
			this.setState({
				shouldLoadSecendList:false
			})
		}
	}
	handleLoadFirstList () {
		REQUIRE({
			url:SALEMOUNT_LOAD,
			data:{
				page:1,
				pid:0,
			}
		})
		.then((data)=>{
			// console.log(data.dataSource);
			this.setState({
				FirstListData:data.dataSource,
			})
		})
	}
	handleFirstListChange(value){
		// console.log(value);
		this.setState({
			FirstListId:value,
		    SecendListData:[],
		    SecendListId:'',
		},()=>{this.handleLoadSecendList(value);this.getListId()})
		
	}
	handleLoadSecendList (value) {
		REQUIRE({
			url:SALEMOUNT_LOAD,
			data:{
				page:1,
				pid:value,
			}
		})
		.then((data)=>{			
			this.setState({
				SecendListData:data.dataSource,
			})
		}) 
	}
	handleSecendListChange(value){
		this.setState({
			SecendListId:value,
		},()=>{this.getListId()})
	}
	getListId(){
		if (this.state.SecendListId) {
			this.props.getId(this.state.FirstListId,this.state.SecendListId)
		}else{
			this.props.getId(0,this.state.FirstListId)
		}
		
	}
	render() {
		const {FirstListData,FirstListId,SecendListData,SecendListId}=this.state;
		const FirstListOptions = FirstListData.map(
			a => <Option key={a._id} value={a._id}>{a.name}</Option>
		);
		const SecendListOptions = SecendListData.map(b => <Option key={b._id} value={b._id}>{b.name}</Option>);
		return (
      		  SecendListOptions.length ?  <div>
      			<Select 
      				// defaultValue={FirstListId} 
			        value={FirstListId}		            
		            style={{ width: 200 }} 
		           disabled={this.props.disable}
		            onChange={this.handleFirstListChange}
	            >
		          {FirstListOptions}
		        </Select>
		        <Select 
			        // defaultValue={SecendListId} 
			        value={SecendListId}
			        style={{ width: 200 }} 
			        disabled={this.props.disable}
			        onChange={this.handleSecendListChange}
			    >
		          {SecendListOptions}
		        </Select>
		       </div> :  <div>
      			<Select 
      				// defaultValue={FirstListId} 
			        value={FirstListId}				   		            
		            style={{ width: 200 }} 
		            disabled={this.props.disable}
		            onChange={this.handleFirstListChange}
	            >
		          {FirstListOptions}
		        </Select>
		        </div>	
		)
	}
}

export default ProductSelect;