let fs = require('fs')

/**
 * 请求预处理
 * @param {空} 空
 */
const pre = () => {
  let pathPrefix = C.app.apiPath
  return async (ctx, next) => {
    if (ctx.request.path.startsWith(pathPrefix)) {
      ctx.rest = (code = global.C.apiCode.errCode, msg = '', data = null) => {
        ctx.response.type = 'application/json',
        ctx.response.body = { code, msg, data }
      }
      try {
        await next()
        if (!ctx.response.body) {
          // 记录错误日志
          ctx.rest(C.apiCode.errCode, T.findMsgByCode(C.apiCode.errCode))
        }
      } catch (e) {
        // 记录日志
      }
    } else {
      if (ctx.path !== '/' && !ctx.request.path.startsWith(C.app.staticPath)) {
        ctx.redirect('/')
      }
      await next()
    }
  }
}

/**
 * 初始化路由
 * @param {空} 空
 */
const init = () => {
  let router = require('koa-router')()
  addControllers(router, C.dir.controller)
  return router.routes()
}

/**
 * 扫描控制器文件
 * @param {koa-router实例} router 
 * @param {控制器目录} controllerDir 
 */
function addControllers(router, controllerDir) {
  var files = fs.readdirSync(controllerDir)
  var js_files = files.filter((file) => {
    return file.endsWith('.js')
  })

  for (var js_file of js_files) {
    console.log(`process controller: ${js_file}...`)
    let mapping = require(controllerDir + '/' + js_file)
    addMapping(router, mapping)
  }
}

/**
 * 扫描每个控制器下的所有路由方法
 * @param {koa-router实例} router 
 * @param {该文件夹下的所有控制器} mapping 
 */
function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

module.exports = {
  pre,
  init
}