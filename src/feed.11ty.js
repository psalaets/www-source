const RSS = require('rss');

module.exports = class {
  data() {
    return {
      permalink: '/feed.xml'
    };
  }

  render(data) {
    function absoluteUrl(suffix = '') {
      const {baseUrl} = data.global;

      if (baseUrl.endsWith('/') && suffix.startsWith('/')) {
        return baseUrl + suffix.slice(1);
      } else {
        return baseUrl + suffix;
      }
    }

    const feedOpts = {
      title: 'paulsalaets.com',
      description: 'Latest posts from paulsalaets.com',
      pubDate: new Date(),
      feed_url: absoluteUrl(data.permalink),
      site_url: absoluteUrl(),
      language: 'en-us'
    };

    const feed = new RSS(feedOpts);

    // add 20 most recent posts to feed, newest first
    data.collections.post
      .slice(-20)
      .reverse()
      .map(item => {
        return {
          title: item.data.title,
          description: item.data.metaDescription,
          url: absoluteUrl(item.url),
          date: item.date
        };
      })
      .forEach(options => feed.item(options));

    return feed.xml();
  }
};
