const path = require('path');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  devtool: 'source-map', // Use 'source-map' instead of 'eval'
  entry: 
    {
      vail_verifier: './pkg/vail_verifier_extension.js',
      // worker: './pkg/worker.js',
      // setupWorker: './pkg/setupWorker.js',
      run_wasm: './pkg/run_wasm.js',
    },

    plugins: [
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, "pkg")
      })
    ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'pkg'),
    publicPath: path.resolve(__dirname, 'pkg'),
    globalObject: 'self',
    library: '[name]', // This will expose the exports under a global variable named after the entry point, e.g., vail_verifier
    libraryTarget: 'umd' // This will make it compatible with various module systems including ES6 imports
    // library: 'vail_verifier_extension',
  },

  resolve: {
    alias: {
      'wbg': path.resolve(__dirname, 'pkg/vail_verifier_extension.js'), // adjust the path if necessary
    },
    extensions: ['.js', '.ts', '.wasm']
  },


  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: 'webassembly/async',
      },
  
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-modules-commonjs']
          }
        }
      }
    ]
  },
  experiments: {
    asyncWebAssembly: true,
  },


  // mode: 'production'
  mode: 'development'
};
