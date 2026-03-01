const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { watchFile } = require('fs');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
    watchFiles: ['src/**/*'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}