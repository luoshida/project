
import React, { Component } from 'react';
import MyLayout from 'layout';
import { Route, Switch } from 'react-router-dom';
import ProductList from './list.js';
import ProductSave from './save.js';
import ProductSee from './see.js';

class Product extends Component {
	
	render() {
		return (
			<div className='product'>
				<MyLayout>
					<Switch>
						<Route path='/product/save/:id?' component={ ProductSave } />
						<Route path='/product/see/:id?' component={ ProductSee } />
						<Route path='/product' component={ ProductList } />
					</Switch>
				</MyLayout>
			</div>
		)
	}
}


export default Product;