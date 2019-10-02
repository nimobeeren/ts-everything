import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import { webpackCommonConfig } from './webpack.common';

export const webpackProdConfig: Configuration = merge(webpackCommonConfig, {
  mode: 'production'
});
