
var express = require('express')
var useragent = require('express-useragent');
var bodyParser = require('body-parser')
const multer = require('multer')
const forms = multer();

const { isset } = require("./php")

module.exports.expressOr = express

module.exports.express = (withoutForms = false) => {
    var app = express()
    app.use(useragent.express());

    // parse application/json

    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: false }));
    if(!withoutForms) {
        app.use(forms.array());
    }
    return app;
}
module.exports.expressLang = (req, defaultLang = 'ru') => {
	let lang = defaultLang
    if(isset(req.body) && isset(req.body.language)) {
        if(req.body.language=="ua" || req.body.language=="uk") {
            lang = "ua";
        } else {
            lang = "ru";
        }
        req.body.lang = lang
        req.body.language = lang
    } else if(isset(req.query) && isset(req.query.language)) {
        if(req.query.language=="ua" || req.query.language=="uk") {
            lang = "ua";
        } else {
            lang = "ru";
        }
        req.query.lang = lang
        req.query.language = lang
    }
    req.lang = lang
    req.language = lang
}
module.exports.upload = () => {
    const os = require('os')
    console.log('os.tmpdir()', os.tmpdir())
    const mult = multer({ dest: os.tmpdir() })
    return mult
}