'use strict';

var NODE_ENV = process.env.NODE_ENV;
var devtoolMap = {
    development: 'cheap-module-source-map',
    // cheap-module-source-map chosen because it supports sourcemaps. See here:
    // https://github.com/webpack/webpack/issues/2145#issuecomment-294361203
    // We'd like to use 'eval', but it breaks sourcemaps (in chrome devtools the
    // ts files are shown as transpiled javascript).

    test: 'inline-source-map', // Mandated by karma-webpack
    production: 'source-map', // Mandated by UglifyJsPlugin
};

if (!devtoolMap[NODE_ENV]) {
    throw new Error('NODE_ENV not recognized: ' + NODE_ENV);
}

var devtoolOverride = process.env['WEBPACK_DEVTOOL_' + NODE_ENV.toUpperCase()];
var devtool = devtoolOverride || devtoolMap[NODE_ENV];
console.log('Webpack devtool - ' + devtool);

var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var IS_WATCH = Boolean(process.env.WATCH_MODE);
var JS_OUT = IS_WATCH ? '[name].js' : '[name].[hash].js';
var CSS_OUT = IS_WATCH ? '[name].css' : '[name].[hash].css';

var path = require('path');
var webpack = require('webpack');
var HappyPack = require('happypack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var langs = require('./getlangs.js')();

// XXX We need a more generic solution for this in the future
var imgNoInline =
    [
        /objlist\/img\/(?:devtype|vendor)\/.*\.(jpe?g|png|gif|svg)$/,
        /anomalies\/img/,
    ];

var happyThreadPool = HappyPack.ThreadPool({ size: 5 });
var happyPlugins = [];
var happyId = 1;
function threaded(loaders) {
    var dir = {
        test: 'development',
        development: 'development',
        production: 'production',
    }[NODE_ENV];
    if (!dir) {
        throw new Error('Failed to identify cache path');
    };
    var useCache = process.env.HAPPY_CACHE !== '0';
    // Disable cache in dev mode for linters - won't re-emit errors with cache:
    // https://github.com/amireh/happypack/wiki/Loader-Compatibility-List
    if (
        ['eslint-loader', 'tslint-loader'].indexOf(loaders) !== -1 &&
        NODE_ENV === 'development'
    ) { useCache = false; }

    var hp = new HappyPack({
        id: 'happyid-' + String(happyId++),
        loaders: Array.isArray(loaders) ? loaders : [loaders],
        threadPool: happyThreadPool,
        verbose: process.env.HAPPY_VERBOSE === '1',
        cache: useCache,
        cacheContext: { env: NODE_ENV },
        tempDir: path.resolve(__dirname, '.happypack', dir),
    });
    happyPlugins.push(hp);
    return hp.id;
}

var html_entry_points = [
    // TODO we shouldn't blacklist all files named index and landing!!!
    /index\.html/,
    /landing\.html/,
];
var linter_blacklist = [
    /node_modules/,
    /build/,
    /install/,
].concat(html_entry_points);

var outputConfig = { // aka config.stats
    assets: false,
    children: false, // remove "Child extract-text-webpack-plugin:" spam
    colors: true,
    chunks: false,
    reasons: false,
};

var jsSrc = /(src|test|test_util)\/.*\.js$/;
var tsSrc = /(src|test|test_util)\/.*\.tsx?$/;

var babelLoader = {
    // XXX: .babelrc doesn't seem to be respected so we specify options here
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        presets: ['es2015'],
        plugins: [
            [
                require('babel-plugin-transform-runtime'),
                { regenerator: true, polyfill: false },
            ],
        ],
    },
};
var babelExcludes = [
    path.resolve('node_modules/'),
    path.resolve('../../build/html-modules/htmlgui/node_modules'),
    path.resolve('src/vendor/'),
    path.resolve('build/'),
    path.resolve('install/'),
];

var cssOptions = {sourceMap:true};
if (NODE_ENV === 'production') {
    Object.assign(cssOptions, {'-autoprefixer': true, minimize: true});
}

module.exports = {
    entry: Object.assign(
        {},
        {
            htmlgui: './src/app.ts',
            htmladmin: './src/admin-app.ts',
        },
        langs
    ),
    output: {
        filename: JS_OUT,
        path: path.resolve(__dirname, 'build', 'webpack-chunks'),
        publicPath: '/media/gui/',
    },
    module: {
        // keep this tsloader spec in sync with the hot-patch in
        // karma.conf.js.
        rules: [
            {
                test: jsSrc,
                loader: 'happypack/loader',
                enforce: 'pre',
                exclude: linter_blacklist,
                options: {
                    configFile: './.eslintrc',
                    id: threaded('eslint-loader'),
                },
            },
            {
                test: tsSrc,
                loader: 'happypack/loader',
                enforce: 'pre',
                exclude: linter_blacklist,
                options: {
                    emitErrors: true,
                    id: threaded('tslint-loader'),
                },
            },
            {
                test: /\.html$/,
                loader: 'happypack/loader',
                enforce: 'pre',
                exclude: linter_blacklist,
                options: {
                    configFile: './.htmlhintrc',
                    id: threaded('htmlhint-loader'),
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'happypack/loader?id=' + threaded([
                        {loader: 'css-loader', options: cssOptions},
                    ]),
                }),
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
            },
            {
                test: /\.html$/,
                exclude: html_entry_points,
                loader: ['exTempl.loader.js', 'htmlmin-loader'],
            },
            {
                test: imgNoInline,
                loader: 'file-loader',
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                exclude: imgNoInline,
                // Note that adding threading to the following will result
                // in malformed binary base64:
                loader: 'url-loader?limit=10000',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'happypack/loader?id=' + threaded([
                        {loader: 'css-loader', options: cssOptions},
                        {loader: 'sass-loader', options: {sourceMap: true}},
                    ]),
                }),
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                exclude: imgNoInline,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
            },
            {
                test: jsSrc,
                exclude: babelExcludes,
                use: [babelLoader],
            },
            // Happypack does not support ts-loader or awesome-ts-loader.
            {
                test: tsSrc,
                exclude: babelExcludes,
                use: [
                    babelLoader,
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
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: (
                    'url-loader?limit=100000&' +
                    'mimetype=application/font-woff'
                ),
            },
        ],
    },
    resolve: {
        alias: {
            'angular': 'vendor/angular.edited',
            'angular-router': '@angular/router/angular1/angular_1_router',
            'font-awesome': 'font-awesome/css/font-awesome',
            jquery: 'jquery/dist/jquery',
            'src/shared/_shared': 'shared/_shared', // XXX: what is this?
            d3: 'vendor/d3.js',
        },
        extensions: [
            '.js',
            '.ts',
            '.tsx',
        ],
        modules: [
            path.resolve('node_modules/'),
            path.resolve('src/'),
        ],
    },
    resolveLoader: {
        modules: [
            path.resolve('node_modules'),
            path.resolve('loaders'),
        ],
    },
    bail: !IS_WATCH,
    devtool: devtool,
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ExtractTextPlugin({
            filename: CSS_OUT,
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(NODE_ENV)},
        }),
        new webpack.ProvidePlugin({
            // Provide jQuery so that angular uses it instead of jqLite:
            "window.$": 'jquery',
            "window.jQuery": 'jquery',
        }),
        new CheckerPlugin(), // Awesome typescript loader
    ]
        .concat(happyPlugins)
        .concat(
            NODE_ENV === 'production' ? [
                new webpack.optimize.UglifyJsPlugin({
                    comments: false,
                    compress: {
                        angular: true,
                        collapse_vars: true,
                        screw_ie8: true,
                        unsafe: true,
                        unsafe_comps: true,
                    },
                    warningsFilter: function () { return false; },
                    mangle: {
                        except: [
                            'angular',
                            '$',
                            'd3',
                            'require',
                            'exports',
                            'Rickshaw',
                            '$super',    // Note that Rickshaw uses $super
                        ],
                    },
                    sourceMap: true,
                    stats: true,
                }),
            ] :
            []
        )
    ,
    stats: outputConfig,
    devServer: {
        stats: outputConfig,
    },
};

function htmlDir(filename) {
    return path.resolve(__dirname, 'build', 'webpack-html', filename);
}

if (process.env.BUNDLE_ANALYZER) {
    var BundleAnalyzerPlugin = require(
        'webpack-bundle-analyzer'
    ).BundleAnalyzerPlugin;

    module.exports.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server'
    }));
}

if (NODE_ENV !== 'test' && !IS_WATCH) {
    module.exports.plugins = module.exports.plugins.concat([
        new HtmlWebpackPlugin({
            template: 'src/views/landing/landing.html',
            // we inject ourselves because we need htmlgui.js in a specific
            // spot before exBoot()
            inject: false,
            hash: false,
            filename: htmlDir('landing.html'),
        }),
        new HtmlWebpackPlugin({
            template: 'src/admin/index.html',
            inject: false,
            hash: false,
            filename: htmlDir('admin.html'),
        }),
    ]);
}
