import merge from 'webpack-merge';
import webpack from 'webpack';
import common from './webpack.common';

const prod = merge(common, {
  mode: 'production'
});

export default prod;
