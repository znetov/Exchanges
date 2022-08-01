const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.js');

const static = "exchangeAppStatic"

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'source-map',
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
        proxy: {
            '/kraken': {
                target: 'https://api.kraken.com',
                pathRewrite: {
                    '/kraken': ''
                },
                secure:false,
                changeOrigin: true
            },
            '/bitfinex': {
                target: 'https://api-pub.bitfinex.com',
                pathRewrite: {
                    '/bitfinex': ''
                },
                secure:false,
                changeOrigin: true
            },
            '/details': {
                target: 'https://api.binance.com',
                pathRewrite: {
                    '/details': ''
                },
                secure:false,
                changeOrigin: true
            },
            "/binance": {
                target: 'https://api.binance.com',
                pathRewrite: {
                    '/binance': ''
                },
                secure:false,
                changeOrigin: true
            },
            "/huobi": {
                target: 'https://api.huobi.pro',
                pathRewrite: {
                    '/huobi': ''
                },
                secure:false,
                changeOrigin: true
            }
        }
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

