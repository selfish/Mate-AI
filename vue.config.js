const Copy = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
      new Copy([{ from: './node_modules/chessboardjs/www/img/', to: './img' }])
    ],
  }
};
