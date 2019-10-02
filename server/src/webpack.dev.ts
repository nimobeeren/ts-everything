import merge from 'webpack-merge';
import webpack from 'webpack';
import common from './webpack.common';

const dev = merge(common, {
  mode: 'development',
  resolve: {
    alias: {
      // Patch for extra HMR features
      'react-dom': '@hot-loader/react-dom'
    }
  }
});

export default dev;
