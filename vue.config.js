const path = require('path');
const PATHS = {
    src: path.join(__dirname, '/skins/src'),
    dist: path.join(__dirname, '/skins/marc')
}
module.exports = {
    //publicPath: `${PATHS.dist}`,
    outputDir: `${PATHS.dist}`,
    indexPath: '/main.tpl',
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