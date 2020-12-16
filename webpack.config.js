const path = require("path")
const globule = require("globule")

const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const mode = "development"
const enabledSourceMap = true
const minify = false

const pageFiles = globule.find(
  "./src/pages/**/*.pug", {
    ignore: [
      "./src/pages/**/_*/*.pug",
    ],
  },
)

const outputPath = path.resolve(__dirname, "dist")

module.exports = {
  mode: mode,
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: outputPath,
    filename: "bundle.js",
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
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true,
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
    new MiniCssExtractPlugin({
      filename: "css/style.css",
      ignoreOrder: true,
    }),
    ...pageFiles.map((file) => {
      return new HtmlWebpackPlugin({
        template: file,
        minify: minify,
      })
    }),
  ],
}
