const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {
    entry: {
        "popup": './src/assets/js/boot-popup.mjs',
        "options": './src/assets/js/boot-options.mjs',
        "tests": './src/test/spec/test-popup.js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([{
            from: "src/manifest.json",
        }]),
        new CopyWebpackPlugin([{
            from: "src/assets/images/screenly-logo*",
            to: "assets/images/",
            flatten: true,
        }]),
        new CopyWebpackPlugin([{
            from: "src/assets/images/screenly-logo*",
            to: "assets/images/",
            flatten: true,
        }]),
        new CopyWebpackPlugin([{
            from: "src/lib/vendor/browser-polyfill.min.js",
            to: "lib/vendor/",
            flatten: true,
        }]),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'haml-loader!./src/popup.haml',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            template: 'haml-loader!./src/options.haml',
            chunks: ['options']
        }),

        new RemovePlugin({
            before: {
                include: ['dist']
            },
            after: {

            }
        })
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};