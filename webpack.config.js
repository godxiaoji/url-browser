const path = require('path')

module.exports = {
  entry: './src/url-browser.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'url-browser.js',
    library: 'URLBrowser',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  mode: 'production'
}
