const { sources } = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/js/index.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "docs"),
    assetModuleFilename: "images/[name][ext][query]",
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          //filename: 'fonts/[name]-[hash][ext][query]'
          filename: "fonts/[name][ext][query]",
        },
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // inject CSS to the DOM and extract on a separate file.
          "css-loader", // translates CSS into CommonJS modules
          "postcss-loader", // Run postcss actions
          "sass-loader", // compiles Sass to CSS
        ],
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  cache: {
    type: "filesystem",
  },
};
