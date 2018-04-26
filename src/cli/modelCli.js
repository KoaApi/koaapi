let SequelizeAuto = require('sequelize-auto')
let { mysql, dir } = require('../config')
let config = mysql
let auto = new SequelizeAuto(config.database, config.username, config.password, {
	host: config.host,
	dialect: 'mysql', //'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
	port: config.port,
	directory: dir.schema,
	indentation: 1,
	spaces: false,
	freezeTableName: config.define.freezeTableName,
	additional: {
		timestamps: false
	}
	// tables: ['code'] // 生成哪些表
})

auto.run(function (err) {
	if (err) throw err
	console.log('创建schema成功,请检查~~~')
})