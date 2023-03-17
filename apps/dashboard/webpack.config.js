const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    devServer: {
      port: 3001,
      watchFiles: ['src/**/*'],
      liveReload: true,
      historyApiFallback: true,
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          include: [path.resolve(__dirname, 'src/')],
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  // Ability to do: `const enum`
                  'babel-plugin-const-enum',
                  // Ability to use typescript, has to be after 'babel-plugin-const-enum' otherwise will complain
                  [
                    '@babel/plugin-transform-typescript',
                    { allowNamespaces: true },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
      assetModuleFilename: 'assets/[name][ext]',
    },
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        favicon: path.resolve(__dirname, './favicon.ico'),
      }),
      new Dotenv({
        systemvars: true,
        prefix: 'process.env.',
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@root': path.resolve(__dirname, './src'),
        '@public': path.resolve(__dirname, '.'),
        '@components': path.resolve(__dirname, './src/components'),
      },
    },
  };
};
