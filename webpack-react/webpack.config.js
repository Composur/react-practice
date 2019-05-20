var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const htmlPlug=new HtmlWebpackPlugin({
    template:path.join(__dirname,'./index.html'),//源文件
    filename:'index.html' //内存中的index.html
})

module.exports={ //node api webpack基于node 所以是node的写法
    mode:'development', //production
      plugins: [htmlPlug],
      module:{ //所有第三方模块的匹配规则 webpack默认只能打包.js文件
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            }
          ]
            
      }
}