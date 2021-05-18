
const { uksort, uasort, strnatcmp, urldecode, filemtime } = require("./php")
module.exports.FormData = require('form-data')
module.exports.interval = require('interval-promise')
module.exports.intervalCore = (fn, timeout, obj = {}, addOptions = {}) => {
	if(typeof(addOptions.fnCheck)!=="undefined") {
		module.exports.interval(async () => {
			await new Promise((resp) => {
				if(addOptions.fnCheck()) {
					fn()
					if(typeof(addOptions.fnSleep)!=="undefined") {
						const timer = setTimeout(() => {
							if(typeof(addOptions.onCompleted)!=="undefined") {
								addOptions.onCompleted()
							}
							resp(true)
						}, addOptions.fnSleep);
					} else {
						if(typeof(addOptions.onCompleted)!=="undefined") {
							addOptions.onCompleted()
						}
						resp(true)
					}
				} else {
					resp(true);
				}
			})
		}, timeout, Object.assign({ stopOnError: false }, obj))
	} else {
		module.exports.interval(fn, timeout, Object.assign({ stopOnError: false }, obj))
	}
}
const { API } = require("./connect")
const { pathTokens, pathUsers } = require("./config")

module.exports.formatToPhone = (phone) => {
	let dataItem = phone.replace(new RegExp("[^0-9]+", "g"), "")
	if(dataItem.substring(0, 1)=="0") {
		dataItem = "38"+dataItem
	} else if(dataItem.substring(0, 1)=="8") {
		dataItem = "3"+dataItem
	}
	dataItem = "+"+dataItem
	return dataItem
}
module.exports.phoneFormat = (data) => {
	return data.replace(/^\+(\d{2})(\d{3})(\d{3})(\d{4,})$/g, "+$1 $2 $3 $4")
}
class Validator {
	empty(data) {
		return (typeof(data)==="undefined" || !data)
	}
	phone(phone) {
		return typeof str === 'string' && /(\+380)([0-9]{9})$/g.test(str)
	}
	json($str) {
		const $checkStr = $str.replace(' ', '')
		$str = ''
		return (
		  typeof $checkStr === 'string' &&
		  ($checkStr === '""' ||
		    $checkStr === '[]' ||
		    $checkStr === '{}' ||
		    ($checkStr[0] === '"' && $checkStr.substring($checkStr.length - 1) === '"') ||
		    ($checkStr[0] === '[' && $checkStr.substring($checkStr.length - 1) === ']') ||
		    ($checkStr[0] === '{' && $checkStr.substring($checkStr.length - 1) === '}'))
		)
	}
	isName(string) {
		return typeof string === 'string' && /^[а-яА-ЯЄєЇїІі'a-zA-Z ]+$/g.test(string)
	}
	phone(str) {
		return typeof str === 'string' && /(\+380)([0-9]{9})$/g.test(str)
	}
	uuid4(uuid) {
		return typeof uuid === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/g.test(uuid)
	}
	isNumber(data) {
		return !isNaN(data)
	}
}
module.exports.Validator = new Validator()
module.exports.sortByKey = (arr) => {
	uksort(arr, strnatcmp);
	return arr;
}
module.exports.sortByValue = (arr) => {
	uasort(arr, strnatcmp);
	return arr;
}
module.exports.parseInteger = (number, defaultValue) => {
  const data = parseInt(`${number}`, 10)
  if (!Number.isNaN(data)) {
    return data
  }
  return defaultValue
}
module.exports.parseFloater = (number, defaultValue = 0) => {
  const data = parseFloat(`${number}`)
  if (!Number.isNaN(data)) {
    return data
  }
  return defaultValue
}
const path = require("path");
module.exports.joinPath = (pather) => {
	return path.join(path.dirname(__dirname),  pather)
}
module.exports.clearCache = (link) => {
	const path = urldecode(link);
	let p;
	p = path.split("?");
	p = p[0];
	if(link.indexOf("?")>-1) {
		link = link.split("?")[0]
	}
	return link+"?"+filemtime(module.exports.joinPath(p))
}
module.exports.isObject = (obj) => {
  return obj === Object(obj);
}

module.exports.getFieldsInUser = async (phone, fields, $default = false) => {
	const infoAPI = await API.post(`http://localhost:5120/users${pathUsers}`, {
		"type": "getInUsersFields",
		"keys": [phone],
		fields,
	})
	if(typeof(infoAPI.data)!=="undefined" && typeof(infoAPI.data.users)!=="undefined" && typeof(infoAPI.data.users[phone])!=="undefined") {
		return infoAPI.data.users[phone]
	} else {
		return $default;
	}
}
module.exports.getByToken = async (token) => {
	const infoAPI = await API.post(`http://localhost:5120/token${pathTokens}`, {
		"type": "findByToken",
		"token": token
	})
	if(typeof(infoAPI.data)!=="undefined" && typeof(infoAPI.data.success)!=="undefined" && infoAPI.data.success) {
		return infoAPI.data.result
	} else {
		return { error: "not_load", dataReceived: infoAPI.data }
	}
}
module.exports.cardinalUserEditAll = (phone, data) => {
	const sendData = [];
	const keys = Object.keys(data);
	for(let i=0;i<keys.length;i++) {
		sendData.push({ "field": keys[i], "val": data[keys[i]] });
	}
	API.post(`http://localhost:5120/users${pathUsers}`, {
		"type": "changeFields",
		"key": phone,
		data: sendData,
	}).catch(e => {
		console.error('error send save user', e)
	})
}
let datas = {}
module.exports.updateCheck = (root, val) => {
	if(typeof(datas[root])==="undefined") {
		datas[root] = {}
	}
	return typeof(datas[root][val])!=="undefined";
}
module.exports.updateGet = (root, val) => {
	if(typeof(datas[root])==="undefined") {
		datas[root] = {}
	}
	if(typeof(datas[root][val])==="undefined") {
		return false;
	}
	return datas[root][val];
}
module.exports.updateSet = (root, name, val) => {
	if(typeof(datas[root])==="undefined") {
		datas[root] = {}
	}
	datas[root][name] = val;
}
module.exports.excel2JSON = (obj) => {
	const reader = require('convert-excel-to-json')
	return reader(obj);
}
module.exports.json2xls = (obj) => {
	const reader = require('json2xls')
	return reader;
}
module.exports.json2csv = (obj) => {
	const reader = require('json-2-csv')
	return reader;
}