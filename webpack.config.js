const path = require('path');

module.exports = {
    // TODO: set mode to production/development?

    // TODO: why is this not specified in TypeScript docs?
    entry: './src/index.tsx',

    // Enable sourcemaps for debugging webpack's output.
    // TODO: why do TypeScript docs use `source-map` instead?
    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }

    // TODO: TypeScript docs use `externals` as an optimization for loading React, is this useful?
    // TODO: see Webpack docs -> Build Performance (link at the bottom of the TypeScript section)
};
