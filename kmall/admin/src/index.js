import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/index.js';

//自定义的组件 首字母必须大写
import App from './app.js'

ReactDOM.render(
	<Provider store = { store }>
		<App />
	</Provider>
	,document.getElementById('app'));