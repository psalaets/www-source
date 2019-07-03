const { src, dest, watch, series } = require('gulp');

const postcss = require('gulp-postcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

const axios = require('axios');

module.exports.watch = watchHtmlOutput;
module.exports.styles = processStyleOutput;

function processStyleOutput() {
  return src('_site/**/*.css')
    .pipe(postcss([
      purgecss({
        content: ['_site/**/*.html'],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
      }),
      cssnano,
    ]))
    .pipe(dest('_site/'));
}

function watchHtmlOutput(cb) {
  watch('_site/**/*.html', series(processStyleOutput, reloadBrowser));
}

function reloadBrowser() {
  return axios.get('http://localhost:8080/__browser_sync__?method=reload');
}
