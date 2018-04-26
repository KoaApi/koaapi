const Koa = require('koa')
const bodyParse = require('koa-bodyparser')

global.C = require('../config')
global.T = require('../lib/util')
global.L = require('../lib/log')
global.Redis = require('./redis')
global.Db = require('./mysql')
const app = new Koa()

app.use(require('../middleware/ip'))
/**
 * 配置jwt验证
 * 作用：检验token并解析信息
 */
app.use(require('../middleware/jwt'))

/**
 * 配置log中间件
 * 作用: 记录日志
 */
app.use(require('../middleware/log'))

/**
 * 配置bodyParse中间件
 * 作用: 解析原始request请求 把解析后的参数绑定到ctx.request.body
 */
app.use(bodyParse({
	enableTypes: ['json']
}))

/**
 * 启动静态服务器中间件
 * 作用: 拦截/static的资源请求
 */
app.use(require('../middleware/static')('/static', global.C.dir.web + global.C.app.staticPath))

/**
 * 配置api接口的输出格式
 * 作用: 统一返回格式
 */
app.use(require('../middleware/router').pre())

/**
 * 路由配置初始化
 */
app.use(require('../middleware/router').init())

app.listen(global.C.app.port, () => {
	console.log('Server is running at: http://localhost:' + global.C.app.port)
})