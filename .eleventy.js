const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const excerpt = require('eleventy-plugin-excerpt');
const md = require('./lib/libraries/markdown-it');

const formatDate = require('date-fns/format');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(excerpt);

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/CNAME');

  eleventyConfig.addFilter('postDate', value => {
    return formatDate(value, 'D MMM YYYY');
  });

  eleventyConfig.addFilter('head', function(value, count) {
    return value.slice(0, count);
  });

  eleventyConfig.addFilter('byYear', function(posts) {
    const postsByYear = posts.reduce((postsByYear, post) => {
      const year = post.date.getFullYear();

      if (postsByYear[year] == null) {
        postsByYear[year] = {
          year,
          posts: []
        };
      }

      postsByYear[year].posts.push(post);
      return postsByYear;
    }, {});

    return Object.keys(postsByYear)
      .sort()
      .reverse()
      .map(year => postsByYear[year]);
  });

  // components

  eleventyConfig.addPairedShortcode('link', function(text, url) {
    return `<a href="${url}" rel="noopener" class="text-blue-700 underline">${text}</a>`;
  });

  return {
    dir: {
      input: 'src'
    }
  };
};
