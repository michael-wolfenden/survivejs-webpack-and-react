const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = require('./paths');

const webpackConfig = {

    entry: [
        'babel-polyfill',
        PATHS.entryFile,
    ],

    output: {
        filename: 'bundle.js',
    },

    devtool: 'eval',

    devServer: {
        // Display only errors to reduce the amount of output.
        stats: 'errors-only',
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
    },

    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                include: PATHS.appDir,
                loader: 'eslint',
            },
        ],

        loaders: [
            {
                test: /\.css$/,
                include: PATHS.appDir,
                loaders: ['style', 'css'],
            },
            {
                test: /\.jsx?$/,
                include: PATHS.appDir,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'survivejs-kanban', 'react-hmre'],
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.index,
            inject: true,
        }),

        new OpenBrowserPlugin({
            url: 'http://localhost:8080',
        }),
    ],
};

module.exports = webpackConfig;
