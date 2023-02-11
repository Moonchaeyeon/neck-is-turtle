const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: false,
            KAKAO_API_KEY: process.env.REACT_APP_KAKAO_API_KEY,
        }),
    ],
};