const createRssFeed = require('eleventy-rss-helper');
const permalink = '/feed.xml';

module.exports = createRssFeed({
  permalink,
  feedOptions(data) {
    return {
      title: 'paulsalaets.com',
      description: 'Latest posts from paulsalaets.com',
      feed_url: `${data.global.baseUrl}${permalink}`,
      site_url: data.global.baseUrl,
      language: 'en-us'
    };
  },
  items(collections) {
    return collections.post
      .slice(-20)
      .reverse();
  },
  itemOptions(item, data) {
    return {
      title: item.data.title,
      description: item.data.metaDescription,
      url: `${data.global.baseUrl}${item.url}`,
      date: item.date
    };
  }
});
