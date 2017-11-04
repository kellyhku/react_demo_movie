const path = require('path')

//将来根据参照文件，在内存中生成index.html并且自动引入打包好的bundle.js
var HtmlWebpackPlugin = require('html-webpack-plugin')

//打包之前，删除dist目录
var CleanWebpackPlugin = require('clean-webpack-plugin')

//抽离第三方样式
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const webpack = require('webpack')

module.exports = {
    entry:{
        //属性名称是以后生成的js的名称，值是第三包的名称
        react:['react'],
        reactDom:['react-dom'],
        fetchJsonp:['fetch-jsonp'],
        bundle:'./src/main.js' 
    },
    output:{
        //publicPath:'/',//静态资源目录
        path:path.join(__dirname,'dist'),
        filename:'js/[name].js'
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/, //在进行babel转换的时候一定要加
                use: [
                  {
                    loader: 'babel-loader'
                  }
                ]
            },
            {
                test:/\.css$/,
                // use:[
                //     {
                //         loader:'style-loader'
                //     },
                //     {
                //         loader:'css-loader'
                //     }
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader?limit=4000&name=images/[name]-[hash:5].[ext]'
                        // options: {
                        //     limit: 4000
                        // }
                    }
                ]
            }
        ]
    },
    resolve:{
       
        extensions:['.js','.json']
    },
    plugins:[
       
        new CleanWebpackPlugin('dist'),

        new HtmlWebpackPlugin({
            template:'./template.html', //以谁为模版
            filename:'index.html',//在内存中生成的文件名
            minify:{
                collapseWhitespace:true, //去除空格
                minifyCSS:true,//压缩css
                minifyJS:true,//压缩js
                removeComments:true//去掉注释
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')//设置为生产环境
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false//干掉警告
            },
            comments: false 
        }),
       
        new webpack.optimize.CommonsChunkPlugin({name:["react","reactDom","fetchJsonp"],minChunks: Infinity}),

        
        new ExtractTextPlugin("css/styles.css")
    ]
}