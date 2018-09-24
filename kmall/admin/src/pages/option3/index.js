
import React, { Component } from 'react';
import MyLayout from 'layout';
import { Route, Switch } from 'react-router-dom';
import List from './list.js';
import Add from './add.js';

class Option3 extends Component {
	
	render() {
		return (
			<div className='option3'>
				<MyLayout>
					<Switch>
						<Route path='/option3/add' component={ Add } />
						<Route path='/option3/:pid?' component={ List } />
					</Switch>
				</MyLayout>
			</div>
		)
	}
}


export default Option3;