const Sequelize = require('sequelize')

/**
 * 创建sequelize实例
 */
const sequelize = new Sequelize(C.mysql.database, C.mysql.username, C.mysql.password, {
	dialect: 'mysql',
	host: C.mysql.host,
	port: C.mysql.port,
	define: C.mysql.define,
	sync: { force: true }
})

module.exports = sequelize
