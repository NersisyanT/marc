// require("@babel/runtime/helpers/esm/objectSpread2")
require('babel-register')({
    presets: [ 'env' ]
})
module.exports = (path) => require(path)