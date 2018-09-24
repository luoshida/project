<div class="panel">
	<h2 class="panel-header">送货地址</h2>
	<div class="panel-body clearfix">
		{{#address}}
		{{#isActive}}
		<div class="shopping-item active fl">
		{{/isActive}}
		{{^isActive}}
		<div class="shopping-item fl">
		{{/isActive}}
			<h3 class="shopping-title">{{province}} {{city}} {{name}}</h3>
			<p class="shopping-detail">{{address}}</p>
			<div class="shopping-footer hide" data-address-id="{{_id}}">
				<span class="edit">编辑</span>
				<span class="cancell">删除</span>
			</div>
		</div>
		{{/address}}
		<div class="shopping-add fl">
			<i class="fa fa-plus"></i>
			<div class="shopping-add-address">添加地址</div>
		</div>
	</div>
</div>
