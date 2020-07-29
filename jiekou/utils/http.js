// http 请求dome

const qs = require('querystring');
const https = require('https');

const param = qs.stringify({
  'appid':'wx02739ad172c01807',
  'secret':'35a978bd4e35fff100cee210058f8360',
  'js_code':'023uLDIH0a716e2NnVJH0VSDIH0uLDIp',
  'grant_type':'authorization_code'
})
let url = 'https://api.weixin.qq.com/sns/jscode2session?' + param

/**
 * 小程序获取用户openid
 */
function http() { 
  const options = {
    method: 'GET'
  };
  
  const req = https.request(url,options, (res) => {
    console.log('状态码:', res.statusCode);
    console.log('请求头:', res.headers);
    res.setEncoding('utf-8');

    var result = ''
    res.on('data', (data) => {
      result += data
    }).on('end',()=>{
      console.log(data)
    })
    // res.on('end', function() {
    //   ctx.body = '111' 
    //   console.log('响应结束********');
    // });
  });

  req.end();
}

http();



