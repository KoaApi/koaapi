let jwt = require('../lib/jwt')
/**
 * jwt认证中间件
 * @param {context} ctx 
 * @param {next} next 
 */
module.exports = async (ctx, next) => {
  if (ctx.request.path.startsWith(C.app.authPath)) {
    let token = ctx.request.header['auth']
    try{
      ctx.authData = await jwt.verifyJwt(token)
      await next()
    } catch(e) {
      ctx.response.type = 'application/json',
      ctx.response.body = { code: C.apiCode.notAuthCode, msg: T.findMsgByCode(C.apiCode.notAuthCode), data: null}
    }
  } else await next()
}