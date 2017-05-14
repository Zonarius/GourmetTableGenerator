var path = require('path');

module.exports = {
  entry: './htmlsrc/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'html', 'assets', 'js')
  },
  module: {
    rules: [
      {test: /\.ts$/, use: 'ts-loader'}
    ]
  }
};
