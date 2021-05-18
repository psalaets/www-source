const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const excerpt = require('eleventy-plugin-excerpt');
const md = require('./lib/libraries/markdown-it');

const formatDate = require('date-fns/format');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(excerpt);

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/CNAME');

  // collections

  eleventyConfig.addCollection('currentPosts', collectionApi => {
    return collectionApi.getFilteredByTag('posts')
      .filter(post => !post.data.tags.includes('legacy'));
  });

  // filters

  eleventyConfig.addFilter('postDate', value => {
    return formatDate(value, 'd MMM yyyy');
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

  eleventyConfig.addPairedShortcode('navlink', function(text, href, title) {
    return `<a class="px-3 py-2" href="${href}" title="${title}">${text}</a>`;
  });

  eleventyConfig.addShortcode('navlinklabel', function(currentPath, linkUrl, label) {
    let classes = 'inline-block border-b-4';

    if (currentPath === linkUrl) {
      classes += ' border-green-300';
    } else {
      classes += ' border-white';
    }

    return `<span class="${classes}">${label}</span>`
  });

  return {
    dir: {
      input: 'src'
    }
  };
};
