const request = require('./request')();
const qs = require('querystring');


(async function() {
	const param = qs.stringify({
		'appid':'wx02739ad172c01807',
		'secret':'35a978bd4e35fff100cee210058f8360',
		'js_code':'043uXoMh062xrt1vyyLh0QDoMh0uXoMz',
		'grant_type':'authorization_code'
	})
	var url = 'https://api.weixin.qq.com/sns/jscode2session?' + param
	let res = await request.get(url);
	console.log(res);

})();