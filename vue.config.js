const webpack = require('webpack')
module.exports={
    configureWebpack: {
        plugins: [
          new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
    publicPath:'',
    outputDir: process.env.outputDir, 
    devServer:{
        host:'0.0.0.0',
        port:'8086',
        proxy:{
            "/api":{
                target:'https://dev-asset.91assets.com',
                changeOrigin:true
            }
        }
    }
}