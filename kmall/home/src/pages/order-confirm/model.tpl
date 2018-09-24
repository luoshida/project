<div class="add-address close">
	<div class="add-address-container">
		<div class="model-header">
			{{#edit}}
			<h2 class="model-title">编辑地址</h2>
			{{/edit}}
			{{^edit}}
			<h2 class="model-title">新增地址</h2>
			{{/edit}}
			<i class="fa fa-close close"></i>
		</div>
		<div class="model-body">
			<div class="head">
				<div class="err">
					<i class="fa fa-minus-square"></i>
					<span>xxx</span>
				</div>
			</div>
			<div class="form-item">
				<i class="fa fa-user-o"></i>
				<input type="text" name='username' placeholder="收货人姓名" value="{{edit.name}}">
			</div>      
			<div class="form-item city-item">
				<i class="fa fa-building"></i>
				<select name="province" id="province-select"> 
					
				</select>
				<select name="city" id="city-select">
					
				</select>
			</div>
			<div class="form-item">
				<i class="fa fa-map-marker"></i>
				<input type="text" name='address' placeholder="请输入详细地址" value="{{edit.address}}">
			</div>
			<div class="form-item">
				<i class="fa fa-phone"></i>
				<input type="text" name='phone' placeholder="请输入联系电话" value="{{edit.phone}}">
			</div>
			<div class="form-item">
				<i class="fa fa-envelope-o"></i>
				<input type="text" name='zip' placeholder="请输入邮编" value="{{edit.zip}}">
			</div>
			<div class="model-load">
				<button class="model-load-btn btn" id="modelr-btn">更新地址</button>
			</div>
		</div>
		
	</div>
</div>