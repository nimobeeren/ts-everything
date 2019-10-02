import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import { webpackCommonConfig } from './webpack.common';

export const webpackDevConfig: Configuration = merge(webpackCommonConfig, {
  mode: 'development',
  resolve: {
    alias: {
      // Patch for extra HMR features
      'react-dom': '@hot-loader/react-dom'
    }
  }
});
