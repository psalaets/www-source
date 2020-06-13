const tailwindcss = require('tailwindcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import');

const plugins = [
  postcssImport,
  tailwindcss,
  autoprefixer,
  cssnano,
];

module.exports = {
  plugins
}
