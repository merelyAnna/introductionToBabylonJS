const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const pathsToClean = ["dist"];

const cleanOptions = {
  verbose: true,
  dry: false
};

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js?[hash]",
    chunkFilename: "[name].bundle.js"
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: [
              "transform-object-rest-spread",
              "transform-class-properties"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      title: "Your Code as a Game",
      template: "./templates/index.ejs"
    }),
    new CopyWebpackPlugin([{ from: "assets", to: "assets" }])
  ]
};
