const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddManifestToIndexTemplatePlugin = require('./add-manifest-to-index-template-webpack-plugin');

const PATHS = require('./paths');
const pkg = require('../package.json');

const webpackConfig = {

    entry: {
        app: PATHS.entryFile,
        vendor: Object.keys(pkg.dependencies),
    },

    output: {
        path: PATHS.distDir,
        filename: 'assets/js/[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js',
    },

    devtool: 'source-map',

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
                loader: ExtractTextPlugin.extract('style', 'css'),
            },
            {
                test: /\.jsx?$/,
                include: PATHS.appDir,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'survivejs-kanban'],
                },
            },
        ],
    },

    // fail build if any eslint errors or warnings
    eslint: {
        failOnWarning: true,
        failOnError: true,
    },

    plugins: [

        // set NODE_ENV variable to production. Used by some libraries such
        // as react to perform extra optimizations
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),

        // remove dist directory
        new CleanWebpackPlugin(PATHS.distDir, {
            root: PATHS.rootDir,
        }),

        new webpack.optimize.DedupePlugin(),

        // generate 3 bundles
        // * app (from main entry file)
        // * vendor (from project.json package dependencies)
        // * manifest (entry chunk that includes the webpack runtime and with it the chunkhash mappings)
        //   this will be injected in the main index.html page (ref:https://github.com/webpack/webpack/tree/master/examples/chunkhash)
        //   for more information
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),

        // use filename instead of webpack generated id's for imports
        // this aids with long term caching (ref:https://github.com/webpack/webpack/issues/1315)
        new webpack.NamedModulesPlugin(),

        // generate css bundle
        new ExtractTextPlugin('assets/css/app.[chunkhash].css', {
            allChunks: true,
        }),

        // minify js and css bundles
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),

        // inject references to the generated bundles (both js and css) into
        // the index html template, minify and copy to dist folder
        new HtmlWebpackPlugin({
            excludeChunks: ['manifest'],
            template: PATHS.index,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
        }),

        // inject manifest bundle from above into the index html template
        new AddManifestToIndexTemplatePlugin(),
    ],
};

module.exports = webpackConfig;
