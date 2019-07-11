const path = require('path');

module.exports = {
    mode: 'development',

    devtool: 'source-map',

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.t|jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/env',
                                { targets: { browsers: 'last 2 versions' }}
                            ],
                            '@babel/typescript',
                            '@babel/react'
                        ]
                    }
                }
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }

    // TODO: TypeScript docs use `externals` as an optimization for loading React, is this useful?
    // TODO: see Webpack docs -> Build Performance (link at the bottom of the TypeScript section)
};
