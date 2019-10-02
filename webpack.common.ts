import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration } from 'webpack';

export const webpackCommonConfig: Configuration = {
  entry: ['./client/src/index'],
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      // Optimization for loading React
      react: path.resolve(path.join(__dirname, './node_modules/react'))
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new HtmlWebpackPlugin()]
};
