<ul class="pagination">
	{{#pagination}}
		{{#disable}}
			<li class="page-item disable" data-value={{dataValue}}>{{name}}</li>
		{{/disable}}
		{{^disable}}
			{{#active}}
			<li class="page-item active" data-value={{dataValue}}>{{name}}</li>
			{{/active}}
			{{^active}}
			<li class="page-item" data-value={{dataValue}}>{{name}}</li>
			{{/active}}
		{{/disable}}
	{{/pagination}}

</ul>