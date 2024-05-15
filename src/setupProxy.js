const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    
    app.use(
        createProxyMiddleware('/api', {
            target : 'https://e-childschoolinfo.moe.go.kr/api/notice/basicInfo2.do',
            changeOrigin : true,
            pathRewrite:{
                '^/api' : ''
            }
        })
    )
    
}