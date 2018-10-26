const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import * as BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import * as CompressionPlugin from 'compression-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as crypto from 'crypto'
import * as HappyPack from 'happypack'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import * as path from 'path'
import * as Uglify from 'uglifyjs-webpack-plugin'
import * as webpack from 'webpack'
import * as WebpackBar from 'webpackbar'
import { babelLoader, baseConfig } from './base.config'
import { cssUse } from './css'
import { ResourcesPlugin } from './resource-plugin'
import { isDev, rootDir } from './tools'

const isBsync = isDev && process.env.BSYNC === '1'

const externalConfig: webpack.Configuration = {
  ...baseConfig,

  entry: {
    external: ['./src/external']
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: [
              isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          },
          {
            use: isDev
              ? ['style-loader', ...cssUse]
              : [MiniCssExtractPlugin.loader, ...cssUse]
          }
        ]
      },
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
            ],
        exclude: [
          path.join(rootDir, './src/server')
        ]
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
              emitFile: true,
              limit: 8092,
              name: 'images/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/common/theme/favicons', to: '' },
      { from: 'src/common/theme/fonts', to: 'fonts' }
    ]),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../src/tsconfig.json'),
      checkSyntacticErrors: true
    }),

    new webpack.DefinePlugin({
      BUILD_HASH: JSON.stringify(crypto.randomBytes(10).toString('hex'))
    }),

    new ResourcesPlugin({
      from: 'locales/locales.json',
      to: 'locales',
      extension: 'json'
    }),

    ...(isDev
      ? [
        new webpack.HotModuleReplacementPlugin(),
        new WebpackBar()
      ]
      : [
        new MiniCssExtractPlugin({
          filename: '[name].css'
        }),
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
        }),
        new webpack.optimize.OccurrenceOrderPlugin(false),
        new CompressionPlugin({})
      ]),

    ...(isBsync
      ? [
        new BrowserSyncPlugin(
          {
            host: 'localhost',
            port: 5002,
            proxy: 'http://localhost:5001'
          },
          {
            reload: true
          }
        )
      ]
      : [])
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },

    minimize: !isDev,
    minimizer: [
      new Uglify({
        parallel: true,
        uglifyOptions: {
          output: {
            comments: /license|@preserve|@license|@cc_on/gi
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },

  performance: {
    hints: false
  },

  stats: {
    modules: false,
    children: false
  },

  // CSS file mapping not allowed
  // To allow file mapping for CSS use 'source-map'
  devtool: (isDev && 'cheap-module-eval-source-map') || undefined
}

// tslint:disable-next-line:no-default-export
export default externalConfig