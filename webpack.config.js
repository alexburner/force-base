const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

    entry: './demo/src/index.ts',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'docs'),
    },

    devtool: 'cheap-module-source-map',

    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            path.resolve(__dirname),
            'node_modules',
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'demo/src/index.html',
        }),
    ],

    module: {
        rules: [
            // {
            //     test: /worker\.ts$/,
            //     exclude: /node_modules/,
            //     loader: 'worker-loader',
            // },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['es2015'],
                            plugins: [[
                                require('babel-plugin-transform-runtime'),
                                { regenerator: true, polyfill: false },
                            ]],
                        },
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: false,
                            logLevel: 'info',
                            useBabel: true,
                            useCache: true,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            },
        ],
    },

};
