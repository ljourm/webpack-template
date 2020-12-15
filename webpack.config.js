const path = require('path');

const mode = "development"

const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
  mode: mode,
  entry: './src/index.js',
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: outputPath,
    open: true,
  },
  module: {
    rules: [
    ],
  },
};
