// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'webcomp-boilerplate.js',
    clean: true
  },
  devServer: {
    static: './public',
    port: 9000,
    hot: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/tinymce', to: 'tinymce' }
      ],
    }),
  ],
};
