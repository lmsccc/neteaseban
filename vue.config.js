module.exports = {
    devServer: {
        proxy: {
            '/v2': {
                target: 'https://api.douban.com',
                changeOrigin: true
            }
        }
    }
}
