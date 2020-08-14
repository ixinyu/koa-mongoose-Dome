const jwt = require('jsonwebtoken')
const config = require('../../config/keys')

async function verifyToken(ctx, next) {
  let url = ctx.url.split('?')[0]
  
  // 如果是登陆页面和注册页面就不需要验证token了
  if (url.includes('/api/login/wxlogin')) {
      await next()
  } else {

      // 否则获取到token
      let token = ctx.header.authorization
      // console.log(token)
      if (token) {
        // 如果有token的话就开始解析
        await jwt.verify(token,config.secretOrkey,async function (err) {
          if(err){
            ctx.body = {
              code: -2,
              message:'token 已过期，请重新登陆'
            }
          }else{
            await next()
          }
        })
      }else {
        ctx.body = {
          code: -2,
          message:'缺少token参数'
        }
      }
  }
}
module.exports = verifyToken