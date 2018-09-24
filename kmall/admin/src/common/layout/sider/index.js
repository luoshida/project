import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
import './index.css';
const { SubMenu } = Menu;

const { Sider } = Layout;

import { NavLink } from 'react-router-dom';

class MySider extends Component {
  render() {
    return (
      <Sider width={200} style={{ background: '#fff' }} className='sider'>
        <Menu
          mode="inline"
        >
            <Menu.Item key="1"><NavLink exact to='/'><Icon type="like" />首页</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to='/option2'>用户管理</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to='/option3'>分类管理</NavLink></Menu.Item>
            <Menu.Item key="4"><NavLink to='/product'>商品管理</NavLink></Menu.Item>
            <Menu.Item key="5"><NavLink to='/order'>订单管理</NavLink></Menu.Item>
          
        </Menu>
      </Sider>     
    )
  }
}



export default MySider;