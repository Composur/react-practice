// const webpack=require('webpack')
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const NyanProgressPlugin = require('nyan-progress-webpack-plugin')  
// module.exports = {
//   entry: {
//    app: './src/index.js',
//   },
//   devtool:'inline-source-map',
//   devServer:{
//     contentBase: path.join(__dirname, "dist"),
//     compress: true,//gzip压缩
//     // port: 9000,
//     // clientLogLevel: "none",//控制台不答应繁琐信息
//     historyApiFallback: true,//404替换index.html
//     // host: "0.0.0.0",
//     hot: true,
//     noInfo: true
//   },
//   module:{
//     rules:[
//       {
//         test:/\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   },
//   plugins:[
//     new NyanProgressPlugin(), 
//     new webpack.NamedModulesPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new CleanWebpackPlugin(['dist']),
//     new HtmlWebpackPlugin({
//       title:'Output'
//     })
//   ],
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   // mode: "production"
// };