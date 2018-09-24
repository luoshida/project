const crypto = require('crypto');


// const hash = crypto.createHash('md5');
// const hash = crypto.createHash('sha256');
// const hash = crypto.createHash('sha521');

// hash.update('test');
// console.log(hash.digest('hex'));


//'sdsds'自定义言 在此基础上加密
// const hmac = crypto.createHmac('sha256','sdsds');
// hmac.update('test');
// console.log(hmac.digest('hex'));

module.exports=(str)=>{
	const hmac=crypto.createHmac('sha256','qqqq');
	hmac.update(str);
	return hmac.digest('hex');
}