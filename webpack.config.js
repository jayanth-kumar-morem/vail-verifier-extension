const path = require('path');

module.exports = {
  entry: './pkg/vail_verifier_extension.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'pkg')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-modules-commonjs'] // Add this line
          }
        }
      }
    ]
  },
  mode: 'production'
};
