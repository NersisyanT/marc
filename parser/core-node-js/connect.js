const FormData = require("form-data")
module.exports.fetch = (a, b, c) => {
	const fetch = require("node-fetch")
	return fetch(a, b, c)
}
const axios = require("axios")
const API = axios.create({
	timeout: 20000,
	baseUrl: 'http://localhost/',
	headers: {},
	validateStatus: function (status) {
		return status >= 200 && status < 600; // default
	},
	'maxContentLength': Infinity,
	'maxBodyLength': Infinity
});

const obj2fd = (obj, form, namespace) => {
  let fd = form || new FormData()
  let formKey

  for (let property in obj) {
    //if (obj.hasOwnProperty(property) && obj[property]) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + '[' + property + ']'
      } else {
        formKey = property
      }

      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString())
      } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File) && !(obj[property] instanceof Blob)) {
        obj2fd(obj[property], fd, formKey)
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property])
      }
    }
  }

  return fd
}

API.postForm = (url, data, headers) => {
	return API.post(url, obj2fd(data), headers)
}

module.exports.API = API
module.exports.obj2fd = obj2fd

module.exports.APIInstance = (baseUrl = 'http://localhost/') => {
	return axios.create({
		timeout: 20000,
		baseUrl: baseUrl,
		headers: {},
		validateStatus: function (status) {
			return status >= 200 && status < 600; // default
		},
	});
}

module.exports.sendNoty = async (datas = {}, dataForType = null) => {
	const dataSend = (dataForType===null || require("./helper").isObject(datas) ? datas : { type: datas, data: dataForType, payload: dataForType })
	try {
		API.post('https://onesignal.com/api/v1/notifications', {
	        'app_id': "671fb219-a2ed-42bb-98ab-f786f46ba991",
	        "content_available": true,
	        'data': Object.assign({
		        "autoplay": "true",
		    }, dataForType),
	        'included_segments': ["Active Users"],
	    }, {
			timeout: 1000 * 5,
	    	headers: {
	    		'Content-Type': 'application/json; charset=utf-8',
		    	'Authorization': 'Basic ZDg0YzE1MTEtYmRhNy00NGVlLWE1OWQtYjY0OTQyMGFhM2Mw'
	    	}
	    }).catch(e => {})
	} catch(e) {}
}
module.exports.sendNotyTo = async (token, datas = {}) => {
	return new Promise((resp) => {
		try {
			const data = Object.assign({
		        'app_id': "671fb219-a2ed-42bb-98ab-f786f46ba991",
		        "content_available": true,
		        'data': {
			        "autoplay": "true",
			    },
		        'filters': [
		        	{ "field": "tag", "key": "client_id", "relation": "=", "value": token }
		        ]
		    }, datas)
			API.post('https://onesignal.com/api/v1/notifications', data, {
				timeout: 1000 * 5,
		    	headers: {
		    		'Content-Type': 'application/json; charset=utf-8',
			    	'Authorization': 'Basic ZDg0YzE1MTEtYmRhNy00NGVlLWE1OWQtYjY0OTQyMGFhM2Mw'
		    	}
		    }).then(d => resp([d.data, data])).catch(e => {
		    	console.warn('error noty', e)
		    })
		} catch(e) {
	    	console.warn('error noty', e)
	    }
	})
}
module.exports.sendNotyDataTo = async (token, datas = {}, dataForType = null, subData = {}) => {
	const dataSend = (dataForType===null || require("./helper").isObject(datas) ? datas : { type: datas, data: dataForType, payload: dataForType })
	try {
		API.post('https://onesignal.com/api/v1/notifications', Object.assign({
	        'app_id': "671fb219-a2ed-42bb-98ab-f786f46ba991",
	        "content_available": true,
	        'data': Object.assign({
		        "autoplay": "true",
		    }, dataSend),
	        'filters': [
	        	{ "field": "tag", "key": "client_id", "relation": "=", "value": token }
	        ]
	    }, subData), {
			timeout: 1000 * 5,
	    	headers: {
	    		'Content-Type': 'application/json; charset=utf-8',
		    	'Authorization': 'Basic ZDg0YzE1MTEtYmRhNy00NGVlLWE1OWQtYjY0OTQyMGFhM2Mw'
	    	}
	    }).catch(e => {})
	} catch(e) {}
}
module.exports.sendWS = async (data = {}, dataForType = null) => {
	const dataSend = (dataForType===null || require("./helper").isObject(data) ? data : { type: data, data: dataForType, payload: dataForType })
	/*if(ws) {
		ws().clients.forEach((client) => {
			client.send(JSON.stringify(Object.assign({
				"autoplay": "true",
			}, data)));
	    });
    }*/
	try {
		API.post('http://localhost:5000/sendWS', Object.assign({
			"autoplay": "true",
		}, dataSend)).catch(e => {})
	} catch(e) {
	}
}
module.exports.sendWSTo = async (token, data = {}, dataForType = null) => {
	const dataSend = (dataForType===null || require("./helper").isObject(data) ? data : { type: data, data: dataForType, payload: dataForType })
	try {
		API.post('http://localhost:5000/sendForUser', {
			token,
			data: JSON.stringify(Object.assign({
				"autoplay": "true",
			}, dataSend))
		}).catch(e => {})
	} catch(e) {
	}
}