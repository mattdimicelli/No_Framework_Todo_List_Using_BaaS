const path = require('path');  //this is a path module from node JS that helps us create an absolute path

module.exports = { //export an object that has the following properties
  mode: 'development',
  optimization: {
    minimize: false,
  },
  devtool: 'inline-source-map',  //allows errors to be traced
  entry: './src/index.js',  //the first file in dependency graph
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),  //the path has to be an absolute path.  could also do path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults"}]
            ]
          }
        }
      }
    ]
  },
};