const path = require('path');
const webpack = require('webpack');
/**
 * webpack构建进度条美化
 * todo: 如何去掉webpack-dev-server构建时候的控制台info
 */
const WebpackBar = require('webpackbar');
module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  // 处理模块的各种规则
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot|glb|obj|gltf|hdr)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  // 解析
  resolve: {
    // import引入这些类型文件时，可以不带扩展名.ts ...
    extensions: ['*', '.js', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new WebpackBar()],
};
