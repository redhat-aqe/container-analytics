const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  plugins: [
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, 'public'),
      template: './assets/index.html'
    }),
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // all options are optional
    //   filename: '[name].css',
    //   chunkFilename: '[id].css',
    //   ignoreOrder: false, // Enable to remove warnings about conflicting order
    // }),
  ],
  entry: "./src/index.tsx",
	output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'analytics.js'
	},
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [ ".js", ".ts", ".tsx"]
   },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { 
        test: /\.(t?|j?)s(x?)$/, 
        exclude: /node_modules/,
        loaders: ["ts-loader"],
      },
      {
        test:/\.css$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // you can specify a publicPath here
          //     // by default it uses publicPath in webpackOptions.output
          //     publicPath: '../',
          //     hmr: process.env.NODE_ENV === 'development',
          //   },
          // },
          'css-loader',
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    compress: true,
    port: 3000
  }
};