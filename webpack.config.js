const path = require('path');
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
const env = process.env.NODE_ENV || 'dev'
const dev = env === 'dev'
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    target: ['web', 'es5'], // IE11対応
    entry: {
        'widgets': './src/widgets.ts',
        'receiver': './src/receiver.ts',
    },
    devtool: dev ? 'source-map' : false,
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        // publicPath: 'self.location',
    },
    devServer: {},
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, `.env.${env}`),
        }),
        new HtmlWebpackPlugin({
            filename: "widgets.html",
            template: "./src/widgets.html",
            chunks: ['receiver']
        }),
    ],
};