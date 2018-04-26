var log4js = require('log4js')
var logConfig  = require('../config')
log4js.configure(logConfig)

var logUtil = {}
var errorLogger = log4js.getLogger('error')
var sucessLogger = log4js.getLogger('success')
var warnLogger = log4js.getLogger('warn')

/**
 * 封装错误日志
 * @param {context} ctx 
 * @param {错误信息} error 
 * @param {响应时间} resTime 
 */
logUtil.logError = function (ctx, error, resTime) {
	if (error) {
		errorLogger.error(formatError(ctx, error, resTime))
	}
}

/**
 * 封装响应日志
 * @param {context} ctx 
 * @param {响应时间} resTime 
 */
logUtil.logResponse = function (ctx, resTime) {
	if (ctx) {
		sucessLogger.info(formatRes(ctx, resTime))
	}
}

/**
 * 封装警告日志
 * @param {context} ctx 
 * @param {响应时间} resTime 
 */
logUtil.logWarn = function (ctx, resTime) {
	if (ctx) {
		warnLogger.warn(formatWarn(ctx, resTime))
	}
}

/**
 * 格式化响应日志
 * @param {context} ctx 
 * @param {响应时间} resTime 
 */
var formatRes = function (ctx, resTime) {
	var logText = new String()
	//响应日志开始
	logText += '\n' + '*************** success log start ***************' + '\n'
	//添加请求日志
	logText += formatReqLog(ctx.request, resTime, ctx.realIp)

	//响应状态码
	logText += 'response status: ' + ctx.status + '\n'

	//响应内容
	logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n'

	//响应日志结束
	logText += '*************** response log end ***************' + '\n'

	return logText
}

/**
 * 格式化警告日志
 * @param {context} ctx 
 * @param {响应时间} resTime 
 */
var formatWarn = function (ctx, resTime) {
	var logText = new String()
	//响应日志开始
	logText += '\n' + '*************** warning log start ***************' + '\n'
	//添加请求日志
	logText += formatReqLog(ctx.request, resTime, ctx.realIp)

	//响应状态码
	logText += 'response status: ' + ctx.status + '\n'

	//响应内容
	logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n'

	//响应日志结束
	logText += '*************** warning log end ***************' + '\n'

	return logText
}

/**
 * 格式化错误日志
 * @param {context} ctx 
 * @param {响应时间} resTime 
 */
var formatError = function (ctx, err, resTime) {
	var logText = new String()

	//错误信息开始
	logText += '\n' + '*************** error log start ***************' + '\n'
	//添加请求日志
	ctx ? logText += formatReqLog(ctx.request, resTime, ctx.realIp) : ''
	//错误名称
	logText += 'err name: ' + err.name + '\n'
	//错误信息
	logText += 'err message: ' + err.message + '\n'
	//错误详情
	logText += 'err stack: ' + err.stack + '\n'
	//错误信息结束
	logText += '*************** error log end ***************' + '\n'

	return logText
}

/**
 * 格式化请求日志
 * @param {context} ctx 
 * @param {响应时间} resTime 
 */
var formatReqLog = function (req, resTime, realIp) {
	var logText = new String()
	var method = req.method
	//访问方法
	logText += 'request method: ' + method + '\n'
	//请求原始地址
	logText += 'request originalUrl:  ' + req.originalUrl + '\n'
	//客户端ip
	logText += 'request client ip:  ' + realIp + '\n'
	//请求参数
	if (method === 'GET') {
		logText += 'request query:  ' + JSON.stringify(req.query) + '\n'
	} else {
		logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n'
	}
	//服务器响应时间
	logText += 'response time: ' + resTime + '\n'
	return logText
}

module.exports = logUtil