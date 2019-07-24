const webpack = require('webpack')
const modoDev = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UnglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: modoDev ? "development" : "production",
    entry: "./src/app.js",
    output: {
        filename: "app.js",
        path: __dirname + "/public"
    },
    devServer: {
        contentBase: "./public",
        port: 3000
    },
    optimization: {
        minimizer: [
            new UnglifyJsPlugin({ cache: true, parallel: true }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "estilo.css" })
    ],
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader", // Adiciona CSS a DOM injetando a tag <style>
                    "css-loader", // interpreta @import, url()...
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)/,
                use: [ "file-loader" ]
            }
        ]
    }
}