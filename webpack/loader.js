const loaders = [
    {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
            },
        ],
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    },
    {
        test: /\.svg$/,
        use: [
            '@svgr/webpack',
            {
                loader: 'svg-url-loader',
                options: {
                    limit: 1000,
                    mimetype: 'image/svg+xml',
                },
            }
        ]
    },
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    {
        test: /favicon.ico$/,
        use: 'file-loader?name=/[name].[ext]',
    },
    { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
];

module.exports = loaders;
