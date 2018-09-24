<p class="list-header">订单详情</p>
<div class="order-detail">
	<div class="order">
		<p class="header">订单信息</p>
		<div class="order-message">
			{{#order}}
			<p class="orderNo">订单号：{{orderNo}}</p>
			<p>订单金额：<span class="payment">￥{{payment}}</span></p>
			<p class="creatAt">下单时间：{{createdTime}}</p>
			<p class="paymentType">支付方式：{{paymentTypeDesc}}</p>
			<p class="paymentTypeDesc">订单状态：{{statusDesc}}</p>
			{{/order}}

			{{#needpay}}
			{{#order}}
			<span class="order-payment btn">
				<a href="./payment.html?orderNo={{orderNo}}">立即支付</a>
			</span>
			{{/order}}
			{{/needpay}}
			{{#canCancell}}
			<span class="order-cancell btn">取消订单</span>
			{{/canCancell}}
			{{^canCancell}}
			<span class="cancelled-btn btn">已取消</span>
			{{/canCancell}}
		
			
		</div>
	</div>
	
	<div class="product">
		<p class="header">订单商品</p>
		<div class="product-content">
			<ul class="order-product-header">
				<li>产品名称</li>
				<li>产品图片</li>
				<li>产品价格</li>
				<li>产品数量</li>
				<li>总价</li>
			</ul>
			{{#order}}
			{{#productList}} 
			<ul class="order-product">
				<li class="name">{{name}}</li>
				<li><img src="{{loadImg}}" alt=""></li>
				<li>￥{{price}}</li>
				<li>{{number}}</li>
				<li>￥{{allPrice}}</li>
			</ul>
			{{/productList}}
				
		</div>
	</div>

	{{#address}}
	<div class="order-address">
		<p class="header">配送地址</p>
		<div class="address-content">
			<div>地址：{{province}}{{city}}{{address}}  邮编：{{zip}}</div>
			<div>联系人：{{name}}  联系电话：{{phone}}</div>
		</div>
	</div>
	{{/address}}
	{{/order}}
</div>
