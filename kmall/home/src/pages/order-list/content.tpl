
	<p class="list-header">订单列表</p>
	{{#order}}
	<div class="order">
		<div class="order-item">
			<div class="order-message">
				<p class="orderNo fl">订单号：{{orderNo}}</p>
				<p class="payment fl">订单金额：￥{{payment}}</p>
				<p class="payment fl">订单状态：{{statusDesc}}</p>
				<div class="fr"><a class="order-detail" href="./order-detail.html?orderNo={{orderNo}}">查看订单详情</a></div>
				
			</div>
			<ul class="order-product-header">
				<li>产品名称</li>
				<li>产品图片</li>
				<li>产品价格</li>
				<li>产品数量</li>
				<li>总价</li>
				<li>小计</li>
			</ul>
			{{#productList}} 
			<ul class="order-product">
				<li class="name">{{name}}</li>
				<li><img src="{{loadImg}}" alt=""></li>
				<li>￥{{price}}</li>
				<li>{{number}}</li>
				<li>￥{{allPrice}}</li>
			</ul>
			{{/productList}}
			<ul class="order-product-footer">
				<li class="fl">总价</li>
				<li class="fr payment">￥{{payment}}</li>
			</ul>
		</div>
		{{#address}}
		<div class="order-address">
			<div>地址：{{province}}{{city}}{{address}}</div>
			<div>联系人：{{name}} 联系电话：{{phone}}</div>

		</div>
		{{/address}}
	</div>
	{{/order}}
