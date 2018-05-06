const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'index.js'
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}

module.exports = config
