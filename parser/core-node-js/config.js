
module.exports.supportedLangs = ['ru','uk']
module.exports.supportedULangs = ['Ru','Uk']
module.exports.default_http_host = "http://native-test.socpro.pp.ua/";
module.exports.dbConnect = {
	connectionLimit: 0,
	host : 'localhost',
	user : 'tigran_tigran',
	password : 'tigran',
	database : 'tigran_jacobs'
}
module.exports.dbPrefix = "cardinal_"
const path = require("path");

module.exports.pathTokens = path.join(path.dirname(__dirname), "application", "cache", "test.php");
module.exports.pathUsers = path.join(path.dirname(__dirname), "application", "cache", "userList.php");