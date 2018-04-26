let appConfig = require('./app.config')
let redisConfig = require('./redis.config')
let dbConfig = require('./db.config')
let logConfig = require('./log.config')

module.exports = Object.assign({}, appConfig, redisConfig, dbConfig, logConfig)