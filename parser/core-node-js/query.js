const mysql = require("mysql");
const { createPool } = mysql
let connection;
let poolConnection;
let configMysql;
let defaultPrefixDB = ''

const query = (sql, event) => {
	return new Promise((resp, rej) => {
		connection.query(sql.replace(new RegExp("{{(.+?)}}", "g"), "`"+defaultPrefixDB+"$1`"), (error, results, fields) => {
			if(error) {
				if(error.code === "PROTOCOL_ENQUEUE_AFTER_QUIT" || error.code === 'PROTOCOL_CONNECTION_LOST' || error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') { // Connection to the MySQL server is usually
					reconnect(() => {
						query(sql, event).then(resp).catch(rej);
					});
					return;
				} else {
					console.error('query code', error.code)
					rej(error)
					return;
				}
			}
			if(event) {
				event(results);
			}
			resp({ results, fields })
		});
	})
}
const doquery = (sql, all = false) => {
	return new Promise((resp, rej) => {
		connection.query(sql.replace(new RegExp("{{(.+?)}}", "g"), "`"+defaultPrefixDB+"$1`"), (error, results, fields) => {
			if(error) {
				if(error.code === "PROTOCOL_ENQUEUE_AFTER_QUIT" || error.code === 'PROTOCOL_CONNECTION_LOST' || error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') { // Connection to the MySQL server is usually
					reconnect(() => {
						doquery(sql, all).then(resp).catch(rej);
					});
					return;
				} else {
					console.error('query code', error.code)
					rej(error)
					return;
				}
			}
			resp(all ? (results.map ? results.map(item => ({...item})) : results) : (results.map ? results.map(item => ({...item})) : results)[0])
		});
	})
}
const reconnect = (fn) => {
	return new Promise((resp, rej) => {
		poolConnection = createPool(configMysql);
		poolConnection.getConnection(function(err, conn) {
			connection = conn;
			if(typeof(fn)!=="undefined") {
				fn();
			}
			resp(true)
			conn.on('error', async (err) => {
				if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT" || err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') { // Connection to the MySQL server is usually
					await reconnect();
				} else { // connnection idle timeout (the wait_timeout
					throw err; // server variable configures this)
				}
			});
		});
	})
}
const connect = (config) => {
	configMysql = config;
	return new Promise((resolve, reject) => {
		poolConnection = createPool(config);
		poolConnection.getConnection(function(err, conn) {
			if(err) throw new Exception(err);
			connection = conn;
			resolve(conn);
			conn.on('error', (err) => {
				if(err.code === 'PROTOCOL_CONNECTION_LOST') {
					console.warn('lost');
					connect(config);
				} else {
					console.error(err);
					reject(err);
				}
			});
		});
	});
}
const connectEnd = () => {
	if(connection===undefined || poolConnection===undefined) {
		return false;
	}
	poolConnection.end()
	connection.release()
	return true;
}
const create = (config) => {
	if(connection===undefined || poolConnection===undefined) {
		configMysql = config;
		return new Promise((resolve, reject) => {
			poolConnection = createPool(config);
			poolConnection.getConnection(function(err, conn) {
				connection = conn;
				if(err) {
					reject(err)
					throw new Error(err);
				}
				conn.on('error', (err) => {
					if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT" || err.code === 'PROTOCOL_CONNECTION_LOST' || error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') { // Connection to the MySQL server is usually
						reconnect();
					} else { // connnection idle timeout (the wait_timeout
						reject(err);
						throw err; // server variable configures this)
					}
				});
				resolve()
			});
		});
	}
}

module.exports.openDB = async (config) => {
	if(connection===undefined || poolConnection===undefined) {
		await create(config || configMysql)
	}
}
module.exports.configDB = (config, defaultPrefix = '') => {
	configMysql = config;
	defaultPrefixDB = defaultPrefix
}

module.exports.reconnectDB = async () => {
	connectEnd()
	await reconnect()
}
module.exports.createDB = create;
module.exports.doqueryDB = doquery;
module.exports.openConnect = connect;
module.exports.closeConnect = connectEnd;
module.exports.queryDB = query;
module.exports.escapeDB = mysql.escape
module.exports.escape = (data) => {
	const i = mysql.escape(data)
	if(i.substring(0, 1)=="'") {
		return i;
	}
	return "'"+i+"'"
}