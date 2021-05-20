const path = require('path');
const PATHS = {
    src: path.join(__dirname, '/skins/src'),
    dist: path.join(__dirname, '/skins/marc')
}
module.exports = {
    publicPath: '/skins/marc/',
    outputDir: `${PATHS.dist}`,
    indexPath: `${PATHS.dist}/main.tpl`,
    configureWebpack: {
        resolve: {
            alias: {
                '@': `${PATHS.src}`
            }
        },
        entry: {
            app: `${PATHS.src}/main.js`
        }
    }
}