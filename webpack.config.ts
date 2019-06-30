import path from 'path'

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__ = NODE_ENV === 'development'

const resolve = (...args: string[]) => path.resolve(process.cwd(), ...args)

const config: any = {
  mode: NODE_ENV,
  entry: './src/index.tsx',
  output: {
    path: resolve('docs'),
    filename: `[name].[${__DEV__ ? 'hash' : 'chunkhash'}].js`,
  },
  devtool: __DEV__ ? 'cheap-module-eval-source-map' : false,
  resolve: {
    alias: {
      lodash$: 'lodash-es',
      'react-translator': resolve('lib'),
    },
    extensions: ['.ts', '.tsx', '.js'],
    modules: [resolve('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
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
  optimization: {
    splitChunks: {
      name: 'vendors',
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: ({ context, request }: { context: string; request: string }) =>
            /node_modules/.test(context) && !/\.css$/.test(request),
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__,
      I18N_REGEX: /([\w-]*[\w]+)\.i18n\.json$/.toString(),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
    }),
  ],
}

export default config
