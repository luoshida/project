 {{#notEmpty}}
 <div class="cart-head  clearfix">
	<ul class="head-left fl">
		<li class="head-item allSelect">
			{{#allSelect}}
			<input type="checkbox" class="select-all" checked>
			{{/allSelect}}
			{{^allSelect}}
			<input type="checkbox" class="select-all">
			{{/allSelect}}
			<span>全选</span>
		</li>
		<li class="head-item">商品</li>
	</ul>
	<ul class="head-right fr">
		<li class="head-item">售价</li>
		<li class="head-item">数量</li>
		<li class="head-item">小计</li>
		<li class="head-item">操作</li>
	</ul>
</div>
{{#cartList}}
<div class="cart-content  clearfix">
	<ul class="content-left fl">
		<li class="head-item" data-product-id='{{product._id}}'>
			{{#isSelect}}
			<input type="checkbox" class="select-one" checked>
			{{/isSelect}}
			{{^isSelect}}
			<input type="checkbox" class="select-one">
			{{/isSelect}}
		</li>
		<li class="head-item">
			<a href="./detail.html?caregoryId={{product._id}}" target="_blank">
				<img src="{{product.loadImg}}" alt="">
			</a>
		</li>
		<li class="head-item name">
			<a href="./detail.html?caregoryId={{product._id}}" target="_blank"><span>{{product.name}}</span></a>
		</li>	
	</ul>
	<ul class="content-right fr">
		<li class="head-item">
			￥{{product.price}}
		</li>
		<li class="head-item">

			<div class="count-btn" data-stock="{{product.stock}}" data-product-id="{{product._id}}">
				<span class="plus">+</span>
				<input type="text" value={{number}} id="product-number" readonly>
				<span class="minus">-</span>
			</div>
		</li>
		<li class="head-item">
			￥{{price}}
		</li>
		<li class="head-item cancell-cart" data-product-id='{{product._id}}'><i class="fa fa-trash-o"></i>删除</li>
	</ul>
</div>
{{/cartList}}
<div class="cart-foot  clearfix">
	<ul class="foot-left fl">
		<li class="head-item">
			{{#allSelect}}
			<input type="checkbox" class="select-all" checked>
			{{/allSelect}}
			{{^allSelect}}
			<input type="checkbox" class="select-all">
			{{/allSelect}}
			<span>全选</span>
		</li>
		<li class="head-item cancell-select-cart"><i class="fa fa-trash-o"></i>删除选中</li>
	</ul>
	<ul class="foot-right fr">
		<li class="head-item">总价：<span class="price">￥{{allPrice}}</span></li>
		<li class="head-item">
			<div class="submit-btn btn">去结算</div>
		</li>
		
	</ul>
</div>
{{/notEmpty}}
{{^notEmpty}}
<p class="errorMsg">购物车空空如也</p>
<a href="/" class="empty-btn btn">立即去购物</a>
{{/notEmpty}}