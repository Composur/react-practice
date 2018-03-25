const webpack=require('webpack')
module.exports = {
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + "/public",
        filename: 'bundle.js'
    },
    // 在开发环境中为方便调试，
    devtool: 'eval-source-map',
    // webpack通过调用外部脚本或者工具对不同格式的文件进行处理，loader需要单独安装需要在config.jsmodules关键字下配置
    module: {
        // 必配选项
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'bable-loader',
                //可以单独拿出来放到.babelrc文件中
                // query: {
                //     presets: ['es2015', 'react']
                // }
            },
            // webpack提供两个工具处理样式表，css-loader 和 style-loader
            // css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能，style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'//添加对样式表的处理
            }
        ]
    },
    devServer: {
        ontentBase: './public',
        historyApiFallback: true,
        inline: true
    },
    // 优化打包的速度，只需要打包业务代码
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM'
    }
}