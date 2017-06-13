'use strict';

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

// webpackConfig.entry = {};
webpackConfig.resolve.modules.push('test_util/');

// Patch webpack.conf to use tsconfig.test.json for ts-loader
Array.prototype.forEach.bind(webpackConfig.module.rules)(function (rule) {
    rule.use && Array.prototype.forEach.bind(rule.use)(function (use) {
        if (
            use.loader === 'awesome-typescript-loader' ||
            use.loader === 'ts-loader'
        ) {
            use.options = use.options || {};
            use.options.configFileName = 'tsconfig.test.json';
        }
    });
});

var preprocessor = ['webpack'];
if (process.env.IS_WATCH) {
    preprocessor = ['webpack', 'sourcemap'];
    webpackConfig.plugins.push(
        // Force webpack to emit sourcemaps for ts files
        // (see https://github.com/webpack/karma-webpack/issues/109)
        new webpack.SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sourcemap is inlined
            test: /\.(ts|js)x?($|\?)/i // process .js and .ts files only
        })
    );
}
else {
    webpackConfig.devtool = false;
}

// Define pattern for matching test files
var testPattern = '.*.spec.ts'; // default
if (process.env.KARMA_SPECS) {
    testPattern = process.env.KARMA_SPECS.trim();
    if (testPattern.indexOf('test/') === 0) {
        // Strip 'test/' because require.context is relative to
        // test/test_index.js's directory
        testPattern = testPattern.slice('test/'.length);
    }
}
console.log('Finding tests according to this pattern: test/' + testPattern);

webpackConfig.plugins.push(
    new webpack.ContextReplacementPlugin(/.*/, function(request) {
        request.regExp = new RegExp(testPattern);
    })
);

// Export configuration
module.exports = function(config) {
    config.set({
        webpack: webpackConfig,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        // (Note: keep this to one file, or else a webpack runtime will be
        //  created for each file (so e.g. angular will be double loaded)
        files: ['test/test_index.js'],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // XXX: sourcemap preprocessor currently does not work,
        //      see https://github.com/webpack/karma-webpack/issues/176
        preprocessors: {
            'test/test_index.js': preprocessor,
            '**/*.ts': preprocessor,
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [], // XXX: we specify reporters at the command line

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // increase Karma wait time for a browser message (default is 10000ms)
        browserNoActivityTimeout: 30000,

        // number of times we allow a disconnection before we error out (default is 0)
        browserDisconnectTolerance: 3,

        // increase Karma wait time to reconnect to a browser (default is 2000ms)
        browserDisconnectTimeout: 5000,

        // timeout for capturing a browser (default is 60000ms)
        captureTimeout: 100000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        webpackMiddleware: {
            stats: webpackConfig.stats,
        },

        plugins: [
            'karma-jasmine',
            'karma-jasmine-html-reporter',
            'karma-sourcemap-loader',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-webpack',
        ],

        mime: {
            'text/x-typescript': ['ts','tsx'],
        },
    });
};
