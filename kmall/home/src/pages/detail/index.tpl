<div class="product-intro clearfix">
	<div class="detail-img fl">
		<div class="img-main">
			<img src={{imgMain}} alt="">
		</div>
		
		<ul class="img-list">	
			{{#loadImg}}
			<li class="img-list-item">
				<img src="{{.}}" alt="">
			</li>
			{{/loadImg}}
			
		</ul>
	</div>
	<div class="detail-content fl">
		<p class="name">{{name}}</p>
		<p class="intro">{{int}}</p>
		<p class="stock">库存:{{stock}}</p>
		<p class="price">价格:￥{{price}}</p>
		<div class="num">
			<span>数量</span>
			<input type="number" value=1 id="product-number">
			<div class="count-btn">
				<span class="plus">+</span>
				<span class="minus">-</span>
			</div>
		</div>
		<button class="detail-btn btn" id="addCart-btn">添加至购物车</button>
	</div>
	
</div>
<div class="product-detail">
	<p class="product-detail-title">商品介绍</p>
	<div class="product-detail-content clearfix">{{{detailContent}}}</div>
</div>