const categoryModel = require('../model/category.js');
const articleModel = require('../model/article.js');
const path = require('path');
const fs = require('fs');
const list = require('../model/list.js');


let showlist = ()=>{
	return new Promise((resolve,reject)=>{
		categoryModel.find({})
		.sort({order:1})
		.then( data=>{
			articleModel.find({})
			.sort({click:-1})
			.limit(6)
			.then( click=>{
				let filePath = path.normalize(__dirname + '/../site-info.json')
				fs.readFile(filePath,(err,doc)=>{
					if(!err){
						let site = JSON.parse(doc);
						resolve({
							data:data,
							click:click,
							site:site
						})
					}
				})
			})
		})
	})
}
module.exports = showlist;
