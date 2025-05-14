// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'webcomp-boilerplate.js',
    clean: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/tinymce', to: 'tinymce' }
      ],
    }),
  ],
};
