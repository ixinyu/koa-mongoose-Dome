module.exports = function (options) {
  return async (ctx,next)=>{
      ctx.set('Access-Control-Allow-Origin', options.allowOrigin.join(','))
      ctx.set('Access-Control-Allow-Methods', options.allowMethods.join(','))
      ctx.set('Access-Control-Allow-Headers', options.allowHeaders.join(','))
      ctx.set('Access-Control-Allow-Credentials', options.allowCredentials);
      next()
  }
}