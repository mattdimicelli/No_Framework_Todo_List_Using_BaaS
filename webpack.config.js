const path = require('path');  
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
  entry: './src/index.js',  //the first file in dependency graph,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  //the path has to be an absolute path.  could also do path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  experiments: {
    topLevelAwait: true,
  }
};