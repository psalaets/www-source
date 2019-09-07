const library = require('@fortawesome/fontawesome-svg-core').library;
const dom = require('@fortawesome/fontawesome-svg-core').dom;
const icon = require('@fortawesome/fontawesome-svg-core').icon;
const fas = require('@fortawesome/free-solid-svg-icons').fas;

library.add(fas);

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('fontAwesomeCss', function() {
    return dom.css();
  });

  eleventyConfig.addShortcode('fas', function(iconName) {
    if (!iconName) {
      throw new Error('icon name is required');
    }

    const iconObject = icon({
      prefix: 'fas',
      iconName
    });

    if (iconObject == null) {
      let extraError = '';
      if (iconName.startsWith('fa-')) {
        extraError = ` Maybe try "${stripFaPrefix(iconName)}".`;
      }

      throw new Error(`Could not find an icon named "${iconName}".${extraError}`)
    }

    return iconObject.html[0];
  });
};

function stripFaPrefix(value) {
  return value.slice('fa-'.length);
}
