//config.js webpack配置文件

'use strict';

var path = require('path');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.join(__dirname, 'min'),
    publicPath: './min/',
    filename: 'index.min.js'
  },
  externals: {
    'react': 'React'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx!babel',include: /src/}
    ]
  }
}
