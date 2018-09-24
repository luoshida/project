{{#list}}
<li class="product-item">
	<a href="./detail.html?caregoryId={{_id}}" target="_blank">
		<img src={{mainImg}} alt="">
	</a>
	<p class="product-price">￥{{price}}</p>
	<p class="product-name">{{name}}</p>

</li>
{{/list}}
{{^list}}
<p class="empty-message">你要找的商品为空</p>
{{/list}}