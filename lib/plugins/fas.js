const { dom, icon, library } = require('@fortawesome/fontawesome-svg-core');
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
      throw new Error(`Could not find an icon named "${iconName}"`)
    }

    return iconObject.html[0];
  });
};
