module.exports = async (ctx, next) => {
  if (ctx.request.path.startsWith(C.app.apiPath)) {
    if (ctx.request.header.hasOwnProperty('x-real-ip')) {
      let ip = ctx.request.header['x-real-ip']
      if (ip && ip.length > 0 && ip !== 'unknown') {
        ctx.realIp = ip
        await next()
        return
      }
    }
    if (ctx.request.header.hasOwnProperty('x-forwarded-for')) {
      let ip = ctx.request.header['x-forwarded-for']
      if (ip && ip.length > 0 && ip !== 'unknown') {
        ctx.realIp = ip
        await next()
        return
      }
    }
  } await next()
}