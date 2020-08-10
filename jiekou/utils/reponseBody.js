/**
* responseBody.js
* @description 统一接口返回格式
* @param {*} option
*/
function reponseBody(option={}){
  return async function(ctx,next){
      ctx.success = function (data) {
          ctx.type = option.type || 'json'
          ctx.body = {
              code : option.successCode || 0,
              msg : data.msg || option.successMsg || 'success',
              data : data.data
          }
      }
      ctx.fail = function (msg,code) {
          ctx.type = option.type || 'json'
          ctx.body = {
              code : code || option.failCode || -1,
              msg : msg || option.successMsg || '操作失败',
          }
      }
      await next()
  }
}
module.exports = reponseBody