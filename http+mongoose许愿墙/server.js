
const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');
const url = require('url');
const focusData = require('./focusData.js');
const queryString = require('querystring');
const swig = require('swig');

const server = http.createServer((req,res)=>{

	let reqUrl = url.parse(req.url,true);

	let pathname = reqUrl.pathname;

	let fileName = req.url;

	if(pathname === '/index.html' || pathname === '/'){//显示首页
		focusData.get((err,data)=>{ 
			if(!err){
				// let html = `<!DOCTYPE html>
				// <html lang="en">
				// <head>
				// 	<meta charset="UTF-8">
				// 	<title>Document</title>
				// 	<link rel="stylesheet" href="css/index.css">
				// </head>
				// <body>
				// 	<div class="wool">`
				// 	data.forEach((val)=>{
				// 		html +=`<div class="box" style="background-color: ${val.color}">
				// 			<a href="javascript:;" class="down" data-id="${val.id}"></a>
				// 			${val.content}
				// 		</div>`
				// 	})
						
				// 	html +=`</div>
					
				// 	<div class="input">
				// 		<input type="text" name="intr" class="intr" ></input>
				// 		<button class="btn">点击许愿</button>
				// 	</div>
				// </body>
				// <script src="js/jquery-1.12.4.js"></script>
				// <script src="js/jquery.pep.js"></script>
				// <script src="js/index.js"></script>
				// </html>`;
				var swig  = require('swig');
				var template = swig.compileFile(__dirname+'/wool/index.html');
				var html = template({
				    data: data,
				});
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(html);	
			}else{
				console.log(err);
			}
		});				
	}else if(pathname === '/add' && req.method.toUpperCase() === 'POST'){
		var body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		});
		req.on('end',()=>{
			let obj = queryString.parse(body);
			
			focusData.add(obj,(err,data)=>{
				if (!err) {
					var result={
						status:1,
						data:data
					}
				}else{
					var result={
						status:2,
						message:'添加失败'
					}
				}
				res.end(JSON.stringify(result));
			})
		})
	}else if(pathname === '/del'){ 
		let obj = url.parse(req.url,true).query;
		// console.log(req.url);
		// console.log(url.parse(req.url,true));
		// console.log(obj);
		focusData.remove(obj.id,(err)=>{
			if (!err) {
				var result = {status:1}
				res.end(JSON.stringify(result));
			}
		});
		
	}else{
		//静态资源处理
		//如果用户的请求是文件夹的话,就返回文件夹下面的index.html
		if(fileName.lastIndexOf('.') == -1){//文件夹
			fileName = fileName + '/index.html';
		}

		let filePath = path.normalize(__dirname + '/wool/'+fileName);
		let fileExtName = path.extname(filePath);

		fs.readFile(filePath,(err,data)=>{
			if(!err){
				let mimeType = mime[fileExtName] || 'text/plain';
				res.setHeader('Content-Type', mimeType+';charset=UTF-8');
				res.end(data);
			}else{
				res.setHeader('Content-Type', 'text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('<h1>页面走丢了。。。。</h1>')
			}
		});		
	}
	

});

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})