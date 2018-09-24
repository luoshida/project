 const fs = require('fs');
const uuidv1 = require('uuid/v1');
 
const filePath = './data.json';
var getRandomColor = function(){
    return  '#' +
    (function(color){
        return (color += '0123456789abcdef'[Math.floor(Math.random()*16)])
        && (color.replace(/^0/,"").length == 6) ?  color : arguments.callee(color);
    })('');
}
let add = (options,callback)=>{
    fs.readFile(filePath,(err,data)=>{
        if(!err){
            let obj = JSON.parse(data);
            options.id = uuidv1();
            options.color = getRandomColor();
            obj.push(options);
            let str = JSON.stringify(obj);
 
            fs.writeFile(filePath,str,(err)=>{
                if(!err){
                    callback(null,options);
                }else{
                    callback(err);
                }
            })
 
        }else{
            callback(err);
        }
    })
}
  
let get = (callback)=>{
    fs.readFile(filePath,(err,data)=>{
        if(!err){
            let obj = JSON.parse(data);
            callback(null,obj);
        }else{
            callback(err);
        }
    });
}
 
let remove = (id,callback)=>{
    fs.readFile(filePath,(err,data)=>{
        if(!err){
            let obj = JSON.parse(data);
            let newObj = obj.filter((val)=>{
                return val['id'] != id
            });
            let str = JSON.stringify(newObj);
            fs.writeFile(filePath,str,(err)=>{
                if(!err){
                    callback(null,newObj);
                }else{
                    callback(err);
                }
            })
         
        }else{
            callback(err);
        }
    });
}
 
module.exports = {
    get:get,
    add:add,
    remove:remove
}
