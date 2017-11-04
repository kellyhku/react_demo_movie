const path = require('path')

//将来根据参照文件，在内存中生成index.html并且自动引入打包好的bundle.js
var HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')

module.exports = {
    // entry:'./src/main.js',
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/main.js'
    ],
    output:{
        publicPath:'/',//静态资源目录
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    devServer: {
       hot: true //是否开启热替换
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
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        //拓展名，当入其它模块，没有写文件的后缀的时候，自动按照下面的规则补全
        extensions:['.js','.json']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./template.html', //以谁为模版
            filename:'index.html'//在内存中生成的文件名
        }),
        new webpack.NamedModulesPlugin(), //开启名称模块插件
        new webpack.HotModuleReplacementPlugin() //开启热替换插件
    ]
}