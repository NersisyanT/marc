module.exports.importExportAll = (exp, file) => {
	Object.defineProperty(exp, "__esModule", {
	  value: true
	});

	var _test = require(file);
	Object.keys(_test).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (key in exp && exp[key] === _test[key]) return;
	  Object.defineProperty(exp, key, {
	    enumerable: true,
	    get: function () {
	      return _test[key];
	    }
	  });
	});
}