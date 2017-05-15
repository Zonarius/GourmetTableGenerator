var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './htmlsrc/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'html', 'assets', 'js')
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]

  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};
