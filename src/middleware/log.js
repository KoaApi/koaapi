/**
 * 有请求后记录日志
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports = async (ctx, next) => {
  if (ctx.request.path.startsWith(C.app.apiPath)) {
	  const start = new Date()
    var ms
	  try {
      await next()
      ms = new Date() - start
      if (ctx.response && ctx.response.body && ctx.response.body.code !== C.apiCode.errCode && ctx.response.body.code !== C.apiCode.notAuthCode) global.L.logResponse(ctx, ms)
      else global.L.logWarn(ctx, ms)
	  } catch (error) {
		  ms = new Date() - start
		  global.L.logError(ctx, error, ms)
  	}
  } else await next()
}