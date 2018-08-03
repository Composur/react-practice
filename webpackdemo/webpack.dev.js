const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path=require('path')
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,//gzip压缩
        // port: 9000,
        // clientLogLevel: "none",//控制台不答应繁琐信息
        historyApiFallback: true,//404替换index.html
        // host: "0.0.0.0",
        hot: true,
        noInfo: true
    }
});