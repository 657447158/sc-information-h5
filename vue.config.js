const msg = require('./src/languages')
const title = msg[process.env.NODE_ENV].webTit

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/styles/global.scss";`
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },
    publicPath: './',
    pages: {
        index: {
            title,
            entry: 'src/main.js'
        }
    }
}
