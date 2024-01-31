const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};

module.exports = () => {
    if (process.env.NODE_ENV === 'production') {
        config.mode = 'production';
        config.output.filename = 'libretexts-support-widget.min.js';
    } else {
        config.mode = 'development';
        config.output.filename = 'libretexts-support-widget.dev.js';
    }
    return config;
};
