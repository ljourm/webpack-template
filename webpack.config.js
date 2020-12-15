const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = "development"
const enabledSourceMap = true;

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
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!.keep", "!css"],
    }),
  ]
};
