const environment = process.env.NODE_ENV || "development"
const envSet = require(`./environments/${environment}.js`)

const path = require("path")
const globule = require("globule")

const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const pageFiles = globule.find(
  "./src/pages/**/*.pug", {
    ignore: [
      "./src/pages/**/_*/*.pug",
    ],
  },
)

const outputPath = path.resolve(__dirname, "dist")

module.exports = {
  mode: envSet.mode,
  devtool: envSet.enabledSourceMap ? "source-map" : false,
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
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
              sourceMap: envSet.enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: envSet.enabledSourceMap,
              postcssOptions: {
                plugins: [
                  ["autoprefixer"],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: envSet.enabledSourceMap,
              sassOptions: {
                outputStyle: envSet.minify ? "compressed" : "expanded",
              },
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
        minify: envSet.minify,
      })
    }),
  ],
  target: ["web", "es5"], // ES5(IE11)
  optimization: {
    minimize: envSet.minify,
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets/"),
    },
  },
}
