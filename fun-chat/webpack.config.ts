import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackDevServer from 'webpack-dev-server';

export default () => {
  const config: webpack.Configuration = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js',
      clean: true,
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 9000,
      open: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        ,
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]',
          },
        },
        { test: /\.ts$/i, use: 'ts-loader' },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
    ],
  };
  return config;
};
