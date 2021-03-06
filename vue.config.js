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
    publicPath: '/',
    pages: {
        'index': {
          title,
          entry: 'src/pages/index/main.js'
        },
    }    
}
