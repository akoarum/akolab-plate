const path = require('path');

module.exports = {
  server: {
    files: ['./htdocs/**/*.html', './htdocs/**/*.css', './htdocs/**/*.js'],
    server: {
      baseDir: './htdocs'
    },
    proxy: false
  },
  scss: [
    {
      entry: {
        master: './_dev/scss/master.scss'
      },
      output: {
        path: path.join(__dirname, './htdocs/css'),
        filename: '[name].css'
      }
    }
  ],
  js: [
    {
      entry: {
        master: './_dev/js/master.js'
      },
      output: {
        path: path.join(__dirname, './htdocs/js'),
        filename: '[name].js'
      }
    },
    {
      entry: {
        initialize: './_dev/js/initialize.js'
      },
      output: {
        path: path.join(__dirname, './htdocs/js'),
        filename: '[name].js'
      }
    }
  ],
  img: {
    path: ['./htdocs/img']
  },
  styleguide: {
    entry: './_dev/scss/**/*.scss',
    output: './htdocs/_styleguide/',
    overview: './_dev/_node/frontnote_template/styleguide.md',
    title: 'スタイルガイド',
    css: '/css/master.css',
    js: '/js/master.js'
  }
};
