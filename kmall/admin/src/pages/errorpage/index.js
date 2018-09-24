

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ErrPage extends Component {
	
	render() {
		return (
			<div>
				<div className='index'>
					页面错误
				</div>
				<Link to='/'>返回首页</Link>
			</div>

		)
	}
}


export default ErrPage;