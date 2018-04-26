let codes = require('./code')
/**
 * 根据code返回对应的msg
 * @param {code} code 
 */
let findMsgByCode = code => {
	return codes[code]
}

/**
 * 将时间戳转为标准时间
 * @param {*} s 
 * @param {*} len 
 */
function padding (s, len) {
	var length = len - (s + '').length
	for (var i = 0; i < length; i++) s = '0' + s
	return s
}
let formatDate = function (v, pattern) {
	const SIGN_REGEXP = /([yMdhsm])(\1*)/g
	const DEFAULT_PATTERN = 'yyyy-MM-dd'
	pattern = pattern || DEFAULT_PATTERN
	return pattern.replace(SIGN_REGEXP, function ($0) {
		switch ($0.charAt(0)) {
		case 'y': return padding(v.getFullYear(), $0.length)
		case 'M': return padding(v.getMonth() + 1, $0.length)
		case 'd': return padding(v.getDate(), $0.length)
		case 'w': return v.getDay() + 1
		case 'h': return padding(v.getHours(), $0.length)
		case 'm': return padding(v.getMinutes(), $0.length)
		case 's': return padding(v.getSeconds(), $0.length)
		}
	})
}

module.exports = {
	findMsgByCode,
	formatDate
}