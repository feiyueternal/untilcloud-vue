module.exports = {
    assetsDir: "assets",
    lintOnSave: false,
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        https: false,
        // open: true,
        proxy: {
            '/index': {
                target: 'http://47.98.142.113:8443/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/index': ''
                }
            }
        }
    }
}