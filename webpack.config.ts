import * as path from 'path'

import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as webpack from 'webpack'

const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__ = NODE_ENV === 'development'

const resolve = (...args: string[]) => path.resolve(process.cwd(), ...args)

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    path: resolve('docs'),
    filename: `[name].[${__DEV__ ? 'hash' : 'chunkhash'}].js`,
  },
  devtool: __DEV__ ? 'cheap-module-eval-source-map' : false,
  resolve: {
    alias: {
      lodash: 'lodash-es',
      'react-translator': resolve('lib'),
    },
    extensions: ['.ts', '.tsx', '.js'],
    modules: [resolve('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['apply-loader', 'pug-loader'],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                module: 'esnext',
                target: 'esnext',
              },
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__,
      I18N_REGEX: /([\w-]*[\w]+)\.i18n\.json$/.toString(),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: ({ context, request }) =>
        /node_modules/.test(context) && !/\.css$/.test(request),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
    }),
    ...(__DEV__
      ? [new webpack.NamedChunksPlugin(), new webpack.NamedModulesPlugin()]
      : []),
  ],
}

export default config
