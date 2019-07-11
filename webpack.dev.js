const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development',

    plugins: [
        // It would be nicer to just import jasmine and let webpack handle the rest but
        // based on this SO question, Jasmine seems incompatible with that approach.
        new CopyWebpackPlugin([{
            from: "src/lib/vendor/jasmine",
            to: "lib/vendor/jasmine",
            flatten: true,
        }]),
        new HtmlWebpackPlugin({
            filename: 'test/tests.html',
            template: 'haml-loader!./src/test/tests.haml',
            chunks: ['tests'],
        }),
    ],
});