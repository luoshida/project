{{#notEmpty}}
<div class="cart">
	<h2 class="cart-list">商品清单</h2>
	<div class="cart-head  clearfix">
	 	<ul>
			<li class="product">商品</li>
			<li class="price">售价</li>
			<li class="number">数量</li>
			<li class="allPrice">小计</li>	
		</ul>
	</div>
	{{#cartList}}
	<div class="cart-content  clearfix">
		<ul>
			<li class="product">
				<a href="./detail.html?caregoryId={{product._id}}" target="_blank">
					<img src="{{product.loadImg}}" alt="">
				</a>
				<a href="./detail.html?caregoryId={{product._id}}" target="_blank"><p class="name">{{product.name}}</p></a>
			</li>	
			<li class="price">
				￥{{product.price}}
			</li>
			<li class="number">
				￥{{number}}
			</li>
			<li class="allPrice">
				￥{{price}}
			</li>
		</ul>
	</div>
	{{/cartList}}
	<div class="cart-foot  clearfix">
		<ul>	
			<li class="submit">
				<div class="submit-btn btn">去支付</div>
			</li>
			<li class="allCartPrice">总价：<span class="price">￥{{allPrice}}</span></li>
		</ul>
	</div>
</div>
{{/notEmpty}}
{{^notEmpty}}
<p class="errorMsg">未选择中任何商品</p>
<a href="/" class="empty-btn btn">去选购商品</a>
{{/notEmpty}}