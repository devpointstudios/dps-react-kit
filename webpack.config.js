const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const WebpackConfig = {
  entry: APP_DIR + '/index.js',

  output: {
    path: BUILD_DIR,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'ReactFlash'
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /.js$/,
        exclude: /node_modules/,
        include: APP_DIR,
        options: {
          presets: ['latest', 'stage-2', 'react']
        }
      }
    ]
  }

}

if (process.env.NODE_ENV === 'production' ) {
  WebpackConfig.externals = {
    'react-dom': 'react-dom',
    'redux': 'redux',
    'react-redux': 'react-redux',
    'semantic-ui-react': 'semantic-ui-react'
  }

  WebpackConfig.plugins = [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    })
  ]

}

module.exports = WebpackConfig;

