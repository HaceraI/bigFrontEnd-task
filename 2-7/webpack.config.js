const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './src/index.js',
  output: {
    // path.join() 去拼接路径
    // __dirname 当前文件的绝对路径
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // sass-loader node-sass两个依赖都需要安装
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // 加载图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              esModule: false,
              fallback: 'file-loader',
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      },
      // 加载文字
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Haceral Index Page',
      template: 'index.template'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config