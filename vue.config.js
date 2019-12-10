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
    devServer: {
        port: 8000,
        proxy: {
            '/loanApi': {
                changeOrigin: true,
                target: 'http://129.211.29.207:8083/wallet/',
                pathRewrite: {
                    '^/loanApi': ''
                }
            }
        }
    },
    publicPath: '/'
}
