import React, { Component } from 'react';
import Simditor from 'simditor';
import $ from 'jquery';

import './simditor.css';
class MySimditor extends Component { 
  constructor(props){
    super(props);
    this.state={
      isLoaded:false
    }
    this.toolbar =[
              'title',
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'fontScale',
              'color',
              'ol' ,
              'ul' ,
              'blockquote',
              'code',
              'table',
              'link',
              'image',
              'hr',
              'indent',
              'outdent',
              'alignment',
            ]
    $.ajaxSetup({
        xhrFields: {
          withCredentials: true
        }
    })
  }
  componentDidMount(){
    this.editor = new Simditor({
      textarea: $(this.textarea), 
      toolbar:this.toolbar,
      toolbarFloat:false,
      upload:{
        url: this.props.url,
        fileKey: 'upload'
      }           
    });
    this.editor.on('valuechanged',()=>{
      this.setState({
        isLoaded:true
      },()=>{
        this.props.LoadDetailImg(this.editor.getValue())
      })
      
    })
  }
  componentDidUpdate(){
    if (this.props.detail && !this.state.isLoaded) {
      this.editor.setValue(this.props.detail);
      this.setState({
        isLoaded:true
      })
    }
  }
  render() { 
    return (
      <textarea ref={(textarea)=>{this.textarea=textarea}} 
      ></textarea>
    )
  }
}

export default MySimditor;