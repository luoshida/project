
import React, { Component } from 'react';
import { Upload, Icon, Modal} from 'antd';


class LoadImg extends Component {
	constructor(props){
		super(props);
		this.state={
			previewVisible: false,
		    previewImage: '',
		    fileList: [],
		};
		this.handlePreview=this.handlePreview.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.handleCancel=this.handleCancel.bind(this);
	}
	static getDerivedStateFromProps(props, state){
		// console.log(props.fileList);
		// console.log(state.fileList);
		if (props.fileList.length>0 && state.fileList.length==0 ) {
			return{
				fileList:props.fileList
			}
		}
		return null;
	}
	handleCancel (){
		this.setState({ previewVisible: false })
	} 

	handlePreview (file) {
		this.setState({
		  previewImage: file.url || file.thumbUrl,
		  previewVisible: true,
		});
	}
  	handleChange  ({ fileList }){
  		// console.log(fileList);
  		this.setState({ fileList },()=>{
  			this.props.LoadImg(
  				fileList.map((value)=>{
  					return value.response
  				}).join(',')
  			)
  		})
  	} 
	render() {
//处理上传的照片
	    const { previewVisible, previewImage, fileList } = this.state;
	    const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">Upload</div>
	      </div>
	    );
		return (			
	        <div className="clearfix">
				<Upload
				  action={ this.props.saveAddress }
				  listType="picture-card"
				  fileList={fileList}
				  onPreview={this.handlePreview}
				  onChange={this.handleChange}
				  withCredentials={true}
				>
				  {fileList.length >=  this.props.num  ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
				  <img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>       			
		)
	}
}

export default LoadImg;