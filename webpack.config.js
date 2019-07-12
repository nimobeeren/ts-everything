const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./src/index'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    devtool: false,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            [
                                '@babel/env',
                                { targets: { browsers: 'last 2 versions' } }
                            ],
                            '@babel/typescript',
                            '@babel/react'
                        ],
                        plugins: [
                            ['@babel/proposal-class-properties', { loose: true }],
                            'react-hot-loader/babel'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [new ForkTsCheckerWebpackPlugin(), new webpack.NamedModulesPlugin(), new HtmlWebpackPlugin()]

    // TODO: TypeScript docs use `externals` as an optimization for loading React, is this useful?
    // TODO: see Webpack docs -> Build Performance (link at the bottom of the TypeScript section)
};
