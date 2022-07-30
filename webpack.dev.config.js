const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.js');

const static = "exchangeAppStatic"

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: undefined,
    devServer: {
        static: false,
        historyApiFallback: {
            index: `${static}/index.html`,
            rewrites: [
                {
                    from: '/',
                    to: `/${static}/index.html`,
                },
            ],
        },
        compress: true,
        hot: true,
        port: 3333,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            manifest: './public/manifest.json',
            title: 'Query Tool UI (DEV)',
        }),
        new WebpackManifestPlugin({ publicPath: `/${static}/` }),
    ],
};

