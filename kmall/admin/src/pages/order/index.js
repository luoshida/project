
import React, { Component } from 'react';
import MyLayout from 'layout';
import { Route, Switch } from 'react-router-dom';
import OrderList from './list.js';
import OrderDetail from './detail.js';

class Order extends Component {
	
	render() {
		return (
			<div className='order'>
				<MyLayout>
					<Switch>
						<Route path='/order/detail/:orderNo' component={ OrderDetail } />
						<Route path='/order' component={ OrderList } />
					</Switch>
				</MyLayout>
			</div>
		)
	}
}


export default Order;