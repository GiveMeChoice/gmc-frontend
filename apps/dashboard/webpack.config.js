const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = env
    ? Object.keys(env).reduce((prev, next) => {
        prev[`${next}`] = JSON.stringify(env[next]);
        return prev;
      }, {})
    : '';

  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    devServer: {
      port: 3000,
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
      // publicPath: '/',
      assetModuleFilename: 'assets/[name][ext]',
    },
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        favicon: path.resolve(__dirname, './favicon.ico'),
      }),
      new webpack.DefinePlugin({
        process: { env: envKeys },
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
