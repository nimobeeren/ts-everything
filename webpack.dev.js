const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  resolve: {
    alias: {
      // Patch for extra HMR features.
      'react-dom': '@hot-loader/react-dom'
    }
  }
});
