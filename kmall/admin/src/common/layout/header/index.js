import React, { Component } from 'react';

import { Layout, Menu } from 'antd';
import { GetUsername, REQUIRE, RemoveUsername } from 'util';
import { LOGOUT_LOAD } from 'api';
import './index.css'

const { SubMenu } = Menu;

const { Header } = Layout;

class MyHeader extends Component {
  constructor(props){
    super(props);
    this.handleLogout=this.handleLogout.bind(this);
  }
  handleLogout(){
    REQUIRE({
      url:LOGOUT_LOAD
    })
    .then(()=>{
      RemoveUsername();
      window.location.href='/login';
    })
  }
  render() {    
    return (
      <Header className="header">
          <div className='logo'>BACKSTAGE</div>
          <div className='userData'>
            <span>{ GetUsername() }&nbsp;</span>
            <a onClick={this.handleLogout}>&nbsp;退出</a> 
          </div>
      </Header>
    )
  }
}

export default MyHeader;