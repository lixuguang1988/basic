var path = require('path')
var webpack = require('webpack')
var HTMLPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // entry: './src/main.js',
  entry: {
    app: './src/main.js',
    // app: ['promise-polyfill', './src/main.js'],
    vendor: [
        'promise-polyfill',
        'vue',
        'vue-router',
        'vuex',
        'vuex-router-sync',
        'axios'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist',
    filename: '[name].[hash].js'
  },
  module: {
    // noParse: /promise-polyfill\.js$/, // avoid webpack shimming process
    noParse: /es6-promise\.js$/, // avoid webpack shimming process

    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff2|eot|woff)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }    
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin("style.[hash].css"),

    // generate output HTML
    new HTMLPlugin({
      template: 'src/index.template.html',
      filename: '../index.html'
    })
  ]
  // devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  //module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
