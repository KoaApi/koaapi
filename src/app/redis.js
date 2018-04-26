const redis = require('redis')

let client = redis.createClient(global.C.redis)

client.auth(global.C.redis.password,function(){    
	console.log('success: redis connection successful')
})

client.on('error', function (err) {
	console.log('Error ' + err)
	global.L.logError('', {name: 'redis is warning', message: err, stack: err}, '')
})

client.getStr = function (key) {
	return new Promise((resolve, reject) => {
		client.get(key, (err, value) => {
			if (err) reject(err)
			else resolve(value)
		})
	})
}

client.getHm = function (key) {
	return new Promise((resolve, reject) => {
		client.hgetall(key, function (err, obj) {
			if (err) reject(err)
			else resolve(obj)
		})
	})
}

module.exports = client