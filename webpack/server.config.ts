import * as crypto from 'crypto'
import * as HappyPack from 'happypack'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import * as nodeExternals from 'webpack-node-externals'
import { babelLoader, baseConfig } from './base.config'
import { cssUse } from './css'
import { isDev, rootDir } from './tools'

const serverConfig: webpack.Configuration = {
  ...baseConfig,

  target: 'node',

  externals: [nodeExternals({
    whitelist: [
      'intl',
      'react-intl'
    ]
  })],

  node: {
    __dirname: false,
    __filename: false
  },

  entry: {
    server: './src/server'
  },

  output: {
    path: path.join(rootDir, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: !isDev
          ? 'happypack/loader?id=tsx'
          : [
              babelLoader,
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: true
                }
              }
            ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, ...cssUse]
      },
      {
        test: /\.(svg)$/,
        use: ['svg-url-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              emitFile: false,
              limit: 8092,
              name: 'images/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      BUILD_HASH: JSON.stringify(crypto.randomBytes(10).toString('hex'))
    }),

    new MiniCssExtractPlugin({
      filename: 'static/external.css',
      chunkFilename: '[id].css'
    }),

    ...(isDev
      ? []
      : [
        new HappyPack({
          id: 'tsx',
          loaders: [
            babelLoader,
            {
              loader: 'ts-loader',
              options: {
                happyPackMode: true
              }
            }
          ]
        })
      ])
  ]
}

// tslint:disable-next-line:no-default-export
export default serverConfig
