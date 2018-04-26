let jwt = require('jsonwebtoken')

/**
 * 签发token 返回签发成功的token
 * @param {签发所带的参数} param 
 */
let signJwt = (param) => {
	return new Promise ((resolve, reject) => {
		jwt.sign({ data: param }, C.jwt.secret, C.jwt.options, function(err, token) {
			if (err) reject(err)
			else resolve(token)
		})
	})
}
/**
 * 验证token 如果正确返回签发的参数
 * @param {传递过来的token} token 
 */
let verifyJwt = (token) => {
	return new Promise((resolve, reject) => {
		if (!token) reject(false)
		jwt.verify(token, C.jwt.secret,  function(err, decoded) {
			if (err) reject(err)
			else resolve(decoded)
		})
	})
}

module.exports = {
	signJwt,
	verifyJwt
}