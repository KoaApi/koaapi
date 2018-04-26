let fs = require('fs')
let jwt = require('../lib/jwt')
let LoginSev = require('../models/index')

module.exports = {
  'GET /api/hello': async (ctx, next) => {
    let token = await jwt.signJwt('terry')
    Redis.set("koaApi", "欢迎使用KoaApi~~")
    Redis.hmset("test", "stu", JSON.stringify({name: 'terry'}))
    console.log(await Redis.getHm('test'))
    console.log(await Redis.getStr('koaApi'))
    try {
      console.log(await jwt.verifyJwt(token))
    } catch (e) {
      // 过期 或 错误
    }
    ctx.rest('QM88888', '欢迎使用koaApi', null)
  },
  'GET /': async (ctx, next) => {
    ctx.response.body = await new Promise(function (reslove, reject) {
      fs.readFile(C.dir.web + '/index.html', 'binary', function (err, data) {
        if (err) reject(err)
        else reslove(data)
      })
    })
  },
}