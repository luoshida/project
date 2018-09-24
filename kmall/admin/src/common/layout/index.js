import React, { Component } from 'react';

import { Layout } from 'antd';

const { Content} = Layout;

import  MyHeader  from 'layout/header';
import  MySider  from 'layout/sider';

class MyLayout extends Component {
  render() {
    return (
      <div className='layout'>
         <Layout>
          <MyHeader />
          <Layout>
            <MySider /> 
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}



export default MyLayout;