const path = require('path')

module.exports = {
  entry: './src/url-handler.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'url-handler.js',
    library: 'URLHandler',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  mode: 'production'
}
