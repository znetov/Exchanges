const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { webpackAlias } = require('./importAlias.config');
const loaders = require('./webpack/loader');


const static = 'exchangeAppStatic';
const buildDirectory = path.join(__dirname, 'build');
const staticDirectory = path.join(buildDirectory, static);

module.exports = {
    mode: 'production',
    entry: './src/app/index.tsx',
    output: {
        path: staticDirectory,
        publicPath: `/${static}/`,
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: false,
            generateStatsFile: true,
            statsOptions: { source: false },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: path.join(buildDirectory, 'index.html'),
            favicon: './public/favicon.ico',
            manifest: './public/manifest.json',
            title: 'Exchange App',
        }),
        new WebpackManifestPlugin({ publicPath: `/${static}/` }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.svg', '.scss', '.css'],
        alias: webpackAlias,
    },

    module: {
        rules: loaders,
    },
};