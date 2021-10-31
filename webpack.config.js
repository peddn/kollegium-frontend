const path = require('path');

const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    // https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
    entry: {
        'static/main': './src/js/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-bundle.js',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'src/assets'),
        },
        port: 8000,
        watchFiles: ['src/**/*'],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/assets', to: './assets', force: true },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-bundle.css'
        }),
        new VueLoaderPlugin()
    ]
};

