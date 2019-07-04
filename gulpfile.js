const { src, dest, watch, series } = require('gulp');

const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

const axios = require('axios');

const postProcess = series(
  postProcessStyles,
  postProcessHtml
);

module.exports.watch = watchHtml;
module.exports['post-process'] = postProcess;

function postProcessStyles() {
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

function postProcessHtml() {
  return src('_site/**/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(dest('_site/'));
}

function watchHtml(cb) {
  watch('_site/**/*.html', series(postProcess, reloadBrowser));
}

function reloadBrowser() {
  return axios.get('http://localhost:8080/__browser_sync__?method=reload');
}
