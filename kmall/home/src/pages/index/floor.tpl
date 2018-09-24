{{#floor}}
<div class="floor-box">
	{{#title}}
	<h2>{{title}}</h2>
	{{/title}}
	<ul class="floor-list clearfix">
		{{#item}}
		<li class="floor-item">
			<p>{{itemName}}</p>
			<img src={{image}} alt="">
		</li>
		{{/item}}
	</ul>
</div>
{{/floor}}