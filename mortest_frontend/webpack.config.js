const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin()],
    plugins: [
      new HtmlWebpackPlugin({
          title: "Application name",
          template: './templates/frontend/index.html'
      })],
    mode:'development',
    devServer: {
      historyApiFallback: true
    },
  };