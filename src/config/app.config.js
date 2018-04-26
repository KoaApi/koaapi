let path = require('path')
let serverRoot = path.dirname(__dirname)
let config = {
  app: {
    name: 'koa-api',
    port: 888,
    apiPath: '/api',
    authPath: '/api/auth',
    staticPath: '/static' 
  },
  apiCode: {
    errCode: 'QM4004',
    notAuthCode: 'QM3000',
    normalCode: 'QM8888'
  },
  dir: {
    server: serverRoot,
    web: path.join('web'),
    controller: path.join(serverRoot, 'controllers'),
    schema: path.join(serverRoot, 'models/schema'),
  },
  wechat: {
    appid: '',
    secret: ''
  },
  // jwt 详细配置请点击 https://github.com/auth0/node-jsonwebtoken
  jwt: {
    secret: 'koa-api',
    options: {
      expiresIn: '2h'
    }
  }
}
module.exports = config