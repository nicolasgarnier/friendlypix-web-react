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

console.log('Packing for', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'prod') {
  config.devtool = 'source-map';
}

module.exports = config;
