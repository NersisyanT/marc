const path = require("path");
const fs = require("fs");
const { importExportAll } = require("./exportFrom")
importExportAll(module.exports, './config')
importExportAll(module.exports, './connect')
importExportAll(module.exports, './query')
module.exports.db = {}
module.exports.moment = require("moment");
module.exports.dateFns = {}
module.exports.dateFnsLocale = {}
importExportAll(module.exports.db, './query')
importExportAll(module.exports, './helper')
importExportAll(module.exports, './php')
importExportAll(module.exports, './express')
importExportAll(module.exports.dateFnsLocale, 'date-fns/locale')
importExportAll(module.exports.dateFns, 'date-fns')
// import { es, ru } from 'date-fns/locale'

const telegram = require('telegram-bot-api');
const apiTelegram = new telegram({
    token: '846564589:AAE7ox3g7n69mXYjKwLqOQfzwr493R-jVME',
});
const idMessTelegram = {
	"Валера": '335149660', // Валера
	"Андрей": '213895237' // Андрей
}
const splitByCount = (mess, count) => {
	let chunks = [];
	for (let i = 0, charsLength = mess.length; i < charsLength; i += count) {
		chunks.push(mess.substring(i, i + count));
	}
	return chunks;
}
const splitByLine = (inputStr, maxLength) => inputStr.split('\n').reduce((acc, item, index) => {
  if(index === 0) {
   acc.arr.push(item)
   return acc
  }
  
  if(acc.arr[acc.index].length + item.length <= maxLength){
   acc.arr[acc.index] = `${acc.arr[acc.index]}\n${item}`
  } else {
   acc.arr.push(item)
   acc.index++
  }
  return acc
}, {arr: [], index: 0}).arr
module.exports.telegram = (receiver, mess) => {
	if(typeof mess === "undefined") {
		mess = receiver;
		receiver = Object.values(idMessTelegram)
	}
	if(typeof receiver === "string") {
		if(typeof(idMessTelegram[receiver])==="undefined") {
			receiver = Object.values(idMessTelegram)
		} else {
			receiver = [idMessTelegram[receiver]]
		}
	}
	for(let i=0;i<receiver.length;i++) {
		if(mess.length>4096) {
			const parts = splitByLine(mess, 4090)
			for(let z=0;z<parts.length;z++) {
				setTimeout((z) => {
					apiTelegram.sendMessage({
						chat_id: receiver[i],
						text: parts[z]
					}).catch(function(err) {
						console.error('core noty error', err, mess);
					});
				}, 100*z, z)
			}
		} else {
			apiTelegram.sendMessage({
				chat_id: receiver[i],
				text: mess
			}).catch(function(err) {
				console.error('core noty error', err, mess);
			});
		}
	}
}

module.exports.dbDefault = () => {
	module.exports.db.configDB(module.exports.dbConnect, module.exports.dbPrefix)
}
module.exports.db.dbDefault = () => {
	module.exports.db.configDB(module.exports.dbConnect, module.exports.dbPrefix)
}
module.exports.db.escapeCardinal = (data) => {
	data = module.exports.db.escapeDB(data)
	if(`${data}`.substr(0, 1)=="'") {
		return data;
	}
	return `'${data}'`;
}
module.exports.getDataLang = (data, lang) => {
	if(typeof(lang)==="undefined") {
		throw new Error('lang not set')
		return;
	}
	let arr = data.constructor()
	lang = module.exports.ucFirst(lang)
	for(var key in data) {
		const keyData = module.exports.ucFirst(key.substring(key.length-2))
		if(!module.exports.in_array(keyData, module.exports.supportedULangs)) {
			arr[key] = data[key]
		} else if(keyData===lang) {
			const partKeyData = key.substring(0, key.length-2);
			arr[partKeyData] = data[key]
		}
	}
	return arr
}
function isObject(obj) {
  return obj === Object(obj);
}
module.exports.choiceLang = (currentLang, valueLang, defaults = '') => {
	if(isObject(valueLang)) {
		return valueLang[Object.keys(valueLang).find(function(key) {
			return key==currentLang
		})] || defaults
	} else {
		return defaults;
	}
}
module.exports.DS = path.sep
let configAll = {}
module.exports.env = (pathToFile, file = ".env") => {
	if(!pathToFile) {
		return {};
	}
	if(pathToFile.substring(pathToFile.length-4, pathToFile.length)!==file) {
		pathToFile = path.join(pathToFile, file);
	}
	if(typeof(configAll[pathToFile])==="undefined") {
		configAll[pathToFile] = {}
	}
	if(fs.existsSync(pathToFile)) {
		try {
			const data = module.exports.file_get_contents(pathToFile);
			const json = JSON.parse(data);
			configAll[pathToFile] = Object.assign(configAll[pathToFile], json);
		} catch(e) {}
	}
	return configAll[pathToFile]
}
module.exports.envSet = (pathToFile, key, val, file = ".env") => {
	if(pathToFile.substring(pathToFile.length-4, pathToFile.length)!==file) {
		pathToFile = path.join(pathToFile, file);
	}
	if(typeof(configAll[pathToFile])==="undefined") {
		return false;
	}
	if(typeof(key)==="string") {
		configAll[pathToFile][key] = val;
	} else if(isObject(key)) {
		Object.assign(configAll[pathToFile], key);
	} else {
		throw new Error("key is type "+typeof(key))
		return;
	}
	module.exports.file_put_contents(pathToFile, JSON.stringify(configAll[pathToFile], null, 4))
}