/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const path = require('path');

const config = {
  context: __dirname,

  entry: './frontend/ClientApp.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public')
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [path.resolve('frontend'), path.resolve('node_modules/preact-compat/src')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {/* Workaround for issue https://github.com/firebase/firebaseui-web/issues/163 */},
      {
        test: /npm\.js$/,
        loader: 'string-replace-loader',
        include: path.resolve('node_modules/firebaseui/dist'),
        query: {
          search: 'require(\'firebase\');',
          replace: 'require(\'firebase/app\');require(\'firebase/auth\')',
        }
      }
    ]
  }
};

console.log('Packing for', process.env.NODE_ENV || 'dev');

if (process.env.NODE_ENV === 'prod') {
  config.devtool = 'source-map';
}

module.exports = config;
