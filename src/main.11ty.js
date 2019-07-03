const fs = require('fs');
const path = require('path');

const postcss = require('postcss');
const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = class {
  async data() {
    const sourcePath = path.join(__dirname, '_includes/css/main.css');
    const sourceCss = await loadFile(sourcePath);

    const processedCss = await postcss([
      postcssImport,
      tailwindcss,
      autoprefixer
    ])
    .process(sourceCss, {from: sourcePath})
    .then(result => result.css);

    return {
      permalink: data => `/${data.pkg.version}/main.css`,
      css: processedCss
    }
  }

  render({css}) {
    return css;
  }
}

function loadFile(sourcePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(sourcePath, 'utf8', (err, data) => {
      return err ? reject(err) : resolve(data);
    });
  });
}
