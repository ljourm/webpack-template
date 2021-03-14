const environment = process.env.NODE_ENV || "development"
const envSet = require(`./environments/${environment}.js`)
const isDev = environment === "development"

const siteRootPath = `./sites/${envSet.site}`

const path = require("path")
const globule = require("globule")

const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const pageFiles = globule.find(
  `${siteRootPath}/pages/**/*.pug`, {
    ignore: [
      `${siteRootPath}/pages/**/_*/*.pug`,
    ],
  },
)

const outputPath = path.resolve(__dirname, "dist")

module.exports = {
  mode: envSet.mode,
  devtool: envSet.enabledSourceMap ? "source-map" : false,
  entry: `${siteRootPath}/index.js`,
  output: {
    path: outputPath,
    publicPath: "",
    filename: "bundle-[hash].js",
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
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options:{
          name: (resourcePath) => {
            return resourcePath.match(/img.*$/)[0]
          },
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true,
              self: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!.keep", "!css", "!img"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css?[contenthash]",
      ignoreOrder: true,
    }),
    ...pageFiles.map((file) => {
      return new HtmlWebpackPlugin({
        template: file,
        env: envSet,
        minify: envSet.minify,
      })
    }),
  ],
  target: isDev ? "web" : ["web", "es5"],
  optimization: {
    minimize: envSet.minify,
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, `${siteRootPath}/assets/`),
    },
  },
}
