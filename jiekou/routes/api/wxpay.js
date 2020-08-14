const router = require('koa-router')();
const jwt = require('jsonwebtoken')
const request = require('../../utils/request')();
const config = require('../../config/keys')
const tools = require('../../common')
//支付回调通知
router.get('/payCb',async ctx=>{
  console.log('bb')
})

//小程序支付
router.get('/wxPrepay',async ctx=>{
  // console.log(ctx.query)
  let token = ctx.header.authorization
  let decoded = jwt.decode(token,config.secretOrkey);  //解析token
  const openId = decoded.openid
  // console.log(decoded)
  const appId = config.wx.appId
  const attach = '体验酒店'
  const body = '欢迎体验酒店'
  const total_fee = ctx.query.money
  // console.log(total_fee)
  const notify_url = 'http://localhost:3000/#/api/wxpay/payCb'
  const ip = '192.168.31.77'

  // //下单处理
  let result = await tools.order(appId,attach,body,openId,total_fee,notify_url,ip)
  if(result){
    // console.log(result)
    const data = {
      data:result
    }
    ctx.success(data)
  }else {
    
  }
  
})


module.exports = router.routes()