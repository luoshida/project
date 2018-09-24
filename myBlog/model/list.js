
/*
options = {
	page: //需要显示的页码
	model: //操作的数据模型
	sort: //排序,
	populate:[]
}
*/

let list = (options)=>{

	return new Promise((resolve,reject)=>{
		//需要显示的页码
		
		let page = 1;

		if(!isNaN(parseInt(options.page))){
			page = parseInt(options.page);
		}
		if(page <= 0){
			page = 1;
		}
		let limit = 2;
		
		if (!options.query) {
			qqqq={}
		}else{
			qqqq=options.query;
		}
		
		options.model.countDocuments(qqqq)
		.then((count)=>{

			let pages = Math.ceil(count / limit);
			if(page > pages){
				page = pages;
			}
			if(pages == 0){
				page = 1;
			}
			let list = [];

			for(let i = 1;i<=pages;i++){
				list.push(i);
			}

			let skip = (page - 1)*limit;

			let query = options.model.find(qqqq);
			if(options.populate){
				for(let i = 0;i<options.populate.length;i++){
					query = query.populate(options.populate[i])
				}
			}
			query
			.sort(options.sort)
			.skip(skip)
			.limit(limit)
			.then((data)=>{
				
				resolve({
					data:data,
					page:page*1,
					list:list,
					pages:pages
				})		
			})
		})
	});
}
module.exports = list;