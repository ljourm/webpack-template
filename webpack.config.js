const environment = process.env.NODE_ENV || "development";
const envSet = require(`./environments/${environment}.js`);
const isDev = environment === "development";

const path = require("path");
const globule = require("globule");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputPath = path.resolve(__dirname, "dist");

const siteRootPath = `./sites/${envSet.site}`;
const pageRootPath = `${siteRootPath}/pages`;

const pageFiles = globule.find(`${pageRootPath}/**/*.pug`, {
  ignore: [`${pageRootPath}/**/_*.pug`, `${pageRootPath}/**/_*/*.pug`],
});

module.exports = {
  mode: envSet.mode,
  devtool: envSet.enabledSourceMap ? "source-map" : false,
  entry: `${siteRootPath}/index.js`,
  output: {
    path: outputPath,
    publicPath: "/",
    filename: "bundle.js?[contenthash]",
  },
  devServer: {
    static: {
      directory: outputPath,
    },
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
              url: true,
              sourceMap: envSet.enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: envSet.enabledSourceMap,
              postcssOptions: {
                plugins: [["autoprefixer"]],
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
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "./img/[name][ext]?[contenthash]",
        },
      },
      {
        test: /\.(mp4)$/i,
        type: "asset/resource",
        generator: {
          filename: "./video/[name][ext]?[contenthash]",
        },
      },
      {
        test: /\.(pdf)$/i,
        type: "asset/resource",
        include: path.resolve(__dirname, siteRootPath, "assets", "pdf"),
        generator: {
          filename: "./pdf/[name][ext]",
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
      filename: "style.css?[contenthash]",
      ignoreOrder: true,
    }),
    ...pageFiles.map((file) => {
      const filename = file.replace(`${pageRootPath}/`, "").replace(".pug", ".html");
      return new HtmlWebpackPlugin({
        filename: filename,
        template: file,
        env: envSet,
        minify: envSet.minify,
      });
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
};
