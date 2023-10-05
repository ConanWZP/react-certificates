const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production'

module.exports = {
    entry: {
        appName: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: production ? '[name].[contenthash].js' : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$/,
                use: ['file-loader']
            },
            /*{
                test: /\.s(a|c)ss$/,
                exclude: /\.module.\.s(a|c)ss$/,
                use: [
                    production ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: !production
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !production
                        }
                    }
                ]
            },*/
            // loading css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /\.module\.css$/
            },
            // loading scss/sass
            {
                test: /\.s[ac]ss$/,
                use: ['sass-loader'],
                exclude: /\.module\.scss$/
            },
            // CSS modules

            {
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: "[local]_[hash:base64:5]"
                            }
                        }
                    }
                ],
                include: /\.module\.css$/,
            },
            // SCSS modules
            {
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: "[local]_[hash:base64:5]"
                            }
                        }
                    },
                    "sass-loader"
                ],
                include: /\.module\.scss$/,
            }
        ],

    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".scss"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack & React",
            template: "./src/index.html",
            favicon: "./public/favicon.ico"
        }),
        new MiniCssExtractPlugin({
            filename: production ? '[name].[contenthash].css' : '[name].css',
        }),
    ],
    devServer: {
        port: 3001,
        hot: true,
        historyApiFallback: true
    },
    mode: production ? 'production' : 'development'
}