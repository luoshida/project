

import React, { Component } from 'react';

import './app.css';

import {GetUsername} from 'util';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Index from 'pages/index'; 
import Login from 'pages/login'; 
import Option2 from 'pages/option2'; 
import Option3 from 'pages/option3'; 
import Product from 'pages/product'; 
import Order from 'pages/order'; 
import ErrPage from 'pages/errorpage'; 

const ProtectedRoute=({component:Component,...rest})=>(
	<Route {...rest} render={
		props=>(GetUsername() ? <Component {...props} /> : <Redirect to="/login" />)
	} />
)

const LoginRoute=({component:Component,...rest})=>{
	if (GetUsername()) {
		return <Redirect to='/' />
	}else{
		return <Route {...rest} component={Component} />
	}
}
class App extends Component {
	
	render() {
		return (
			<Router forceRefresh={ true }>
				<div>
					<Switch>
						<ProtectedRoute exact path='/' component={ Index } />
						<ProtectedRoute path='/option2' component={ Option2 } />
						<ProtectedRoute path='/option3' component={ Option3 } />
						<ProtectedRoute path='/product' component={ Product } />
						<ProtectedRoute path='/order' component={ Order } />

						<LoginRoute path='/login' component={ Login } />
						<Route component={ ErrPage } />
					</Switch>	
				</div>
			</Router>
		)
	}
}

export default App;