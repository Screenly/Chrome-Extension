const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development',

    entry: {
        "tests": './src/test/spec/all.js',
    },

    plugins: [
        // It would be nicer to just import jasmine and let webpack handle the rest but
        // Jasmine seems incompatible with that approach. It doesn't import right.
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/lib/vendor/jasmine",
                    to: "lib/vendor/jasmine/[name][ext]",
                },
            ],
        }),
        new HtmlWebpackPlugin({
            filename: 'test/tests.html',
            template: './src/test/tests.html',
            chunks: ['tests'],
        }),
    ],
});
