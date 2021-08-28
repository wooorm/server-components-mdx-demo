#!/usr/bin/env node
import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import process from 'node:process'
import webpack from 'webpack'
import ReactServerWebpackPlugin from 'react-server-dom-webpack/plugin'

const production = process.env.NODE_ENV === 'production'

fs.mkdirSync('build', {recursive: true})
fs.copyFileSync('index.css', 'build/index.css')
fs.copyFileSync('og.png', 'build/og.png')

webpack(
  {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-map' : 'cheap-module-source-map',
    entry: [
      path.resolve(
        url.fileURLToPath(import.meta.url),
        '../../src/index.client.js'
      )
    ],
    output: {
      path: path.resolve(url.fileURLToPath(import.meta.url), '../../build'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {test: /\.mdx$/, use: 'xdm/webpack.cjs'},
        {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
      ]
    },
    plugins: [new ReactServerWebpackPlugin({isServer: false})]
  },
  onbundle
)

function onbundle(error, stats) {
  const info = stats && stats.toJson()

  if (error) throw error

  if (stats.hasErrors()) {
    for (error of info.errors) console.error(error)
    throw new Error('Finished running webpack with errors')
  }

  console.log('Bundled w/ webpack')
}
