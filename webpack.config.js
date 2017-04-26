const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './index.jsx',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js",
//        publicPath: "/assets/" // for webpack-dev-server output
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'stage-0'] }
                }],
            },
            {
                test: /\.s?css$/,
                loaders: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json'],
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new ExtractTextPlugin('[name].css'),
      ],
    devtool: "eval",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        compress: true,
        historyApiFallback: true,
        port: 9000
    }
};

module.exports = config;