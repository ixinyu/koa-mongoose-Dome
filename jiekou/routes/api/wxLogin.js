const router = require('koa-router')();
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const request = require('../../utils/request')();
const qs = require('querystring');


router.post('/wxlogin',async ctx=>{
  const data = ctx.request.body
  // console.log(ctx.request.body)
    // 获取用户 openId
    const param = qs.stringify({
      'appid':'xxx',
      'secret':'xxx',
      'js_code':data.code,
      'grant_type':'authorization_code'
    })
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' + param
    
    let res = await request.get(url);
    let payLoad = JSON.parse(res)
    if(payLoad.openid){
      //返回token
      const token = jwt.sign(payLoad,keys.secretOrkey,{expiresIn:'2 days'})
      ctx.body = {
        code:0,
        msg:'登录成功',
        data:token
        // data:'Bearer '+token
      }
    }else {
      ctx.body = {
        code:-1,
        msg:payLoad.errmsg
      }
    }
})


module.exports = router.routes()
